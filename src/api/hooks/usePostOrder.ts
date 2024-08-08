import type { UseAxiosMutationResult } from '@/api';
import { useAxiosMutation } from '@/api';
import { sessionStorageApiWithAuth } from '@/api/axiosInstance';
import type { PostOrderRequestBody } from '@/api/type';
import { authSessionStorage } from '@/utils/storage';

export function postOrderPath(): string {
  return '/api/orders';
}

function usePostOrder(): UseAxiosMutationResult<void, PostOrderRequestBody> {
  const token = authSessionStorage.get()?.token ?? '';

  return useAxiosMutation<void, PostOrderRequestBody>(
    {
      method: 'POST',
      url: postOrderPath(),
    },
    sessionStorageApiWithAuth(token),
  );
}

export default usePostOrder;
