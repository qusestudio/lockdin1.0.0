import axios from "axios";
import {authStore, useAuthStore} from "@/src/stores/authStore";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

// eslint-disable-next-line import/no-named-as-default-member
const authApi = axios.create({
    baseURL: `${API_URL}/auth`,
    headers: {'Content-Type': 'application/json'},
});

// eslint-disable-next-line import/no-named-as-default-member
const api = axios.create({
    baseURL: `${API_URL}`,
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

api.interceptors.response.use(
    response => response,
    async error =>   {
        console.log("Intercepted error response: ", error);
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            console.log("Refreshing token...");
            originalRequest._retry = true;

            const refreshToken = authStore.getState().refreshToken;

            const response = await authApi.post(
                `/refresh`,
                {
                    refreshToken: refreshToken,
                }
            );

            const newAccessToken = response.data.accessToken;

            authStore.getState().setAccessToken(newAccessToken);

            originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`;

            return api(originalRequest);
        }

        return Promise.reject(error);
    }
);

export {authApi, api};