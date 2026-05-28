import React from 'react';
import {Redirect, Stack} from "expo-router";
import {useAuthHydration} from "@/src/hooks/use-auth-hydration";
import {useAuthStore} from "@/src/stores/authStore";

const AuthLayout = () => {
    const isAuthHydrated = useAuthHydration();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthHydrated) {
        return null;
    }

    if (isAuthenticated) {
        return <Redirect href="/(tabs)"/>;
    }

    return (
        <Stack>
            <Stack.Screen name="login" options={{headerShown: false, animation: "fade"}}/>
            <Stack.Screen name="signup" options={{headerShown: false, animation: "fade"}}/>
            <Stack.Screen name="verify-otp" options={{headerShown: false, animation: "slide_from_right"}}/>
        </Stack>
    );
};

export default AuthLayout;
