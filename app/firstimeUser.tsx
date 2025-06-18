import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

export default function ChatScreen() {
  return (
    <ImageBackground
      source={require("../assets/images/firstbackground.png")}
      style={styles.container}
    >
      {/* <View>
        <Text style={styles.title}>Welcome to CanIRent</Text>
      </View> */}
    </ImageBackground>
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <Text style={{ color: "#0066cc", fontSize: 30 }}>
    //     This is the chat fuction !!!👋
    //   </Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, resizeMode: "contain" },
  title: { color: "white", fontSize: 40, fontWeight: "bold" },
});
