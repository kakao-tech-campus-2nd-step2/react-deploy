import { AxiosError } from 'axios';
import { initInstance } from '@apis/instance';
import { AddWishRequest } from '@internalTypes/requestTypes';
import { AddWishResponse } from '@internalTypes/responseTypes';
import { WISH_PATHS } from '@apis/path';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useAPI } from '@/context/api/useAPI';

const addWish = async (request: AddWishRequest, baseURL: string): Promise<AddWishResponse> => {
  const instance = initInstance(baseURL);
  const res = await instance.post(WISH_PATHS.ADD_WISH, request, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
  return res.data;
};

export const useAddWishMutation = (): UseMutationResult<AddWishResponse, AxiosError, AddWishRequest> => {
  const { baseURL } = useAPI();
  return useMutation({ mutationFn: (request: AddWishRequest) => addWish(request, baseURL) });
};
