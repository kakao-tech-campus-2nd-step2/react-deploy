import { useNavigate } from 'react-router-dom';

import { Select } from '@chakra-ui/react';

import { ROUTER_PATH } from '@/routes/path';
import { apiLocalStorage, authLocalStorage } from '@/utils/storage';

export type Api = 'KDW' | 'YSO' | 'SHJ' | 'KG';

export const SelectAPI = () => {
  const navigate = useNavigate();

  const handleSelectChange = (api: Api) => {
    apiLocalStorage.set(api);
    authLocalStorage.remove();
    navigate(ROUTER_PATH.HOME, { replace: true });
    window.location.reload();
  };

  return (
    <Select
      width="10rem"
      defaultValue={apiLocalStorage.get()}
      onChange={(e) => handleSelectChange(e.target.value as Api)}
    >
      <option value="KDW">권다운</option>
      <option value="YSO">유승욱</option>
      <option value="SHJ">신형진</option>
      <option value="KG">김건</option>
    </Select>
  );
};
