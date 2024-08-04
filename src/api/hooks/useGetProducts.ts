import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from "@tanstack/react-query";

import type { ProductData } from "@/types";

import { BASE_URL } from "../instance";
import { fetchInstance } from "./../instance/index";

type RequestParams = {
  categoryId: string;
  pageToken?: string;
  maxResults?: number;
  sort?: string;
};

type ProductsResponseData = {
  products: ProductData[];
  hasNext: boolean;
};

export const getProductsPath = ({ categoryId, pageToken, maxResults, sort }: RequestParams) => {
  const params = new URLSearchParams();

  params.append("categoryId", categoryId);
  if (sort) params.append("sort", sort);
  if (pageToken) params.append("page", pageToken);
  if (maxResults) params.append("size", maxResults.toString());

  return `${BASE_URL}/api/products?${params.toString()}`;
};

export const getProducts = async (params: RequestParams): Promise<ProductsResponseData> => {
  const response = await fetchInstance.get<ProductsResponseData>(getProductsPath(params));
  const data = response.data;

  return {
    products: data.products,
    hasNext: data.hasNext,
  };
};

type Params = Pick<RequestParams, "maxResults" | "categoryId"> & { initPageToken?: string };

export const useGetProducts = ({
  categoryId,
  maxResults = 20,
  initPageToken,
}: Params): UseInfiniteQueryResult<InfiniteData<ProductsResponseData>> => {
  return useInfiniteQuery({
    queryKey: ["products", categoryId, maxResults, initPageToken],
    queryFn: async ({ pageParam = initPageToken }) => {
      return getProducts({ categoryId, pageToken: pageParam, maxResults });
    },
    initialPageParam: initPageToken ?? "0",
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.products.length / maxResults).toString() : undefined,
  });
};
