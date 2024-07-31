import { AxiosError, AxiosResponse } from 'axios';
import axiosInstance from '@apis/instance';
import { AddWishRequest } from '@internalTypes/requestTypes';
import { AddWishResponse } from '@internalTypes/responseTypes';
import { WISH_PATHS } from '@apis/path';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

const addWish = async (request: AddWishRequest): Promise<AddWishResponse> => {
  const res = await axiosInstance.post(WISH_PATHS.ADD_WISH, request, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
  return res.data;
};

export const useAddWishMutation = (): UseMutationResult<AddWishResponse, AxiosError, AddWishRequest> =>
  useMutation({ mutationFn: (request: AddWishRequest) => addWish(request) });
