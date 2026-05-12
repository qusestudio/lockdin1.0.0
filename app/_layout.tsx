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

export const unstable_settings = {
    anchor: '(tabs)',
};

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded, error] = useFonts({
        "DT Getai Grotesk Display Black": require("../assets/fonts/DTGetaiGroteskDisplay-Black.ttf"),
    })
    const [geistLoaded, geistError] = useFonts({
        "Geist": require("../assets/fonts/Geist-Regular.ttf"),
    })

    useEffect(() => {
        if (loaded || geistLoaded || geistError || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error, geistLoaded, geistError]);

    if (!loaded && !error && !geistLoaded && !geistError) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    <Stack.Screen name="modal" options={{presentation: 'modal', title: 'Modal'}}/>
                </Stack>
                <StatusBar style="auto"/>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
