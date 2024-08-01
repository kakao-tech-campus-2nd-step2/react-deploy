import { useEffect, useState } from 'react';

import type { BASE_URLS } from '@/api/instance';
import { serverStorage } from '@/utils/storage';

export const useServer = () => {
  const [server, setServer] = useState<keyof typeof BASE_URLS>('mock');

  useEffect(() => {
    const storedServer = serverStorage.get();
    if (storedServer) {
      setServer(storedServer as keyof typeof BASE_URLS);
    }
  }, []);

  const changeServer = (serverType: keyof typeof BASE_URLS) => {
    setServer(serverType);
    serverStorage.set(serverType);
    window.location.reload();
  };

  return {
    server,
    changeServer,
  };
};
