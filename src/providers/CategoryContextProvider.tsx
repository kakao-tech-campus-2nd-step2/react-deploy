import {
  createContext, ReactNode, useMemo,
} from 'react';
import FetchStatus from '@constants/FetchStatus';
import { RefetchOptions, useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@utils/query';
import { QueryKeys } from '@constants/QueryKeys';
import { FetchStatusType, CategoryRepository } from '@/types';

interface CategoryContextData {
  categories: CategoryRepository;
  fetchStatus: FetchStatusType;
  refetch: (options?: RefetchOptions) => Promise<any>;
}

const defaultCategoryContextData = {
  categories: {},
  fetchStatus: FetchStatus.FETCHING,
  refetch: async () => {},
};

export const CategoryContext = createContext<CategoryContextData>(defaultCategoryContextData);

function CategoryContextProvider({ children }: { children: ReactNode }) {
  const { data: categories = {}, status, refetch } = useQuery({
    queryKey: [QueryKeys.CATEGORIES],
    queryFn: fetchCategories,
  });
  const value = useMemo<CategoryContextData>(() => ({
    categories, fetchStatus: status, refetch,
  }), [categories, status, refetch]);

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

export default CategoryContextProvider;
