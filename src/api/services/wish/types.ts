import { WishData } from '@/types/wishType';

export type WishListRequestParams = {
  pageToken?: string;
  maxResults?: number;
};

export type WishListResponse = {
  wishList: WishData[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

export type WishListResponseRaw = {
  content: WishData[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
};
