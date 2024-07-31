import { AxiosError } from 'axios';
import { DeleteWishRequest } from '@internalTypes/requestTypes';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { WISH_PATHS } from '@apis/path';
import axiosInstance from '@apis/instance';

const deleteWish = async (request: DeleteWishRequest): Promise<void> => {
  await axiosInstance.delete(`${WISH_PATHS.DELETE_WISH}/${request.wishId}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

const useDeleteWish = (): UseMutationResult<unknown, AxiosError, DeleteWishRequest> =>
  useMutation({
    mutationFn: (request: DeleteWishRequest) => deleteWish(request),
  });

export default useDeleteWish;
