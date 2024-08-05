import { Member } from '@/types/memberType';

export type MembersRequestParams = {
  page?: string;
  size?: number;
};

export type MembersResponse = {
  members: Member[];
  nextPageToken?: string;
  pageInfo: {
    totalPages: number;
    totalElements: number;
  };
};

export type MembersResponseRaw = {
  content: Member[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
};
