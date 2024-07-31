import type { UseAxiosMutationResult } from '@/api';
import { useAxiosMutation } from '@/api';
import { sessionStorageApiWithAuth } from '@/api/axiosInstance';
import type { PostWishesRequestBody, PostWishesResponseBody } from '@/api/type';
import { authSessionStorage } from '@/utils/storage';

export function getPostWishesPath(): string {
  return '/api/wishes';
}

function usePostWishes(): UseAxiosMutationResult<PostWishesResponseBody, PostWishesRequestBody> {
  const token = authSessionStorage.get() ?? '';

  return useAxiosMutation<PostWishesResponseBody, PostWishesRequestBody>(
    {
      method: 'POST',
      url: getPostWishesPath(),
    },
    sessionStorageApiWithAuth(token),
    [['wishes']],
  );
}

export default usePostWishes;
