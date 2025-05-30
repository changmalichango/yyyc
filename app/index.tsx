import { useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/homepage.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        {/* <Image
        source={require("favion.png")} 
        style={styles.logo}
      /> */}

        <Text style={styles.title}>CanIrent</Text>

        <View>
          <Text style={styles.subtitle}>Make Use, Make Value!</Text>
        </View>

        <View>
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
            <Text style={[styles.buttonText, styles.secondaryText]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    height: "100%",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 150,
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 20,
    marginBottom: 150,
    textAlign: "center",
  },
  button: {
    width: "30%",
    backgroundColor: "#0066cc",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    alignSelf: "center",
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
