import type { BASE_URLS } from '@/api/instance';
import type { OrderHistory } from '@/types';

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

export const authSessionStorage = initStorage('authInfo', sessionStorage);
export const orderHistorySessionStorage = initStorage('orderHistory', sessionStorage);
export const serverStorage = initStorage('selectedServer', localStorage);

interface StorageKey {
  authInfo?: {
    email: string;
    token: string;
  };
  orderHistory?: OrderHistory;
  selectedServer?: keyof typeof BASE_URLS;
}
