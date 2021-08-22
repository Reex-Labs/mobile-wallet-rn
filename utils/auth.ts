import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export async function checkWallet() {
  let isWallet: boolean = false;
  const result = await getValue("app-reex-address");
  if (result) isWallet = true;

  return isWallet;
}

export function logout() {
  setValue("app-reex-address", "");
  setValue("app-reex-mnemonic", "");
  setValue("app-reex-balance", "0");
  console.log('deleted data')
}

export async function auth(password: string) {
  const result = await getValue("app-reex-address");
  return password === result;
}

export function saveWalletToStore(address: string, mnemonic: string) {
  setValue("app-reex-address", address);
  setValue("app-reex-mnemonic", mnemonic);
  setValue("app-reex-balance", "0");
}

export function saveBalance(balance: string) {
  setValue("app-reex-balance", balance);
}

export async function getBalanceFromStore() {
  return await getValue("app-reex-balance");
}

export async function getWalletFromStore() {
  const address = (await getValue("app-reex-address")) ?? "";
  const mnemomic = (await getValue("app-reex-mnemonic")) ?? "";
  const balance = (await getValue("app-reex-balance")) ?? "0";
  return { address, mnemomic, balance };
}

async function setValue(key: string, value: string) {
  if (Platform.OS === "web") {
    await AsyncStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

async function getValue(key: string) {
  let result;
  if (Platform.OS === "web") {
    result = await AsyncStorage.getItem(key);
  } else {
    result = await SecureStore.getItemAsync(key);
  }
  if (result) {
    return result;
  } else {
    return null;
  }
}
