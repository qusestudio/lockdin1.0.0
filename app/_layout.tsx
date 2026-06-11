
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';
import {useCallback, useRef} from "react";
import * as SplashScreen from 'expo-splash-screen';
import {View} from "react-native";
import {AppProviders} from "@/src/providers/AppProviders";

SplashScreen.preventAutoHideAsync().catch(() => {});


SplashScreen.setOptions({
    duration: 300,
    fade: true,
});



const  RootLayout = ()=> {
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
            <AppProviders>
                <Stack>
                    <Stack.Screen name="(auth)" options={{headerShown: false}}/>
                    <Stack.Screen name="index" options={{headerShown: false}}/>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    <Stack.Screen name="modal" options={{presentation: 'modal', title: 'Modal'}}/>
                    <Stack.Screen name="room/[id]" options={{headerShown: false}}/>
                </Stack>
                <StatusBar style="auto"/>
            </AppProviders>
        </View>
    );
}

export default RootLayout;
