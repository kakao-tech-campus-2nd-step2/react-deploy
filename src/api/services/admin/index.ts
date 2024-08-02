import { AxiosError } from 'axios';

import { AUTHROIZATION_API } from '@/api/config';
import {
  API_ERROR_MESSAGES,
  RENDER_ERROR_MESSAGES,
} from '@/constants/errorMessage';

import {
  MembersRequestParams,
  MembersResponse,
  MembersResponseRaw,
} from './types';

export const fetchMembers = async (
  params: MembersRequestParams
): Promise<MembersResponse> => {
  try {
    const response = await AUTHROIZATION_API.get<MembersResponseRaw>(
      getMembersPath(params)
    );
    const { data } = response;

    return {
      members: data.content,
      nextPageToken:
        data.page !== data.totalPages - 1
          ? (data.page + 1).toString()
          : undefined,
      pageInfo: {
        totalPages: data.totalPages,
        totalElements: data.totalElements,
      },
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;

      if (response?.status === 403) {
        throw new Error(RENDER_ERROR_MESSAGES.FORBIDDEN_USER);
      }
    }

    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};

const getMembersPath = ({ page, size }: MembersRequestParams) => {
  const params = new URLSearchParams();

  if (page) params.append('page', page);
  if (size) params.append('size', size.toString());

  return `/api/admin/members?${params.toString()}`;
};
