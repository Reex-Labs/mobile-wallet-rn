import { setValueSecure, getValueSecure } from './secureStore'

export async function checkWallet() {
  let isWallet: boolean = false;
  const result = await getValueSecure("app-reex-address");
  if (result) isWallet = true;

  return isWallet;
}

export function logout() {
  setValueSecure("app-reex-address", "");
  setValueSecure("app-reex-mnemonic", "");
  setValueSecure("app-reex-balance", "0");
  console.log('deleted data')
}

export async function auth(password: string) {
  const result = await getValueSecure("app-reex-address");
  return password === result;
}

export function saveWalletToStore(address: string, mnemonic: string) {
  setValueSecure("app-reex-address", address);
  setValueSecure("app-reex-mnemonic", mnemonic);
  setValueSecure("app-reex-balance", "0");
}

export function saveBalanceToStore(balance: string) {
  setValueSecure("app-reex-balance", balance);
}

export async function getBalanceFromStore() {
  return await getValueSecure("app-reex-balance");
}

export async function getWalletFromStore() {
  const address = (await getValueSecure("app-reex-address")) ?? "";
  const mnemomic = (await getValueSecure("app-reex-mnemonic")) ?? "";
  const balance = (await getValueSecure("app-reex-balance")) ?? "0";
  return { address, mnemomic, balance };
}
