import axios from 'axios';
import { useState } from 'react';

import { useBaseURL } from '@/provider/Auth/BaseUrlContext';

type RequestBody = {
    productId: number,
    optionId: number,
    quantity: number,
    message: string,
    point: number
}

export const usePostOrder = () => {
    const { baseURL } = useBaseURL();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const order = async (data: RequestBody) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${baseURL}/api/orders`, data);
            setLoading(false);
            return response.data;
        } catch (err) {
            setLoading(false);
            let errorMessage = 'An unexpected error occurred';
            if (axios.isAxiosError(err) && err.response) {
                console.log(err);
                errorMessage = (err.response.data.detail as string) || 'Registration failed';
                setError(errorMessage);
            } else {
                setError(errorMessage);
            }
            return errorMessage;
        }
    };

    return { order, loading, error };
};