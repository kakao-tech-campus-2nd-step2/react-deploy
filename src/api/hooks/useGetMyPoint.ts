import axios from 'axios';
import { useEffect, useState } from 'react';

import { useBaseURL } from '@/provider/Auth/BaseUrlContext';

type MyPointResponseData = {
    point: number;
}

export const useGetMyPoint = () => {
    const { baseURL } = useBaseURL();
    const [myPoint, setMyPoint] = useState<MyPointResponseData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getMyPoint = async () => {

            setLoading(true);
            setError(null);
            try {
                const accessToken = localStorage.getItem('accessToken');

                if (!accessToken) {
                    return 'No authorization token found';
                }

                const response = await axios.get<MyPointResponseData>(`${baseURL}/api/members/point`,
                    {
                        headers: {
                            'Authorization': accessToken
                        }
                    }
                );
                console.log(response.data)
                setMyPoint(response.data);
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

        getMyPoint();
    }, [baseURL]);

    return { myPoint, loading, error };
};