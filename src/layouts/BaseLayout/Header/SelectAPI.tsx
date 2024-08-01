import { Select } from '@chakra-ui/react';

import { apiLocalStorage } from '@/utils/storage';

export type Api = 'KDW' | 'YSO' | 'SHJ' | 'KG';

export const SelectAPI = () => {
  const handleSelectChange = (api: Api) => {
    apiLocalStorage.set(api);
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
