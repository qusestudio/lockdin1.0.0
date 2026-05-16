import React from 'react';
import {Stack} from "expo-router";

const AuthLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="login" options={{headerShown: false, animation: "fade"}}/>
            <Stack.Screen name="signup" options={{headerShown: false, animation: "fade"}}/>
            <Stack.Screen name="verify-otp" options={{headerShown: false, animation: "slide_from_right"}}/>
        </Stack>
    );
};

export default AuthLayout;
