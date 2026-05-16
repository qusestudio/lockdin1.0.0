import {
    View, Text, StyleSheet,
    Alert, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Pressable, TouchableOpacity,
} from 'react-native'
import {useLocalSearchParams, useRouter} from 'expo-router'
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useState} from "react";

import {LoginFormData, LoginFormErrors, LoginFormField} from "@/components/login-form";
import {OtpInput} from "react-native-otp-entry";

export default function VerifyOTPScreen() {
    const {phoneNumber} = useLocalSearchParams<{ phoneNumber: string }>()
    const router = useRouter()
    const [formData, setFormData] = useState<LoginFormData>({
        phoneNumber: '',
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [otp, setOTP] = useState<string>()
    const [verifiable, setVerifiable] = useState<boolean>(false);

    const handleVerify = async (): Promise<void> => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise<void>((resolve) => setTimeout(resolve, 2000));
            console.log('OTP:', otp);

            // Navigate to opt screen.
            router.replace('/(tabs)');
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again.', error as any);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
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
                    <View style={{
                        flexDirection: 'column',
                        flex: 0.5,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        padding: 2
                    }}>
                        <View style={{flexDirection: 'row', display: 'flex', alignItems: 'flex-end', padding: 2,}}>
                            <Text style={{fontFamily: "DT Getai Grotesk Display Black", fontSize: 25}}>
                                Lockdin
                            </Text>
                            <Text style={{
                                fontSize: 18,
                                alignSelf: 'flex-start',
                                marginTop: -2,
                                fontFamily: "DT Getai Grotesk Display Black"
                            }}>®</Text>
                        </View>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={{fontFamily: "Geist Medium", fontSize: 22}}>Almost there.</Text>
                            <Text style={styles.subtitle}>We sent a 6-digit code to {phoneNumber}. {"\n"} Enter it
                                below. </Text>
                        </View>

                        {/* Input Change  */}
                        <OtpInput
                            type={"numeric"}
                            textInputProps={{
                                accessibilityLabel: "One-Time Password",
                            }}
                            theme={{
                                focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                                focusStickStyle: {backgroundColor: '#000'},
                            }}
                            focusColor={"#00ff11"}
                            onFilled={(code) => {
                                setOTP(code)
                                setVerifiable(true)
                            }}
                            onTextChange={(code) => {
                                if (code.length < 6) {
                                    setVerifiable(false)
                                }
                            }}
                        />
                        <Pressable
                            style={[styles.button, !verifiable && styles.buttonDisabled]}
                            disabled={!verifiable || isLoading}
                            onPress={handleVerify}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff"/>
                            ) : (
                                <Text style={styles.buttonText}>Verify</Text>
                            )}
                        </Pressable>
                        <View style={{marginVertical: 10,alignItems: "center", justifyContent: "center",  flexDirection: "row"}}>
                            <TouchableOpacity>
                                <Text style={{textDecorationLine: "underline", fontFamily: "Geist"}}>
                                    Resend code
                                </Text>
                            </TouchableOpacity>
                            <Text style={{fontFamily: "Geist"}}> in </Text>
                            <Text style={{fontFamily: "Chillax Medium"}}>0.45</Text>
                        </View>
                    </View>
                </ScrollView>
            {/*</KeyboardAvoidingView>*/}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    activePinCodeContainer: {
      backgroundColor: "#eeffee",
    },
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
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Geist Medium',
    },
    header: {
        marginBottom: 30,
        alignItems: 'center',
        gap: 4
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
        textAlign: 'center',
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
});
