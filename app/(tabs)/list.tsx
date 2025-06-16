import React from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
      <Text style={[styles.title, textColor]}>List your item</Text>
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

        <View>
          <Text style={[textColor, styles.textOnBox]}>Price</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.box2]}>
              <TextInput placeholder="$" />
            </View>
            <View style={{ justifyContent: "center", marginRight: 55 }}>
              <Text>$</Text>
            </View>
            <View style={[styles.box2]}>
              <Text>per month</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={[textColor, styles.textOnBox]}>Description</Text>
          <View style={[styles.box3]}>
            <TextInput
              placeholder="Provide more details for your item!"
              style={{
                paddingLeft: 5,
                fontSize: 15,
                paddingTop: 5,
                // justifyContent: "flex-end",
              }}
            />
          </View>
        </View>

        <View>
          <Text style={[textColor, styles.textOnBox]}>Image</Text>
          <View style={[styles.box1]}></View>

          <View style={[styles.box1]}>
            <Text>Upload Image</Text>
          </View>
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
  textOnBox: { fontWeight: "bold", marginTop: 10 },
  box1: {
    // backgroundColor: "blue",
    height: 50,
    width: "95%",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "grey",
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
});
