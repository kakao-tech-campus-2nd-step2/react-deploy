import { useEffect, useState } from 'react';

import { serverTypeSessionStorage } from '@/utils/storage';

import type { BASE_URL } from '../api/instance/index';

export const useServer = () => {
  const [server, setServer] = useState<keyof typeof BASE_URL>('mock');

  useEffect(() => {
    const serverType = serverTypeSessionStorage.get();

    if (serverType) setServer(serverType as keyof typeof BASE_URL);
  }, []);

  const chageServer = (serverType: keyof typeof BASE_URL) => {
    setServer(serverType);
    serverTypeSessionStorage.set(serverType);
  };

  return {
    server,
    chageServer,
  };
};
