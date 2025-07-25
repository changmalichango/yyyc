import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="itemdetails" options={{ headerShown: false }} />
            <Stack.Screen name="My Listings" options={{ headerShown: false}} />
            <Stack.Screen name="chatroom" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="edit profile" options={{ headerShown: false }} />
            <Stack.Screen name="favourites" options={{ headerShown: false }} />
            <Stack.Screen name="myitemdetails" options={{ headerShown: false }}/>
            <Stack.Screen name="pendingRequests" options={{ headerShown: false }}/>
             
          </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
  );
}
