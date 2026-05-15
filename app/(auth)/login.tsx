import {
    View, Text, TouchableOpacity, StyleSheet,
    Dimensions,
} from 'react-native'
import {Stack, useRouter} from 'expo-router'
import {SafeAreaView} from "react-native-safe-area-context";

const LoginScreen = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                    animation: "slide_from_right"
                }}
            />
            <Login/>
        </>
    )
}


const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wordmark: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 8,
        fontFamily: "DT Getai Grotesk Display Black",
    },
    logo: {
        fontSize: 32,
        fontFamily: 'DT Getai Display Black',
        color: '#000',
    },
    logoSup: {
        fontSize: 12,
        color: '#000',
        marginTop: 6,
    },
    slide: {
        width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePlaceholder: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    placeholderText: {
        color: '#9E9E9E',
        fontFamily: 'Geist',
        fontSize: 14,
    },
    slideText: {
        fontSize: 30,
        textAlign: 'center',
        color: '#000',
        fontFamily: "DT Getai Grotesk Display Black",
        lineHeight: 28,
        paddingVertical: 8,
    },
    dots: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        marginBottom: 12,
    },
    dot: {
        height: 8,
        borderRadius: 4,
    },
    buttons: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        gap: 12,
    },
    primaryBtn: {
        backgroundColor: '#00FF11',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        alignItems: 'center',
    },
    primaryText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'Geist Medium',
    },
    secondaryBtn: {
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
    },
    secondaryText: {
        color: '#000',
        fontSize: 16,
        paddingHorizontal: 20,
        textDecorationLine: 'underline',
        fontFamily: 'Geist Medium',
    },
})


function Login() {
    const router = useRouter()

    return (
        <SafeAreaView style={styles.container}>

            {/* Wordmark */}
            <View style={{flexDirection: 'column', display: 'flex', flex: 1, justifyContent: 'flex-end', padding: 2,}}>
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

            {/* Carousel */}

            {/* Dots */}


            {/* Buttons */}
            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => router.push('/signup')}
                >
                    <Text style={styles.primaryText}>Get Started</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => router.push('/login')}
                >
                    <Text style={{fontFamily: "Geist"}}>Already have an account?</Text>
                    <Text style={styles.secondaryText}>Login</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}


export default LoginScreen;
