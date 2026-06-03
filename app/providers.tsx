import { QueryClientProvider } from "@tanstack/react-query";
import {queryClient} from "@/src/lib/queryClient";
import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import React from "react";
import {useColorScheme} from "@/hooks/use-color-scheme";


export function Providers({ children }: { children: React.ReactNode }) {
    const colorScheme = useColorScheme();
    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    {children}
                </ThemeProvider>
            </SafeAreaProvider>
        </QueryClientProvider>
    );
}