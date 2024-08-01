import type { OrderHistory } from '@/types';

const initStorage = <T extends keyof StorageKey>(key: T, storage: Storage, defaultValue?: StorageKey[T]) => {
  const storageKey = `${key}`;

  const get = (): StorageKey[T] => {
    const value = storage.getItem(storageKey);

    if (defaultValue && !value) {
      set(defaultValue);
      return defaultValue;
    }

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

export const authSessionStorage = initStorage('authToken', sessionStorage);
export const orderHistorySessionStorage = initStorage('orderHistory', sessionStorage);
export const apiBaseURLSessionStorage = initStorage('apiBaseURL', sessionStorage, 'https://api.example.com');

interface StorageKey {
  authToken?: string;
  orderHistory?: OrderHistory;
  apiBaseURL?: string;
}