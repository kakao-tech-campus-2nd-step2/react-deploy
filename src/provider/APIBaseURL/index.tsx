import { createContext, useContext, useState } from 'react';

import { apiBaseURLSessionStorage } from '@/utils/storage';

export const APIBaseURLContext = createContext<[string, (value: string) => void]>([
  String(apiBaseURLSessionStorage.get()),
  () => {},
]);

export const APIBaseURLProvider = ({ children }: { children: React.ReactNode }) => {
  const [apiBaseURL, setApiBaseURL] = useState(useContext(APIBaseURLContext)[0]);

  const setApiBaseURLWithSessionStorage = (value: string) => {
    apiBaseURLSessionStorage.set(value);
    setApiBaseURL(value);
  };

  return (
    <APIBaseURLContext.Provider value={[apiBaseURL, setApiBaseURLWithSessionStorage]}>
      {children}
    </APIBaseURLContext.Provider>
  );
};

export const useAPIBaseURL = () => useContext(APIBaseURLContext);
