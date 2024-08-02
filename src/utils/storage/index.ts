import type { OrderHistory } from '@/types';

const initStorage = <T extends keyof StorageKey>(key: T, storage: Storage) => {
  const storageKey = `${key}`;

  const get = (): StorageKey[T] => {
    const value = storage.getItem(storageKey);

    return JSON.parse(value as string); // JSON string을 파싱하여 리턴
  };

  const set = (value: StorageKey[T]) => {
    if (value == undefined || value == null) {
      return storage.removeItem(storageKey);
    }

    const stringifiedValue = JSON.stringify(value); // JSON string으로 변환하여 저장

    storage.setItem(storageKey, stringifiedValue);
  };

  return { get, set };
};

export const apiOptionLocalStorage = initStorage('apiOption', localStorage);
export const authSessionStorage = initStorage('authToken', sessionStorage);
export const emailSessionStorage = initStorage('email', sessionStorage);
export const orderHistorySessionStorage = initStorage('orderHistory', sessionStorage);

interface StorageKey {
  apiOption?: string;
  authToken?: string;
  email?: string;
  orderHistory?: OrderHistory;
}
