import Web3 from 'web3'
import { TransactionReceipt } from 'web3/types'
import { Nos } from '../@types'
import { TransactOpts } from '../interfaces'

export function maybeParseInt(arg:Nos, radix=10): number {
  return typeof arg === 'string' ? parseInt(arg, radix) : arg
}

// NOTE the web3 typed IProvider is incomplete (no sendAsync etc...) TODO flush it out
export function increaseTime(provider:any, seconds:number): Promise<any> {
  return new Promise((resolve, reject) =>
    provider.send({
      id: new Date().getSeconds(),
      jsonrpc: '2.0',
      method: 'evm_increaseTime',
      params: [seconds],
    }, (err:any, data:any) => {
      if (err) reject(err)
      resolve(data)
    })
  ).then((result) => new Promise((resolve, reject) =>
    provider.send({
      id: new Date().getSeconds(),
      jsonrpc: '2.0',
      method: 'evm_mine',
      params: [],
    }, (err:any, data:any) => {
      if (err) reject(err)
      resolve({ increaseTime: result, mine: data })
    }))
  )
}

export function stringToBytes(w3:Web3, str:string): string {
  return w3.utils.toHex(str)
}
