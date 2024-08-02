import axios from 'axios';
import { useEffect, useState } from 'react';

import { useBaseURL } from '@/provider/Auth/BaseUrlContext';
import type { WishListData } from '@/types';

export type WishListResponseData = WishListData[];

export const useGetWishList = () => {
    const { baseURL } = useBaseURL();
    const [wishList, setWishList] = useState<WishListResponseData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            setError(null);
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get<{ content: WishListData[] }>(`${baseURL}/api/wishes`,
                    {
                        headers: {
                            'Authorization': accessToken
                        }
                    }
                );
                setWishList(response.data.content);
            } catch (err) {
                let errorMessage = 'An unexpected error occurred';
                if (axios.isAxiosError(err) && err.response) {
                    errorMessage = (err.response.data.detail as string) || 'Failed to fetch categories';
                }
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [baseURL]);

    return { wishList, loading, error };
};