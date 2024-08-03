import type { OrderHistory } from "@/types";

const initStorage = <T extends keyof StorageKey>(key: T, storage: Storage) => {
  const storageKey = `${key}`;

  const get = (): StorageKey[T] => {
    const value = storage.getItem(storageKey);

    return JSON.parse(value as string);
  };
  const set = (value: StorageKey[T]) => {
    if (value == undefined || value == null) {
      return storage.removeItem(storageKey);
    }

    const stringifiedValue = JSON.stringify(value);

    storage.setItem(storageKey, stringifiedValue);
  };

  return { get, set };
};

export const authSessionStorage = initStorage("authToken", sessionStorage);
export const userIdSessionStorage = initStorage("userId", sessionStorage);
export const orderHistorySessionStorage = initStorage("orderHistory", sessionStorage);
export const currentApi = initStorage("currentApi", sessionStorage);

interface StorageKey {
  authToken?: string;
  userId?: string;
  orderHistory?: OrderHistory;
  currentApi?: string;
}
