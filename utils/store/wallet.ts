import * as Store from "./store";

const PREFIX = "reex-accounts";
const PREFIX_ACTIVE = "reex-active-account";

export interface IWallet {
  id?: number;
  address: string;
  mnemonic: string;
  balance: string;
}

export async function add(address: string, mnemonic: string) {
  const wallet: IWallet = {
    address,
    mnemonic,
    balance: "0",
  };
  const allWallets = await all();
  const foundDuplicate = allWallets.find(
    (wallet) => wallet.address === address
  );
  if (foundDuplicate) {
    setActive(foundDuplicate.id);
    return;
  }
  const id = await Store.set(PREFIX, wallet);
  await setActive(id);
}

export async function setActive(id: number | null | undefined) {
  if (typeof id === "number") {
    const wallet = await Store.get(PREFIX, id);
    Store.setValue(PREFIX_ACTIVE, wallet);
  } else {
    Store.setValue(PREFIX_ACTIVE, null);
  }
}

export async function getActive(): Promise<IWallet> {
  const activeWallet = await Store.getValue(PREFIX_ACTIVE);
  return activeWallet;
}

export function clearActive() {
  Store.setValue(PREFIX_ACTIVE, null);
}

export async function all(): Promise<IWallet[]> {
  return await Store.getAll(PREFIX);
}

export async function saveBalance(balance: string) {
  const activeWallet = await getActive();
  if (activeWallet) {
    activeWallet.balance = balance;
    if (typeof activeWallet?.id === "number") {
      try {
        await Store.update(PREFIX, activeWallet);
        await setActive(activeWallet.id);
      } catch (e) {
        console.log(e);
      }
    }
  }
}

export function logout() {
  setActive(null);
}
