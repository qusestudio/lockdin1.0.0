import axios from "axios";


// eslint-disable-next-line import/no-named-as-default-member
const authApi = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_API_URL}/auth`,
    headers: {'Content-Type': 'application/json'},
});

// eslint-disable-next-line import/no-named-as-default-member
const api = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_API_URL} `,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export {authApi, api};