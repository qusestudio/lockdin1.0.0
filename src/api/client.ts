import axios from "axios";
import {useAuthStore} from "@/src/stores/authStore";


// eslint-disable-next-line import/no-named-as-default-member
const authApi = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_API_URL}/auth`,
    headers: {'Content-Type': 'application/json'},
});

// eslint-disable-next-line import/no-named-as-default-member
const api = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_API_URL}`,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
        config.headers.set?.("Authorization", `Bearer ${token}`);
    }

    return config;
});

export {authApi, api};