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

export function isValidAddress(address: string) {
  var regex = /^reex\w{39}$/;
  return regex.test(address);
}

export function isValidMnemonic(mnemonic: string) {
  const test = /[0-9a-zA-Z]/;
  if (!test.test(mnemonic)) {
    return false
  }
  return validateMnemonic(mnemonic);
}
