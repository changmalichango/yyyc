import { getEmail, getUid } from "@/assets/functions";
import { supabase } from "@/authen/supabase";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";

export default function FisrtTimeScreen() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const storeData = async () => {
    const myUid = await getUid();
    const myEmail = await getEmail();
    console.log(myUid);

    const { data: users, error } = await supabase
      .from("users")
      .insert({ uid: myUid, name: username, email: myEmail, phone: phone });
    if (error) {
      Alert.alert("Error:", error.message);
    } else {
      router.replace("/home");
    }
  };

  const NameInput = (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Text>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Your username"
        value={username}
        onChangeText={setUsername}
      />
    </View>
  );
  const PhoneInput = (
    <TextInput
      style={styles.input}
      placeholder="Your phone number"
      value={phone}
      onChangeText={setPhone}
    />
  );
  const FinishPage = (
    <TouchableOpacity style={styles.button} onPress={storeData}>
      <Text style={{ fontWeight: "bold" }}>Start Renting!</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../assets/images/firstbackground.png")}
      style={styles.container}
    >
      <Onboarding
        pages={[
          {
            backgroundColor: "rgba(0,0,0,0.6)",

            title: "Tell us your username!",
            subtitle: "",
            image: NameInput,
            titleStyles: styles.title,
          },
          {
            backgroundColor: "rgba(0,0,0,0.6)",
            image: PhoneInput,
            title: "Your Phone Number",
            titleStyles: styles.title,
            subtitle: "",
          },
          {
            backgroundColor: "rgba(0,0,0,0.6)",
            image: FinishPage,
            title: "You are all set!",
            titleStyles: styles.title,
            subtitle: "",
          },
        ]}
      />
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
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 50,
  },
  input: {
    // backgroundColor: "blue",
    height: 50,
    width: "80%",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#bbbbbb",
    justifyContent: "center",
    paddingLeft: 5,
    color: "white",
  },
  button: {
    width: "30%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    alignSelf: "center",
    alignItems: "center",
  },
});
