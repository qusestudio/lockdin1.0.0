import {
    View, Text, StyleSheet,
     Alert, ScrollView,
} from 'react-native'
import {useRouter} from 'expo-router'
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useState} from "react";
import LoginForm, {LoginFormData, LoginFormErrors, LoginFormField} from "@/src/components/login-form";
import {login} from "@/src/api/auth";

export default function LoginScreen() {
    const router = useRouter()
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
    });
    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validateForm = (): boolean => {
        const newErrors: LoginFormErrors = {};
        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: LoginFormField, value: string): void => {
        setFormData((prev: LoginFormData) => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev: LoginFormErrors) => ({ ...prev, [field]: undefined }));
        }
    };

    // const handlePhoneNumberChange = (text: string): void => {
    //     // Format phone number as user types: (123) 456-7890
    //     const cleaned: string = text.replace(/\D/g, '');
    //     let formatted: string = cleaned;
    //
    //     if (cleaned.length > 0) {
    //         if (cleaned.length <= 3) {
    //             formatted = `(${cleaned}`;
    //         } else if (cleaned.length <= 6) {
    //             formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    //         } else {
    //             formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    //         }
    //     }
    //
    //     handleInputChange('phoneNumber', formatted);
    // };
    const handleLogin = async (): Promise<void> => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                await login({
                    email: formData.email,
                })

                // Here you would typically navigate to another screen or handle authentication
                console.log('Form data:', formData);

                // Navigate to opt screen.
                router.push({
                    pathname: "/(auth)/verify-otp",
                    params: {email: formData.email}
                });
            } catch (error) {
                Alert.alert('Error', 'Something went wrong. Please try again.', error as any);
            } finally {
                setIsLoading(false);
            }
        }
    };
    return (
        <SafeAreaView style={{ flex: 1 , backgroundColor: '#fff'}}>
            {/*<KeyboardAvoidingView*/}
            {/*    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}*/}
            {/*    style={styles.container}*/}
            {/*>*/}
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
                >
                    {/* Wordmark */}
                    <View style={{flexDirection: 'column', flex: 0.5, display: 'flex', justifyContent: 'flex-start', padding: 2 }}>
                        <View style={{flexDirection: 'row', display: 'flex', alignItems: 'flex-end', padding: 2, }}>
                            <Text style={{fontFamily: "DT Getai Grotesk Display Black", fontSize: 25}}>
                                Lockdin
                            </Text>
                            <Text style={{fontSize: 18, alignSelf: 'flex-start', marginTop: -2, fontFamily: "DT Getai Grotesk Display Black"}}>®</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center'}}>
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={{fontFamily: "Geist Medium", fontSize: 22}}>Welcome back!</Text>
                            <Text style={styles.subtitle}>Login and lock in</Text>
                        </View>

                        {/* Form */}
                        <LoginForm
                            formData={formData}
                            // handlePhoneNumberChange={handlePhoneNumberChange}
                            handleInputChange={handleInputChange}
                            handleLogin={handleLogin}
                            isLoading={isLoading}
                            errors={errors}
                            isFormValid={Object.values(formData).every(value => value.trim() !== "")}
                        />
                    </View>
                </ScrollView>
            {/*</KeyboardAvoidingView>*/}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        marginBottom: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#000',
        fontFamily: 'Geist',
    },
});
