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
