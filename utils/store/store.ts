import * as Store from "./secureStore";
import * as Error from "../error/StoreError"

const SEPARATOR = "__";

export async function set(prefix: string, item: any) {
  if (!item) {
    return null;
  }
  if (typeof item !== 'object') {
    return null;
  }
  const id = await lenght(prefix);
  item.id = id;
  const keyItem = key(prefix, id);
  const keyLenght = await lenght(prefix);
  if (id > keyLenght) {
    throw "Error. Set in store. Id must be smaller lenght";
  }
  try {
    const data = JSON.stringify(item);
    Store.setValueSecure(keyItem, data);
    increaseLenght(prefix);
    return id;
  } catch (e) {
    throw "Set in store. " + e;
  }
}

export function setValue(prefix: string, data: any) {
  const keyItem = key(prefix);
  if (data) {
    data = JSON.stringify(data);
  } else {
    data = "";
  }
  try {
    Store.setValueSecure(keyItem, data);
  } catch (e) {
    console.log("Ошибка value для setOnce");
    throw e;
  }
}

export async function get(prefix: string, id: number): Promise<any> {
  const keyItem = key(prefix, id);
  const item = await Store.getValueSecure(keyItem);
  if (item) {
    return JSON.parse(item);
  }
  return null;
}

export async function getValue(prefix: string): Promise<any> {
  const keyItem = key(prefix);
  const item = await Store.getValueSecure(keyItem);
  if (item) {
    return JSON.parse(item);
  }
  return null;
}

export async function getAll(prefix: string) {
  const items = [];
  const lenghtItems = await lenght(prefix);
  for (let id = 0; id < lenghtItems; id++) {
    items.push(await get(prefix, id));
  }

  return items;
}

export async function update(prefix: string, item: any) {
  if (!item) {
    throw new Error.StoreEmptyError('Empty object in "update" method')
  }
  if (typeof item !== 'object') {
    throw new Error.StoreObjectError('Not object in "update" method');
  }
  if (typeof item?.id !== "number") {
    throw new Error.StoreIdError('"id" must be a number in "update" method');
  }
  const valueKey = key(prefix, item.id);
  try {
    const data = JSON.stringify(item)
    await Store.setValueSecure(valueKey, data);
  } catch (e) {
    throw e
  }
  
}

function key(prefix: string, id?: number) {
  if (id) return `${prefix}${SEPARATOR}${id}`;
  return `${prefix}${SEPARATOR}`;
}

async function lenght(prefix: string) {
  const key = `${prefix}${SEPARATOR}lenght`;
  const lenght = await Store.getValueSecure(key);
  return Number(lenght) ?? 0;
}

async function increaseLenght(prefix: string) {
  const key = `${prefix}${SEPARATOR}lenght`;
  const currentLenght = await lenght(prefix);
  const newLenght = Number(currentLenght) + 1;
  Store.setValueSecure(key, String(newLenght));
}
