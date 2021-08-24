import { Auth } from "../utils/store/"

export async function useSavedBalance() {
    const balance = await Auth.getBalanceFromStore();
    if (balance) {
        return balance
    }
    return "0"
}