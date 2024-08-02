import axios from 'axios';
import { useState } from 'react';

import { useBaseURL } from '@/provider/Auth/BaseUrlContext';

type RequestBody = {
    productId: string;
}

export const usePostWish = () => {
    const { baseURL } = useBaseURL();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addWish = async (data: RequestBody) => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            return 'No authorization token found';
        }

        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                `${baseURL}/api/wishes`,
                data,
                {
                    headers: {
                        'Authorization': accessToken
                    }
                }
            );
            setLoading(false);
            console.log(response);
            return response.status;
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

    return { addWish, loading, error };
};
