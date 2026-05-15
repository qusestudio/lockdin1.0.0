import {
    View, Text, TouchableOpacity, StyleSheet,
    Dimensions, Alert, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native'
import {useRouter} from 'expo-router'
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useState} from "react";
import LoginForm, {LoginFormData, LoginFormErrors, LoginFormField} from "@/components/login-form";
import SignupForm, {SignupFormData, SignupFormErrors, SignupFormField} from "@/components/signup-form";
import GradePickerModal from "@/components/grade-picker-modal";


const {width} = Dimensions.get('window')

export default function LoginScreen() {
    const router = useRouter()
    const [formData, setFormData] = useState<LoginFormData>({
        phoneNumber: '',
    });
    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validateForm = (): boolean => {
        const newErrors: SignupFormErrors = {};
        // Phone number validation
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else {
            // Remove all non-numeric characters for validation
            const cleanPhone: string = formData.phoneNumber.replace(/[\s()-]/g, '');
            if (!/^\d{10}$/.test(cleanPhone)) {
                newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: LoginFormField, value: string): void => {
        setFormData((prev: LoginFormData) => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev: SignupFormErrors) => ({ ...prev, [field]: undefined }));
        }
    };

    const handlePhoneNumberChange = (text: string): void => {
        // Format phone number as user types: (123) 456-7890
        const cleaned: string = text.replace(/\D/g, '');
        let formatted: string = cleaned;

        if (cleaned.length > 0) {
            if (cleaned.length <= 3) {
                formatted = `(${cleaned}`;
            } else if (cleaned.length <= 6) {
                formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
            } else {
                formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
            }
        }

        handleInputChange('phoneNumber', formatted);
    };
    const handleLogin = async (): Promise<void> => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                // Simulate API call
                await new Promise<void>((resolve) => setTimeout(resolve, 2000));

                Alert.alert(
                    'Success',
                    'Logged in successfully!',
                    [{ text: 'OK' }]
                );

                // Here you would typically navigate to another screen or handle authentication
                console.log('Form data:', formData);

                // Navigate to home screen.
                router.push('/(tabs)');
            } catch (error) {
                Alert.alert('Error', 'Something went wrong. Please try again.', error as any);
            } finally {
                setIsLoading(false);
            }
        }
    };
    return (
        <SafeAreaView style={{ flex: 1 , backgroundColor: '#fff'}}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
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
                            handlePhoneNumberChange={handlePhoneNumberChange}
                            handleLogin={handleLogin}
                            isLoading={isLoading}
                            errors={errors}
                            isFormValid={Object.values(formData).every(value => value.trim() !== "")}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
