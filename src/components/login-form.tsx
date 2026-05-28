// Type definitions
import {useRouter} from "expo-router";
import {ActivityIndicator, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import InputField from "@/src/components/input-field";
import React from "react";
import {SignupFormField} from "@/src/components/signup-form";

export interface LoginFormData {
    email: string;
}

export type LoginFormField = keyof LoginFormData;

export interface LoginFormErrors {
    email?: string;
}

interface LoginFormProps {
    formData: LoginFormData;
    handleInputChange: (field: LoginFormField, value: string) => void;
    handleLogin: () => void;
    isLoading: boolean;
    errors: LoginFormErrors;
    isFormValid: boolean;
}

const LoginForm = ({
                       formData,
                       handleInputChange,
                       handleLogin,
                       isLoading,
                       errors,
                       isFormValid
                   }: LoginFormProps) => {
    const router = useRouter();
    return (
        <View style={styles.formContainer}>
            <InputField
                label="Email"
                value={formData.email}
                onChangeText={(text: string) => handleInputChange('email', text)}
                error={errors.email}
                placeholder="example@domain.com"
                keyboardType="email-address"
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
                    <Text style={styles.footerText}>Don&#39;t have an account? </Text>
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