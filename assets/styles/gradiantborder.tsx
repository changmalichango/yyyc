import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, View, useColorScheme } from "react-native";

export default function GradiantBorder() {
  const colorScheme = useColorScheme();
  const styleColor =
    colorScheme === "dark" ? styles.darkStyle : styles.lightStyle;
  const textColor = colorScheme === "dark" ? styles.lightText : styles.darkText;

  return (
    <LinearGradient
      colors={["green", "transparent"]}
      start={[0, 0]}
      end={[0, 1]}
      style={[styles.circleOutside, styleColor]}
    >
      <View style={[styles.circleInside, styleColor]}>
        <View style={styles.circleTrans}>
          <Image
            source={require("../../assets/images/bike.png")}
            style={styles.profilePic}
          />
        </View>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  darkStyle: { backgroundColor: "black" },
  lightStyle: { backgroundColor: "white" },
  darkText: { color: "black" },
  lightText: { color: "white" },
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "blue",
  },
  titleBox: { alignItems: "center", marginTop: 20 },
  titleText: { fontWeight: "bold", fontSize: 20 },

  picBox: { alignItems: "center", marginTop: 20 },
  circleOutside: {
    height: 150,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "green",
    padding: 0,

    borderRadius: 75,
  },
  circleInside: {
    height: 140,
    width: 140,

    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  circleTrans: {
    height: 100,
    width: 100,
    // borderColor: "transparent",
    borderWidth: 2,
    borderRadius: 100,
    backgroundColor: "transparent",
    color: "transparent",
  },
  profilePic: { height: 70, resizeMode: "contain", borderRadius: 100 },
});
