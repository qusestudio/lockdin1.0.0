
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';
import {useCallback, useRef} from "react";
import * as SplashScreen from 'expo-splash-screen';
import {View} from "react-native";
import {Providers} from "@/app/providers";

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
            <Providers>
                <Stack>
                    <Stack.Screen name="(auth)" options={{headerShown: false}}/>
                    <Stack.Screen name="index" options={{headerShown: false}}/>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    <Stack.Screen name="modal" options={{presentation: 'modal', title: 'Modal'}}/>
                </Stack>
                <StatusBar style="auto"/>
            </Providers>
        </View>
    );
}

export default RootLayout;