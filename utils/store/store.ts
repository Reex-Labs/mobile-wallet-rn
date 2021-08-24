import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setValue(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}

export async function getValue(key: string): Promise<string | null> {
  const result = await AsyncStorage.getItem(key);
  if (result) {
    return result;
  } else {
    return null;
  }
}
