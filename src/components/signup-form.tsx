import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import InputField from "@/src/components/input-field";
import {useRouter} from "expo-router";

// Type definitions
export interface SignupFormData {
    name: string;
    school: string;
    grade: string;
    email: string;
    // phoneNumber: string;
}

export interface SignupFormErrors {
    name?: string;
    school?: string;
    grade?: string;
    email?: string;
    // phoneNumber?: string;
}

export type SignupFormField = keyof SignupFormData;

interface SignupFormProps {
    formData: SignupFormData;
    handleInputChange: (field: SignupFormField, value: string) => void;
    // handlePhoneNumberChange: (text: string) => void;
    handleSignUp: () => void;
    isLoading: boolean;
    errors: SignupFormErrors;
    setShowGradePicker?: (show: boolean) => void;
    isFormValid: boolean;
}

const SignupForm = ({
                        formData,
                        handleInputChange,
                        // handlePhoneNumberChange,
                        handleSignUp,
                        isLoading,
                        errors,
                        setShowGradePicker,
                        isFormValid
                    }: SignupFormProps) => {
    const router = useRouter();
    return (
        <View style={styles.formContainer}>
            <InputField
                label="Full Name"
                value={formData.name}
                onChangeText={(text: string) => handleInputChange('name', text)}
                error={errors.name}
                placeholder="Full name"
                keyboardType="default"
            />

            <InputField
                label="School Name"
                value={formData.school}
                onChangeText={(text: string) => handleInputChange('school', text)}
                error={errors.school}
                placeholder="School name"
                keyboardType="default"
            />

            <InputField
                label="Grade"
                value={formData.grade}
                onChangeText={(text: string) => handleInputChange('grade', text)}
                error={errors.grade}
                placeholder="Select your grade"
                isGradeField={true}
                setShowGradePicker={setShowGradePicker}
            />

            <InputField
                label="Email"
                value={formData.email}
                onChangeText={(text: string) => handleInputChange('email', text)}
                error={errors.email}
                placeholder="Email address"
                keyboardType="email-address"
            />

            {/*<InputField*/}
            {/*    label="Phone Number"*/}
            {/*    value={formData.phoneNumber}*/}
            {/*    onChangeText={handlePhoneNumberChange}*/}
            {/*    error={errors.phoneNumber}*/}
            {/*    placeholder="(123) 456-7890"*/}
            {/*    keyboardType="phone-pad"*/}
            {/*/>*/}

            <View style={{display: "flex", gap: 5}}>
                {/* Sign Up Button */}
                <Pressable
                    style={[styles.button, !isFormValid && styles.buttonDisabled]}
                    onPress={handleSignUp}
                    disabled={!isFormValid || isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff"/>
                    ) : (
                        <Text style={styles.buttonText}>Sign Up</Text>
                    )}
                </Pressable>

                {/* Login Link */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                        <Text style={styles.loginLink}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default SignupForm;


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
    closeButton: {
        fontSize: 24,
        color: '#777',
        padding: 5,
    },
});