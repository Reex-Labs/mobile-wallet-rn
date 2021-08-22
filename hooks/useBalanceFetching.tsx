import cosmoslib from "../utils/cosmolib";
import { coinToReex } from "../utils/reex";

let timer: any;
let loading = false;

export async function useBalanceFetching(
  address: string,
  callback: (balance: string) => void
) {
  if (timer) {
    clearTimeout(timer)
  }
  if (address) {
    const balance = await fetchBalance(address);
    if (typeof balance === "string") {
      callback(balance);
    }
    timer = setTimeout(() => {
      useBalanceFetching(address, callback);
    }, 10000);
  }
}

const fetchBalance = async (address: string) => {
  if (!loading) {
    loading = true;
    const query = await cosmoslib.getBalance(address);
    loading = false;
    if (query && query.balances.length > 0) {
      return coinToReex(query.balances[0]).amount;
    } else {
      return "0";
    }
  }
};
