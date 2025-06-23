import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";

import { getUid } from "@/assets/functions";
import { supabase } from "@/authen/supabase";
import { decode } from "base64-arraybuffer";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { DropdownSex } from "@/assets/functions";

export default function ListScreen() {
  const colorScheme = useColorScheme();
  const styleColor =
    colorScheme === "dark" ? styles.darkStyle : styles.lightStyle;
  const textColor = colorScheme === "dark" ? styles.lightText : styles.darkText;

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const base64 = result.assets[0].base64;
      const fileName = `${Date.now()}.jpg`;
      console.log(result.assets[0].uri);
      const { error: uploadError } = await supabase.storage
        .from("profile-images")
        .upload(fileName, decode(base64!), {
          contentType: "image/jpeg",
          upsert: true,
        });
      if (uploadError) {
        Alert.alert("its here");
      } else {
        Alert.alert("Upload Sucessful");
      }

      const { data, error } = await supabase.storage
        .from("profile-images")
        .createSignedUrl(fileName, 3000000);

      setImageUrl(data?.signedUrl ?? null);
      console.log(data?.signedUrl);
    }
  };

  const updateProfile = async () => {
    const myUid = await getUid();

    const { data, error } = await supabase
      .from("users")
      .update({
        name: username,
        profile_pic: imageUrl,
        bio: bio,
        gender: gender,
      })
      .eq("uid", myUid);

    if (error) {
      Alert.alert(error.message);
    } else {
      console.log(data);
      Alert.alert("Upload Successfully!");
    }
  };

  return (
    <SafeAreaView style={[styles.container, styleColor]}>
      <ScrollView style={styles.container2}>
        <View>
          <Text style={[textColor, styles.textOnBox]}>Username</Text>
          <View style={[styles.box1]}>
            <TextInput
              placeholder="Enter the name of your item"
              style={{ paddingLeft: 5, fontSize: 15 }}
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </View>

        <View>
          <Text style={[textColor, styles.textOnBox]}>Gender</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ justifyContent: "center" }}></View>
            <View style={[styles.dropbox]}>
              {/* <Text style={textColor}>per month</Text> */}

              <DropdownSex onValueChange={(val) => setGender(val)} />
            </View>
          </View>
        </View>

        {/* BIO BOX
        //////////////////////////////////////////////////////////////////////// */}

        <View>
          <Text style={[textColor, styles.textOnBox]}>Bio</Text>
          <View style={[styles.box3]}>
            <TextInput
              placeholder="..."
              style={{
                paddingLeft: 5,
                fontSize: 15,
                paddingTop: 5,
              }}
              value={bio}
              onChangeText={setBio}
            />
          </View>
        </View>

        <View
          style={
            {
              // justifyContent: "center",
              // alignContent: "center",
              // alignSelf: "center",
            }
          }
        >
          <Image
            source={
              imageUrl
                ? { uri: image }
                : require("../assets/images/defaultpfp.png")
            }
            style={{ alignSelf: "center", width: 200, height: 200 }}
          />
        </View>
        <View>
          <TouchableOpacity
            style={[styles.changeBox, styleColor]}
            onPress={pickImage}
          >
            <Text style={[{ fontWeight: "bold" }, textColor]}>
              Change Profile Picture
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.uploadBox} onPress={updateProfile}>
            <Text style={{ fontWeight: "bold", color: "white" }}>UPLOAD</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  darkStyle: { backgroundColor: "black" },
  lightStyle: { backgroundColor: "white" },
  darkText: { color: "black" },
  lightText: { color: "white" },

  container: { flex: 1 },
  container2: { backgroundColor: "", paddingLeft: 10, paddingTop: 10 },
  title: {
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: 20,
  },
  textOnBox: { fontWeight: "bold", marginTop: 15, marginBottom: 2 },
  box1: {
    // backgroundColor: "blue",
    height: 50,
    width: "95%",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#bbbbbb",
    justifyContent: "center",
  },
  box2: {
    height: 50,
    width: "40%",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "grey",
    justifyContent: "center",
  },
  dropbox: {
    height: 50,
    width: "40%",
    // borderWidth: 1,
    borderRadius: 4,
    borderColor: "grey",
    justifyContent: "center",
  },
  box3: {
    // backgroundColor: "blue",
    height: 150,
    width: "95%",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "grey",
    // justifyContent: "center",
  },
  imageBox: {
    // color: "grey",
    height: 50,
    flexDirection: "row",
    width: 50,
    // borderWidth: 2,
    borderRadius: 4,
    borderColor: "grey",
    justifyContent: "space-between",
    alignItems: "center",
  },
  //
  image: {
    width: 50,
    height: 50,
  },

  changeBox: {
    marginTop: 15,
    // backgroundColor: "white",
    height: 50,
    width: "95%",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBox: {
    marginTop: 15,
    backgroundColor: "darkgreen",
    height: 50,
    width: "95%",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
});
