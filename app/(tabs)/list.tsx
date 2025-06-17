import React from "react";

import { Ionicons } from "@expo/vector-icons";
import {
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
            />
          </View>
        </View>

        {/* CONDITON BOX
        ///////////////////////////////////////////////////////////////////////// */}
        <View>
          <Text style={[textColor, styles.textOnBox]}>Conditions</Text>

          <View style={[styles.box2]}>
            <TextInput placeholder="$" />
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
              <TextInput placeholder="$" />
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
            <View style={[styles.box2]}>
              <Text style={textColor}>per month</Text>
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
              }}
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
          <TouchableOpacity style={styles.imageBox}>
            <Ionicons name="add" size={40} color={"grey"} />
          </TouchableOpacity>
          {/* 
          <TouchableOpacity style={styles.box1}>
            <Text>Upload Image</Text>
          </TouchableOpacity> */}
        </View>

        {/* ADDRESS
        //////////////////////////////////////////////////////////////// */}
        <View>
          <Text style={[textColor, styles.textOnBox]}>Address</Text>
          <View style={[styles.box1]}>
            <TextInput
              placeholder="Enter your address"
              style={{ paddingLeft: 5, fontSize: 15 }}
            />
          </View>
        </View>

        <View>
          <TouchableOpacity style={styles.uploadBox}>
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
    color: "grey",
    height: 50,

    width: 50,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
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
