// apis/APIProvider.tsx
import React, { useState, ReactNode, useMemo } from 'react';
import APIContext from './APIContext';

interface APIProviderProps {
  children: ReactNode;
}

export default function APIProvider({ children }: APIProviderProps) {
  const [baseURL, setBaseURL] = useState<string>(process.env.REACT_APP_BASE_URL || '');

  const value = useMemo(
    () => ({
      baseURL,
      setBaseURL,
    }),
    [baseURL, setBaseURL],
  );

  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
}
