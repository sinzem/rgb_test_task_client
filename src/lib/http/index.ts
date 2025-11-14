import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

interface ApiConfig extends AxiosRequestConfig {
    baseURL: string;
}

export const API_URL = process.env.NEXT_PUBLIC_APP_SERVER_URL || "http://localhost:5500";


const createApi = (config: ApiConfig): AxiosInstance => {
    return axios.create(config)
}

export const $api = createApi({
    baseURL: API_URL,
    withCredentials: true,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
})