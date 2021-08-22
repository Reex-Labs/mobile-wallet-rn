import { getBalanceFromStore } from "../utils/auth"

export async function useSavedBalance() {
    const balance = await getBalanceFromStore()
    if (balance) {
        return balance
    }
    return "0"
}