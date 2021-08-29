import cosmoslib from "../utils/cosmolib";
import { coinToReex } from "../utils/reex";

let timer: any;
let loading = false;

export const useBalanceFetching = async (address: string, callback: (balance: string | null) => void) => {
  if (timer) {
    clearTimeout(timer);
  }

  const useFetch = async () => {
    if (address) {
      const balance = await fetchBalance(address);
      if (balance) {
        callback(balance);
      }
      timer = setTimeout(useFetch, 10000);
    }
  };

  await useFetch();
};

const fetchBalance = async (address: string) => {
  if (!loading) {
    loading = true;
    const query = await cosmoslib.getBalance(address);
    loading = false;
    if (query && query?.balances?.length > 0) {
      return coinToReex(query.balances[0]).amount;
    }
    return "0";
  }
};
