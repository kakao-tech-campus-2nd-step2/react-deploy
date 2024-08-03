import { ChangeEvent, useCallback } from 'react';
import { currentUrlStorage } from '@utils/storage';
import { Select } from '@chakra-ui/react';

function APISelector() {
  const urls = import.meta.env.VITE_URLS;
  const apis: { [key: string]: string } = {};
  apis.mock = import.meta.env.VITE_BASE_URL;

  (urls.split(',') as string[]).forEach((item) => {
    const [key, url] = item.split('=');
    apis[key] = url;
  });

  const handleURLSelect = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    currentUrlStorage.set(e.target.value);
    window.location.reload();
  }, []);

  return (
    <Select width="100px" onChange={handleURLSelect} defaultValue={currentUrlStorage.get()}>
      {
        Object
          .entries(apis)
          .map(([name, url]) => (
            <option value={url} key={url}>{name}</option>
          ))
      }
    </Select>
  );
}

export default APISelector;
