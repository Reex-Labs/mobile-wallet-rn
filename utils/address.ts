// import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
// import { Bip39, EnglishMnemonic } from "@cosmjs/crypto";
// import * as crypto from 'crypto'
// import * as cosmos from 'cosmos-lib'
import cosmolib from "../utils/cosmolib";
import { validateMnemonic } from "bip39";

export async function genAddressReex() {
  const mnemonic = cosmolib.getRandomMnemonic();
  const address = await cosmolib.getAddress(mnemonic);

  return { address, mnemonic };
}

export async function getAddressReex(mnemonic: string) {
  return await cosmolib.getAddress(mnemonic);
}

export async function genAddress() {
  // const wallet = await DirectSecp256k1HdWallet.generate(24, { prefix: "reex" })
  // const mnemonic = wallet.mnemonic
  // const [{ address }] = await wallet.getAccounts();
  // return { address, mnemonic }
}

export function isValidAddress(address: string) {
  var regex = /^reex\w{39}$/;
  return regex.test(address);
}

// export function isValidMnemonic(mnemonic: string) {
//     try {
//         new EnglishMnemonic(mnemonic)
//         return true
//     }
//     catch (e) {
//         return false
//     }
// }

export function isValidMnemonic(mnemonic: string) {
  const test = /[0-9a-zA-Z]/;
  if (!test.test(mnemonic)) {
    return false
  }
  return validateMnemonic(mnemonic);
}
