import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/use-color-scheme';
import {useFonts} from "expo-font";
import {useEffect} from "react";
import * as SplashScreen from 'expo-splash-screen';
import {SafeAreaProvider} from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();


SplashScreen.setOptions({
    duration: 300,
    fade: true,
});

// export const unstable_settings = {
//     anchor: '(tabs)',
// };

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded, error] = useFonts({
        "DT Getai Grotesk Display Black": require("../assets/fonts/DTGetaiGroteskDisplay-Black.ttf"),
    })
    const [geistLoaded, geistError] = useFonts({
        "Geist Medium": require("../assets/fonts/Geist-Medium.ttf"),
    });

    const [geistRLoaded, geistRError] = useFonts({
        "Geist": require("../assets/fonts/Geist-Regular.ttf"),
    });

    const [chillaxLoaded, chillaxError] = useFonts({
        "Chillax Medium": require("../assets/fonts/Chillax-Medium.otf"),
    });

    useEffect(() => {
        if (loaded || geistLoaded || geistError || error || geistRLoaded || geistRError || chillaxError || chillaxLoaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error, geistLoaded, geistError, geistRError, geistRLoaded, chillaxError, chillaxLoaded]);

    if (!loaded || !geistLoaded || !geistRLoaded || !chillaxLoaded) return null

    return (
        <SafeAreaProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack>
                    <Stack.Screen name="(auth)" options={{headerShown: false}}/>
                    <Stack.Screen name="index" options={{headerShown: false}}/>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    <Stack.Screen name="modal" options={{presentation: 'modal', title: 'Modal'}}/>
                </Stack>
                <StatusBar style="auto"/>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
