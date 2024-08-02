import axios from 'axios';
import { useState } from 'react';

import { useBaseURL } from '@/provider/Auth/BaseUrlContext';

type RegisterRequestBody = {
    name: string;
    email: string;
    password: string;
};

export const usePostRegister = () => {
    const { baseURL } = useBaseURL();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (data: RegisterRequestBody): Promise<void | string> => {
        console.log('Base URL in register:', baseURL);
        setLoading(true);
        setError(null);
        try {
            await axios.post(`${baseURL}/api/members/register`, data);
            setLoading(false);
            return;
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

    return { register, loading, error };
};