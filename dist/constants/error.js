"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors;
(function (Errors) {
    Errors["NO_ACCOUNT_AVAILABLE"] = "No account is available to use. Either pass an account as an argument or use the `setDefaultAccount` method to specify beforehand";
    Errors["CONTRACT_NOT_DEPLOYED"] = "This contract needs to be deployed before calling this method. See `deploy`";
    Errors["ATTRIBUTE_DOES_NOT_EXIST"] = "The given attribute does not exist, or is not reachable, on this object";
    Errors["NO_SUCH_EVENT"] = "The given event name does not exist on this contract";
    Errors["NO_ABI_SET"] = "The contract ABI is not present. Assure that the `at` method has been executed";
    Errors["NO_RAW_TRANSACTION"] = "No `rawTransaction` is present on the signed transaction. Ensure that it was signed correctly";
})(Errors = exports.Errors || (exports.Errors = {}));
