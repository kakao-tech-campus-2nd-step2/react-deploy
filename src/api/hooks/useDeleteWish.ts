import axios from 'axios';
import { useState } from 'react';

import { useBaseURL } from '@/provider/Auth/BaseUrlContext';

export const useDeleteWish = () => {
    const { baseURL } = useBaseURL();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteWish = async (productId: string) => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            return '본인의 위시리스트만 삭제 가능합니다.';
        }

        setLoading(true);
        setError(null);
        try {
            await axios.delete(`${baseURL}/api/wishes/${productId}`,
                {
                    headers: {
                        'Authorization': accessToken
                    }
                }
            );
            setLoading(false);
            return 200;
        } catch (err) {
            setLoading(false);
            let errorMessage = 'An unexpected error occurred';
            if (axios.isAxiosError(err) && err.response) {
                errorMessage = (err.response.data.detail as string) || 'Wish creation failed';
                setError(errorMessage);
            } else {
                setError(errorMessage);
            }
            return errorMessage;
        }
    };

    return { deleteWish, loading, error };
};
