import { useRouter } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

export default function MeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "white", fontSize: 30 }}>
        This is the Me function!!!!!!!!!
      </Text>

      <Button title="Go to Register" onPress={() => router.push("/register")} />
      <Button title="Login" onPress={() => router.push("/login")} />
    </View>
  );
}
