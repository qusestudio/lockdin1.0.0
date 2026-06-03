import {Tabs, useRouter} from 'expo-router';
import React, {useEffect} from 'react';

import {HapticTab} from '@/src/components/haptic-tab';
import {Colors} from '@/constants/theme';
import {useColorScheme} from '@/hooks/use-color-scheme';
import {View} from "react-native";
import {HugeiconsIcon} from "@hugeicons/react-native";
import {ChartRoseIcon, Home03Icon} from "@hugeicons/core-free-icons";
import {useAuthStore} from "@/src/stores/authStore";
import {useAuthHydration} from "@/src/hooks/use-auth-hydration";

export default function TabLayout() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isAuthHydrated = useAuthHydration();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    useEffect(() => {
        if (isAuthHydrated && !isAuthenticated) {
            router.replace('/');
        }
    }, [isAuthHydrated, isAuthenticated, router]);

    if (!isAuthHydrated) {
        return null;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: {fontSize: 12, fontFamily: 'Geist Medium', color: '#000'},
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: '',
                    tabBarIcon: ({focused}) => (
                        <HugeiconsIcon style={{elevation: 5, shadowColor: "#444"}} fill={focused ? "#000" : "#fff"}  color={focused ? "#fff" : "#000"} icon={Home03Icon} size={35}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="me"
                options={{
                    title: '',
                    tabBarIcon: ({color, focused}) => (
                        <View style={{
                            paddingVertical: 3,
                            paddingHorizontal: 10,
                            borderRadius: 20,
                        }}>
                            <HugeiconsIcon fill={focused ? "#000" : "#fff"} color={focused ? "#fff" : "#000"} icon={ChartRoseIcon} size={35}/>
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = {
    tabBar: {
        backgroundColor: "#fff",
        height: 80,
        paddingTop: 10,
        borderTopColor: "#fff",
        // shadowColor: "#fff",
        elevation: 0,
    }
}
