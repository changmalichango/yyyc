import { supabase } from "@/authen/supabase";
import { useRouter } from "expo-router";
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

import { getUid } from "@/assets/functions";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { data: data1, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert("Success", "Logged in!");
      // if (data.session) {
      //   console.log("authenticated");
      // }

      const myUid = await getUid();

      const { data: currentUsername, error } = await supabase
        .from("users")
        .select("name")
        .eq("uid", myUid)
        .maybeSingle();

      if (error) {
        Alert.alert(error.message);
      }

      // console.log(typeof myUid);
      // console.log(currentUsername);
      // console.log(currentUsername?.name);
      // console.log(!currentUsername?.name);

      if (!currentUsername?.name) {
        router.replace("/firstimeUser");
      } else {
        router.replace("/me");
      }
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/loginbackground.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!👋</Text>

        <View style={styles.containerTwo}>
          <Text style={styles.subtext}>Email</Text>

          <TextInput
            style={styles.input}
            placeholder="Example@email.com"
            placeholderTextColor={"grey"}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.containerThree}>
          <Text style={styles.subtext}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={"grey"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View>
          <TouchableOpacity onPress={() => router.replace("/me")}>
            <Text style={styles.forget}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.button}>Sign in</Text>
          </TouchableOpacity>
        </View>

        {/* <Button style={styles.button} title="Log In" onPress={handleLogin} /> */}
      </View>
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
    padding: 20,
    // justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  containerTwo: {},
  containerThree: {},
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "white",
    marginBottom: 100,
    marginTop: 100,
  },
  subtext: {
    fontSize: 15,
    color: "white",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbdcf0",
    backgroundColor: "black",
    color: "white",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  forget: {
    color: "#73c2fb",
    marginLeft: 270,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#D5FFFF",
    borderRadius: 8,
    padding: 14,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});
