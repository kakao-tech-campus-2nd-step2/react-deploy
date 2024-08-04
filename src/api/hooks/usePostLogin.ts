import axios from 'axios';
import { useState } from 'react';

import { useBaseURL } from '@/provider/Auth/BaseUrlContext';

type LoginRequestBody = {
    email: string;
    password: string;
};

type LoginResponseBody = {
    name: string;
}

export const usePostLogin = () => {
    const { baseURL } = useBaseURL();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (data: LoginRequestBody): Promise<LoginResponseBody | string> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post<LoginResponseBody>(`${baseURL}/api/members/login`, data);
            const authHeader = response.headers.authorization; // 헤더에서 토큰 추출
            if (!authHeader) {
                const errM = '토큰 없음'
                return errM;
            }
            axios.defaults.headers.common.Authorization = `Bearer ${authHeader}`
            localStorage.setItem('accessToken', `Bearer ${authHeader}`);
            setLoading(false);
            return response.data;
        } catch (err) {
            setLoading(false);
            let errorMessage = 'An unexpected error occurred';
            if (axios.isAxiosError(err) && err.response) {
                errorMessage = (err.response.data.detail as string) || 'Registration failed';
                setError(errorMessage);
            } else {
                setError(errorMessage);
            }
            return errorMessage;
        }
    };

    return { login, loading, error };
};