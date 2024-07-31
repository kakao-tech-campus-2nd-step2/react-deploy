import axios from "axios";

import { BASE_URL } from "../instance";

export interface User {
    id: string;
    password: string;
}

export const getUsersPath = () => `${BASE_URL}/api/users`;
export const getUserPath = (id: string) => `${BASE_URL}/api/users/${id}`;

export const login = async (id: string, password: string) => {
    try{
        const response = await axios.post(getUserPath(id), {
            password,
        });
        return !axios.isAxiosError(response)
    } catch (e) {
        console.error(e);
        return false;
    }
}

export const signUp = async (id: string, password: string) => {
    try{
        const response = await axios.post(getUsersPath(), {
            id,
            password,
        });
        
        return !axios.isAxiosError(response) 
    } catch (e) {
        console.error(e);
        return false;
    }
}