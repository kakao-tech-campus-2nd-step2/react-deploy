import { createContext } from 'react';

export interface APIContextProps {
  baseURL: string;
  setBaseURL: (url: string) => void;
}

const APIContext = createContext<APIContextProps | undefined>(undefined);

export default APIContext;
