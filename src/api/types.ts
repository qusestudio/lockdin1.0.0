import { User } from '@/src/types/user';

export interface SignupRequest {
    fullName: string;
    schoolName: string;
    grade: string;
    email: string;
}

export interface LoginRequest {
    email: string;
}

export interface VerifyOtpRequest {
    email: string;
    code: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface VerifyOtpResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}
