import cosmoslib from "../utils/cosmolib";
import { coinToReex } from "../utils/reex";

let timer: any;

export async function useBalance(
  address: string,
  callback: (balance: string) => void
) {
  if (!timer && address) {
    timer = setInterval(async () => {
      callback(await fetchBalance(address));
    }, 5000);
  }
}

const fetchBalance = async (address: string) => {
    const query = await cosmoslib.getBalance(address);
    if (query && query.balances.length > 0) {
      return coinToReex(query.balances[0]).amount;
    } else {
      return "0";
    }
};
