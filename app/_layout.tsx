import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/use-color-scheme';
import {useCallback, useRef} from "react";
import * as SplashScreen from 'expo-splash-screen';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {View} from "react-native";

SplashScreen.preventAutoHideAsync().catch(() => {});


SplashScreen.setOptions({
    duration: 300,
    fade: true,
});

// export const unstable_settings = {
//     anchor: '(tabs)',
// };

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const splashHidden = useRef(false);

    const onLayoutRootView = useCallback(() => {
        if (splashHidden.current) {
            return;
        }

        splashHidden.current = true;
        SplashScreen.hideAsync().catch(() => {});
    }, []);

    return (
        <View style={{flex: 1}} onLayout={onLayoutRootView}>
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
        </View>
    );
}
