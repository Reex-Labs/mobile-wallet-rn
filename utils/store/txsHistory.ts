import * as Store from "./store";

export interface TxHistoryItem {
  id?: number;
  type: "Send";
  date: number;
  from: string;
  to: string;
  amount: string;
  state: boolean;
}

const PREFIX = "H";

export async function set(item: TxHistoryItem) {
  const id = await getLenght(item.from);
  const key = getKey(item.from, id);
  item.id = id;
  const data = JSON.stringify(item);
  Store.setValue(key, data);
  increaseLenght(item.from);
}

export async function get(
  id: number,
  account: string
): Promise<TxHistoryItem | null> {
  const key = getKey(account, id);
  const item = await Store.getValue(key);
  if (item) {
    return JSON.parse(item);
  }
  return null;
}

export async function getLast(
  count: number,
  account: string
): Promise<TxHistoryItem[]> {
  const items: TxHistoryItem[] = [];
  const lenght = await getLenght(account);
  let pos = 0;
  if (lenght > count) {
    pos = lenght - count - 1;
  }
  for (; pos < lenght; pos++) {
    const key = getKey(account, pos);
    const item = await Store.getValue(key);
    if (item) {
      items.push(JSON.parse(item));
    }
  }
  return items;
}

export function getAll(account: string) {}

function getKey(account: string, id: number) {
  return `${PREFIX}:${account}:${id}`;
}

async function getLenght(account: string) {
  const key = `${PREFIX}:${account}:lenght`;
  const lenght = await Store.getValue(key);
  return Number(lenght) ?? 0;
}

async function increaseLenght(account: string) {
  const key = `${PREFIX}:${account}:lenght`;
  const currentLenght = await getLenght(account);
  const newLenght = Number(currentLenght) + 1;
  Store.setValue(key, String(newLenght));
}
