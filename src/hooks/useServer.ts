import { useEffect, useState } from 'react';

import { serverTypeSessionStorage } from '@/utils/storage';

import type { BaseURL } from '../api/instance/index';

export const useServer = () => {
  const [server, setServer] = useState<BaseURL>('mock');

  useEffect(() => {
    const serverType = serverTypeSessionStorage.get();

    if (serverType) setServer(serverType as BaseURL);
  }, []);

  // useEffect(() => {
  //   if (server) serverTypeSessionStorage.set(server);
  // }, [server]);

  const chageServer = (serverType: BaseURL) => {
    setServer(serverType);
    serverTypeSessionStorage.set(serverType);
  };

  return {
    server,
    chageServer,
  };
};
