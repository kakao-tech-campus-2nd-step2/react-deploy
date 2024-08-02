import axios from 'axios';
import { useState } from 'react';

import { useBaseURL } from '@/provider/Auth/BaseUrlContext';

type PatchPointRequestBody = {
    depositPoint: number;
}

type PatchPointResponseBody = {
    point: number;
}

export const usePatchMemberPoint = () => {
    const { baseURL } = useBaseURL();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const patchMemberPoint = async (data: PatchPointRequestBody, memberId: string) => {
        setLoading(true);
        setError(null);
        try {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                return 'No authorization token found';
            }

            const response = await axios.patch<PatchPointResponseBody>(
                `${baseURL}/api/admin/members/${memberId}/point`,
                data,
                {
                    headers: {
                        'Authorization': accessToken
                    }
                }
            );

            return response.data.point;
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

    return { patchMemberPoint, loading, error };
};