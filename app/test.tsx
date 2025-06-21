import { supabase } from "@/authen/supabase";
import { Ionicons } from "@expo/vector-icons";
import { decode } from "base64-arraybuffer";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

export default function ListScreen() {
  const colorScheme = useColorScheme();
  const styleColor =
    colorScheme === "dark" ? styles.darkStyle : styles.lightStyle;
  const textColor = colorScheme === "dark" ? styles.lightText : styles.darkText;

  const [item, setItem] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setdescription] = useState("");
  const [address, setAddress] = useState("");

  const [image, setImage] = useState<string | null>(null);

  const [imageUri, setImageUri] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    // const userId = await getUid();

    if (!result.canceled) {
      const base64 = result.assets[0].base64;
      const fileName = `${Date.now()}.jpg`;

      const { error } = await supabase.storage
        .from("listing-images")
        .upload(fileName, decode(base64!), {
          contentType: "image/jpeg",
          upsert: true,
        });
      if (error) {
        Alert.alert("its here");
      } else {
        Alert.alert("Upload Sucessful");

        const { data } = supabase.storage
          .from("listing-images")
          .getPublicUrl(fileName);

        const imageUri = data.publicUrl;
        console.log(imageUri);

        return imageUri ?? null;
      }
    }
  };

  // const [pic, setPic] = useState<string | null>(null);
  // useEffect(async () => {
  // const fetchuri = await pickImage();
  // }, []);
  return (
    <SafeAreaView style={[styles.container, styleColor]}>
      {/* IMAGE BOX
        ////////////////////////////////////////////////////////////////////////// */}

      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={[textColor, styles.textOnBox]}>Image</Text>
          <Text style={{ marginTop: 15, color: "grey" }}>
            (maximum of 3 images)
          </Text>
        </View>

        {/* <View style={[styles.imageBox]}></View> */}
        <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <View style={styles.icon}>
            <Ionicons name="add" size={40} color={"grey"} />
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.uploadBox}>
          <Text style={{ fontWeight: "bold", color: "white" }}>UPLOAD</Text>
          {/* <Image source={{uri:}} */}
        </TouchableOpacity>
      </View>
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
  icon: {
    height: 50,
    flexDirection: "row",
    width: 50,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
  },
  image: {
    width: 50,
    height: 50,
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
