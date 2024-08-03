import { AxiosError } from 'axios';
import { DeleteWishRequest } from '@internalTypes/requestTypes';
import { initInstance } from '@apis/instance';
import { WISH_PATHS } from '@apis/path';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useAPI } from '@/context/api/useAPI';

const deleteWish = async (request: DeleteWishRequest, baseURL: string): Promise<void> => {
  const instance = initInstance(baseURL);
  await instance.delete(`${WISH_PATHS.DELETE_WISH}/${request.wishId}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

const useDeleteWish = (): UseMutationResult<unknown, AxiosError, DeleteWishRequest> => {
  const { baseURL } = useAPI();

  return useMutation({
    mutationFn: (request: DeleteWishRequest) => deleteWish(request, baseURL),
  });
};

export default useDeleteWish;
