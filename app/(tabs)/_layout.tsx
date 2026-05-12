import {Tabs} from 'expo-router';
import React from 'react';

import {HapticTab} from '@/components/haptic-tab';
import {Colors} from '@/constants/theme';
import {useColorScheme} from '@/hooks/use-color-scheme';
import {View} from "react-native";
import {HugeiconsIcon} from "@hugeicons/react-native";
import {DashboardSquare03Icon} from "@hugeicons/core-free-icons";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Rooms',
                    tabBarLabelStyle: {fontFamily: 'Geist'},
                    tabBarIcon: ({color}) => (
                        <View>
                            <HugeiconsIcon icon={DashboardSquare03Icon} size={24} />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = {

}
