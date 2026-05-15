// Type definitions
import {useRouter} from "expo-router";
import {ActivityIndicator, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import InputField from "@/components/input-field";
import React from "react";

export interface LoginFormData {
    phoneNumber: string;
}

export type LoginFormField = keyof LoginFormData;

export interface LoginFormErrors {
    phoneNumber?: string;
}

interface LoginFormProps {
    formData: LoginFormData;
    handlePhoneNumberChange: (text: string) => void;
    handleLogin: () => void;
    isLoading: boolean;
    errors: LoginFormErrors;
    isFormValid: boolean;
}

const LoginForm = ({
                        formData,
                        handlePhoneNumberChange,
                        handleLogin,
                        isLoading,
                        errors,
                        isFormValid
                    }: LoginFormProps) => {
    const router = useRouter();
    return (
        <View style={styles.formContainer}>
            <InputField
                label="Phone Number"
                value={formData.phoneNumber}
                onChangeText={handlePhoneNumberChange}
                error={errors.phoneNumber}
                placeholder="(123) 456-7890"
                keyboardType="phone-pad"
            />

            <View style={{display: "flex", gap: 5}}>
                {/* Login Button */}
                <Pressable
                    style={[styles.button, !isFormValid && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={!isFormValid || isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff"/>
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </Pressable>

                {/* Login Link */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don&#39;t have an acount? </Text>
                    <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
                        <Text style={styles.loginLink}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default LoginForm;


const styles = StyleSheet.create({
    formContainer: {
        justifyContent: 'center',
        flex: 1,
        display: 'flex',
        gap: 10,
    },
    button: {
        backgroundColor: '#000',
        height: 50,
        borderRadius: 50,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonDisabled: {
        backgroundColor: "#ddd",
        borderColor: "#ddd"
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Geist Medium',
    },
    footer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        color: '#000',
        fontSize: 14,
        fontFamily: 'Geist',
    },
    loginLink: {
        color: '#000',
        textDecorationLine: 'underline',
        fontSize: 14,
        fontWeight: '600',
    },
});