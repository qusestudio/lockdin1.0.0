import { authApi } from './client';
import { SignupRequest, LoginRequest, VerifyOtpRequest } from './types';

export const signup = async (data: SignupRequest) => {
    console.log("Signing up...");
    const response = await authApi.post('/signup', data);
    console.log("returning response...");
    return response.data;
};

export const login = async (data: LoginRequest) => {
    console.log("Logging in...");
    console.log(data);
    const response = await authApi.post('/login', data);
    return response.data;
};

export const verifyOtp = async (data: VerifyOtpRequest) => {
    console.log("Verify OTP...");
    console.log(data);
    const response = await authApi.post('/verify-otp', data);
    // refresh token and access token are in this response

    return response.data;
};
