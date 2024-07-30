// src/context/BaseURLContext.js
import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

type BaseURLContextType = {
    baseURL: string;
    setBaseURL: (url: string) => void;
};

const BaseURLContext = createContext<BaseURLContextType | undefined>(undefined);

export const BaseURLProvider = ({ children }: { children: ReactNode }) => {
    const [baseURL, setBaseURL] = useState<string>('');

    return (
        <BaseURLContext.Provider value={{ baseURL, setBaseURL }}>
            {children}
        </BaseURLContext.Provider>
    );
};

export const useBaseURL = () => {
    const context = useContext(BaseURLContext);
    if (!context) {
        throw new Error('useBaseURL must be used within a BaseURLProvider');
    }
    return context;
};

