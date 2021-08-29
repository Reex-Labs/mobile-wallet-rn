import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export async function setValueSecure(key: string, value: string) {
  try {
    if (Platform.OS === "web") {
      await AsyncStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  } catch (e) {
    throw e;
  }
}

export async function getValueSecure(key: string): Promise<string | null> {
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
