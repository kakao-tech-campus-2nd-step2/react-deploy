import axios from "axios";

import { fetchInstance } from "../instance";

export interface User {
    id: string;
    password: string;
}

export const getUsersPath = (baseURL?: string) => `${baseURL ?? ''}/api/users`;
export const getUserPath = (id: string, baseURL?: string) => `${baseURL ?? ''}/api/users/${id}`;

export const login = async (id: string, password: string, baseURL: string) => {
    try{
        const response = await fetchInstance(baseURL).post(getUserPath(id), {
            password,
        });
        return !axios.isAxiosError(response)
    } catch (e) {
        console.error(e);
        return false;
    }
}

export const signUp = async (id: string, password: string, baseURL: string) => {
    try{
        const response = await fetchInstance(baseURL).post(getUsersPath(), {
            id,
            password,
        });
        
        return !axios.isAxiosError(response) 
    } catch (e) {
        console.error(e);
        return false;
    }
}