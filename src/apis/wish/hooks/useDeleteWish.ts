import { AxiosError } from 'axios';
import { DeleteWishRequest } from '@internalTypes/requestTypes';
import initInstance from '@apis/instance';
import { WISH_PATHS } from '@apis/path';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

const wishInstance = initInstance(process.env.REACT_APP_EUN_KYOUNG_BASE_URL);

const deleteWish = async (request: DeleteWishRequest): Promise<void> => {
  await wishInstance.delete(`${WISH_PATHS.DELETE_WISH}/${request.wishId}`, {
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
