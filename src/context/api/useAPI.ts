import { useContext } from 'react';
import APIContext, { APIContextProps } from './APIContext';

const ERROR_MESSAGE = 'useAPI must be used within an APIProvider';

export const useAPI = (): APIContextProps => {
  const context = useContext(APIContext);

  if (!context) throw new Error(ERROR_MESSAGE);
  return context;
};
