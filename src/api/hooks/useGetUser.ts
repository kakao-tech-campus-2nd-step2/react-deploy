import axios from "axios";

import { authSessionStorage } from "@/utils/storage";

import { fetchInstance } from "../instance";

export interface User {
    email: string;
    password: string;
}

export const getUsersPath = (baseURL?: string) => `${baseURL ?? ''}/api/members/register`;
export const getUserPath = (baseURL?: string) => `${baseURL ?? ''}/api/members/login`;

export const login = async (email: string, password: string, baseURL: string) => {
    try{
        const response = await fetchInstance(baseURL).post(getUserPath(), {
            email,
            password,
        });
        if(axios.isAxiosError(response)) return false;
        const token = response.headers.token;
        authSessionStorage.set({email, token});
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export const signUp = async (email: string, password: string, baseURL: string) => {
    try{
        const response = await fetchInstance(baseURL).post(getUsersPath(), {
            email,
            password,
        });
        
        return !axios.isAxiosError(response) 
    } catch (e) {
        console.error(e);
        return false;
    }
}