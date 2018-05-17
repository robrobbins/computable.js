import * as ganache from 'ganache-cli'
import Web3 from 'web3'
import { Contract } from '../../../node_modules/web3/types.d'
import { increaseTime } from '../../helpers'
import {
  eventReturnValues,
  deployDll,
  deployAttributeStore,
} from '../../../src/helpers'
import { ParameterDefaults } from '../../../src/constants'
import Eip20 from '../../../src/contracts/eip20'
import Parameterizer from '../../../src/contracts/parameterizer'
import Voting from '../../../src/contracts/plcr-voting'

const provider:any = ganache.provider(),
  web3 = new Web3(provider)

let accounts:string[],
  eip20:Eip20,
  dll:Contract,
  store:Contract,
  voting:Voting,
  parameterizer:Parameterizer

describe('Parameterizer: challengeCanBeResolved', () => {
  beforeEach(async () => {
    accounts = await web3.eth.getAccounts()

    eip20 = new Eip20(accounts[0])
    const tokenAddress = await eip20.deploy(web3)
    eip20.setProvider(provider)

    // voting and its dependencies are required, TODO we _could_ bundle these and perhaps still return the inidividual instances
    // `{ dll, store, voting } = deployVotingAndLibraries` perhaps...
    dll = await deployDll(web3, accounts[0])
    dll.setProvider(provider)
    const dllAddress = dll.options.address

    store = await deployAttributeStore(web3, accounts[0])
    store.setProvider(provider)
    const attributeStoreAddress = store.options.address

    voting = new Voting(accounts[0])
    const votingAddress = await voting.deploy(web3, { tokenAddress, dllAddress, attributeStoreAddress })
    voting.setProvider(provider)

    parameterizer = new Parameterizer(accounts[0])
    const parameterizerAddress = await parameterizer.deploy(web3, { tokenAddress, votingAddress })
    parameterizer.setProvider(provider)

    // approve the parameterizer with the token, account[0] has all the balance atm
    await eip20.approve(parameterizerAddress, 1000000)
    // challenger (accounts[1]) needs token funds to spend
    await eip20.transfer(accounts[1], 500000)
    // parameterizer must be approved to spend on [1]'s behalf
    await eip20.approve(parameterizerAddress, 450000, { from: accounts[1] })
  })

  it('should be truthy if a challenge is ready to be resolved', async () => {
    const propID = eventReturnValues('_ReparameterizationProposal',
      await parameterizer.proposeReparameterization('voteQuorum', 51), 'propID')

    const tx1 = await parameterizer.challengeReparameterization(propID, { from: accounts[1] })
    expect(tx1).toBeTruthy()

    await increaseTime(provider, ParameterDefaults.P_COMMIT_STAGE_LENGTH + 1)
    await increaseTime(provider, ParameterDefaults.P_REVEAL_STAGE_LENGTH + 1)

    const res = await parameterizer.challengeCanBeResolved(propID)
    expect(res).toBe(true)
  })

  it('should be falsy if challenge not ready', async () => {
    const propID = eventReturnValues('_ReparameterizationProposal',
      await parameterizer.proposeReparameterization('voteQuorum', 51), 'propID')

    const tx1 = await parameterizer.challengeReparameterization(propID, { from: accounts[1] })
    expect(tx1).toBeTruthy()

    await increaseTime(provider, ParameterDefaults.P_COMMIT_STAGE_LENGTH + 1)
    // NOTE reveal stage length is the determining factor here

    const res = await parameterizer.challengeCanBeResolved(propID)
    expect(res).toBe(false)
  })

})
