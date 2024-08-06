import React, { createContext, ReactNode, useContext, useState } from 'react';

interface PriceContextProps {
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

const PriceContext = createContext<PriceContextProps | undefined>(undefined);

export const PriceProvider = ({ children }: { children: ReactNode }) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  return (
    <PriceContext.Provider value={{ totalPrice, setTotalPrice }}>{children}</PriceContext.Provider>
  );
};

export const usePrice = (): PriceContextProps => {
  const context = useContext(PriceContext);
  if (!context) {
    throw new Error('usePrice must be used within a PriceProvider');
  }
  return context;
};
