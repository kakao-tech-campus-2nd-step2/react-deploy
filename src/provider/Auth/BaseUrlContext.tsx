// src/context/BaseURLContext.js
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

type BaseURLContextType = {
    baseURL: string;
    setBaseURL: (url: string) => void;
};

const BaseURLContext = createContext<BaseURLContextType | undefined>(undefined);

export const BaseURLProvider = ({ children }: { children: ReactNode }) => {
    const LOCAL_STORAGE_KEY = 'baseURL';

    const [baseURL, setBaseURL] = useState<string>(() => {
        const storedURL = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedURL || 'http://3.35.17.43:8080'; // defaultValue
    });

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, baseURL);
        console.log(baseURL);
    }, [baseURL]);

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

