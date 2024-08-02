import axios from 'axios';
import { useEffect, useState } from 'react';

import { useBaseURL } from '@/provider/Auth/BaseUrlContext';

type MembersPointData = {
    id: number;
    email: string;
    name: string;
    point: number;
}

type MembersPointResponseData = MembersPointData[];

export const useGetMembersPoint = () => {
    const { baseURL } = useBaseURL();
    const [membersPoint, setMembersPoint] = useState<MembersPointResponseData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMembersPoint = async () => {
            const role = localStorage.getItem('role');
            if (role !== 'ADMIN') {
                alert('관리자 권한이 없습니다.');
                window.location.replace('/');
            }

            setLoading(true);
            setError(null);
            try {
                const accessToken = localStorage.getItem('accessToken');

                if (!accessToken) {
                    return 'No authorization token found';
                }

                const response = await axios.get<{ content: MembersPointData[] }>(`${baseURL}/api/admin/members`,
                    {
                        headers: {
                            'Authorization': accessToken
                        }
                    }
                );
                setMembersPoint(response.data.content);
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

        fetchMembersPoint();
    }, [baseURL]);

    return { membersPoint, loading, error };
};