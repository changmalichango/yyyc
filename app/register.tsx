import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../authen/firebaseConfig";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "User registered!");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Register</Text>
      </View>

      {/* name, add in later  */}
      {/* <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      /> */}
      <View>
        <Text style={styles.subtext}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={"black"}
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />
      </View>

      <View>
        <Text style={styles.subtext}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={"black"}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>
      <View>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.button}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 30,
    marginBottom: 40,
    color: "black",
    fontWeight: "bold",
  },
  subtext: {
    fontSize: 15,
    color: "black",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    color: "black",
    padding: 10,
    marginBottom: 16,
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
