import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";

import {
  DropdownCondition,
  DropdownDuration,
  getName,
  getUid,
} from "@/assets/functions";
import { supabase } from "@/authen/supabase";
import { Ionicons } from "@expo/vector-icons";
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
        .from("listing-images")
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
        .from("listing-images")
        .createSignedUrl(fileName, 10000);

      setImageUrl(data?.signedUrl ?? null);
      console.log(data?.signedUrl);
    }
  };

  const storeDataUploads = async () => {
    const myUid = await getUid();
    const name = await getName();
    const { data, error } = await supabase.from("uploads").insert({
      uid: myUid,
      name: name,
      item: item,
      duration: duration,
      condition: selectedCondition,
      price: price,
      description: description,
      address: address,
      image_url: imageUrl,
    });
    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert("Upload Successfully!");
    }
  };

  return (
    <SafeAreaView style={[styles.container, styleColor]}>
      {/* TITLE
      ////////////////////////////////////////////////////////////////////////////
      */}

      <Text style={[styles.title, textColor]}>List your item</Text>

      {/* ITEM NAME BOX
        //////////////////////////////////////////////////////////////////////// */}

      <ScrollView style={styles.container2}>
        <View>
          <Text style={[textColor, styles.textOnBox]}>Name</Text>
          <View style={[styles.box1]}>
            <TextInput
              placeholder="Enter the name of your item"
              style={{ paddingLeft: 5, fontSize: 15 }}
              value={item}
              onChangeText={setItem}
            />
          </View>
        </View>

        {/* CONDITON BOX
        ///////////////////////////////////////////////////////////////////////// */}
        <View>
          <Text style={[textColor, styles.textOnBox]}>Conditions</Text>

          <View style={[styles.dropbox]}>
            <DropdownCondition
              onValueChange={(val) => setSelectedCondition(val)}
            />
          </View>
          <View style={{ justifyContent: "center", marginRight: 43 }}>
            {/* <Text
              style={[
                textColor,
                { fontWeight: "bold", fontSize: 15, paddingLeft: 10 },
              ]}
            >
              $
            </Text> */}
          </View>
        </View>

        {/* PRICE BOX 
        //////////////////////////////////////////////////////////////////////// */}

        <View>
          <Text style={[textColor, styles.textOnBox]}>Price</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.box2]}>
              <TextInput
                placeholder="$"
                value={price}
                onChangeText={setPrice}
              />
            </View>
            <View style={{ justifyContent: "center", marginRight: 43 }}>
              <Text
                style={[
                  textColor,
                  { fontWeight: "bold", fontSize: 15, paddingLeft: 10 },
                ]}
              >
                $
              </Text>
            </View>
            <View style={[styles.dropbox]}>
              {/* <Text style={textColor}>per month</Text> */}

              <DropdownDuration onValueChange={(val) => setDuration(val)} />
            </View>
          </View>
        </View>

        {/* DESCRIPTION NAME BOX
        //////////////////////////////////////////////////////////////////////// */}

        <View>
          <Text style={[textColor, styles.textOnBox]}>Description</Text>
          <View style={[styles.box3]}>
            <TextInput
              placeholder="Provide more details for your item!"
              style={{
                paddingLeft: 5,
                fontSize: 15,
                paddingTop: 5,
                textAlignVertical: 'top',
                flexShrink: 1,
                overflow: 'hidden',
                includeFontPadding: false,
                width: '100%'
              }}
              multiline
              value={description}
              onChangeText={setdescription}
            />
          </View>
        </View>

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

        {/* ADDRESS
        //////////////////////////////////////////////////////////////// */}
        <View>
          <Text style={[textColor, styles.textOnBox]}>Address</Text>
          <View style={[styles.box1]}>
            <TextInput
              placeholder="Enter your address"
              style={{ paddingLeft: 5, fontSize: 15 }}
              value={address}
              onChangeText={setAddress}
            />
          </View>
        </View>

        <View>
          <TouchableOpacity style={styles.uploadBox} onPress={storeDataUploads}>
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
    flexWrap: 'wrap',
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
