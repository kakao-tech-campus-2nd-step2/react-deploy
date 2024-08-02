import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

import { useBaseURL } from '@/provider/Auth/BaseUrlContext';

type LoginRequestBody = {
    email: string;
    password: string;
};

type LoginResponseBody = {
    name: string;
    role: string;
}

// interface JwtPayload {
//     roles: string[];
// }

// // function getDecodedToken(token: string) {
//     try {
//         return jwtDecode<JwtPayload>(token);
//     } catch (error) {
//         console.error("Failed to decode JWT token:", error);
//         return null;
//     }
// }

// function userHasPermission(token: string, requiredRole: string) {
//     const decoded = getDecodedToken(token);

//     if (!decoded) {
//         return false;
//     }

//     console.log(decoded)

//     const userRoles = decoded.roles || [];

//     console.log(userRoles);

//     return userRoles.includes(requiredRole);
// }

export const usePostAdminLogin = () => {
    const { baseURL } = useBaseURL();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (data: LoginRequestBody): Promise<LoginResponseBody | string> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post<LoginResponseBody>(`${baseURL}/api/members/login`, data);

            if (response.data.role === 'ADMIN') {
                localStorage.setItem('role', response.data.role);
            } else {
                const errM = '관리자 권한이 없습니다.'
                return errM;
            }
            const authHeader = response.headers.authorization;
            if (!authHeader) {
                const errM = '관리자 권한이 없습니다.'
                return errM;
            }
            axios.defaults.headers.common.Authorization = `Bearer ${authHeader}`
            localStorage.setItem('accessToken', `Bearer ${authHeader}`);

            setLoading(false);
            return response.data;
        } catch (err) {
            setLoading(false);
            let errorMessage = '관리자 권한이 없습니다.';
            if (axios.isAxiosError(err) && err.response) {
                errorMessage = (err.response.data.detail as string) || '관리자 권한이 없습니다.';
                setError(errorMessage);
            } else {
                setError(errorMessage);
            }
            return errorMessage;
        }
    };

    return { login, loading, error };
};