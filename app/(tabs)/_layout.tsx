import {Tabs} from 'expo-router';
import React from 'react';

import {HapticTab} from '@/components/haptic-tab';
import {Colors} from '@/constants/theme';
import {useColorScheme} from '@/hooks/use-color-scheme';
import {View} from "react-native";
import {HugeiconsIcon} from "@hugeicons/react-native";
import {ChartRoseIcon, DashboardSquare03Icon} from "@hugeicons/core-free-icons";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarStyle: {backgroundColor: "#fff", height: 80, paddingTop: 10},
                tabBarLabelStyle: {fontSize: 12, fontFamily: 'Geist Medium', color: '#000'},
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Discover Rooms',
                    tabBarIcon: ({focused}) => (
                        <View style={{
                            paddingVertical: 3,
                            paddingHorizontal: 10,
                            borderRadius: 20,
                            backgroundColor: focused ? "#9EFFA4" : "transparent",
                        }}>
                            <HugeiconsIcon icon={DashboardSquare03Icon} size={24} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="me"
                options={{
                    title: 'Me',
                    tabBarIcon: ({color, focused}) => (
                        <View style={{
                            paddingVertical: 3,
                            paddingHorizontal: 10,
                            borderRadius: 20,
                            backgroundColor: focused ? "#9EFFA4" : "transparent",
                        }}>
                            <HugeiconsIcon icon={ChartRoseIcon} size={24} />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = {
    iconContainer: {
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 20,
    }
}
