import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* <Image
        source={require("favion.png")} 
        style={styles.logo}
      /> */}

      <Text style={styles.title}>CanIrent</Text>
      <Text style={styles.subtitle}>Your community, your connection</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => router.push("/register")}
      >
        <Text style={[styles.buttonText, styles.secondaryText]}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    width: "30%",
    backgroundColor: "#0066cc",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#0066cc",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
  secondaryText: {
    color: "#0066cc",
  },
});
