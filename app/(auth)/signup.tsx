import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import SignupForm, {SignupFormData, SignupFormErrors, SignupFormField} from "@/components/signup-form";
import GradePickerModal from "@/components/grade-picker-modal";
import {useRouter} from 'expo-router'
import {SafeAreaView} from "react-native-safe-area-context";

const SignupScreen: React.FC = () => {
    const [formData, setFormData] = useState<SignupFormData>({
        name: '',
        school: '',
        grade: '',
        phoneNumber: '',
    });
    const [errors, setErrors] = useState<SignupFormErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showGradePicker, setShowGradePicker] = useState(false)


    const router = useRouter();


    const validateForm = (): boolean => {
        const newErrors: SignupFormErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name.trim())) {
            newErrors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
        }

        // School validation
        if (!formData.school.trim()) {
            newErrors.school = 'School name is required';
        } else if (formData.school.trim().length < 2) {
            newErrors.school = 'School name must be at least 2 characters';
        }

        // Grade validation
        if (!formData.grade) {
            newErrors.grade = 'Please select your grade';
        }

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

    const handleInputChange = (field: SignupFormField, value: string): void => {
        setFormData((prev: SignupFormData) => ({ ...prev, [field]: value }));
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

    const handleSignUp = async (): Promise<void> => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                // Simulate API call
                await new Promise<void>((resolve) => setTimeout(resolve, 2000));

                Alert.alert(
                    'Success',
                    'Account created successfully!',
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
                            <Text style={{fontFamily: "Geist Medium", fontSize: 22}}>Create account</Text>
                            <Text style={styles.subtitle}>Sign up to get started</Text>
                        </View>

                        {/* Form */}
                        <SignupForm
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handlePhoneNumberChange={handlePhoneNumberChange}
                            handleSignUp={handleSignUp}
                            isLoading={isLoading}
                            errors={errors}
                            setShowGradePicker={setShowGradePicker}
                            isFormValid={Object.values(formData).every(value => value.trim() !== "")}
                        />
                    </View>
                </ScrollView>

                {/* Grade Picker Modal */}
                <GradePickerModal
                    handleInputChange={handleInputChange}
                    formData={formData}
                    visible={showGradePicker}
                    onClose={() => setShowGradePicker(false)}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SignupScreen;

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