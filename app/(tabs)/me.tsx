import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

export default function MeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const styleColor =
    colorScheme === "dark" ? styles.darkStyle : styles.lightStyle;
  const textColor = colorScheme === "dark" ? styles.lightText : styles.darkText;

  return (
    <SafeAreaView style={[styles.container, styleColor]}>
      {/* TITLE BOX
      /////////////////////////////////////////////////////////////////////////// */}

      <View style={styles.titleBox}>
        <Text style={[textColor, styles.titleText]}>Profile</Text>
      </View>

      {/* MAIN PIC BOX
      /////////////////////////////////////////////////////////////////////////// */}
      <View style={styles.picBox}>
        <LinearGradient
          colors={["transparent", "transparent"]}
          start={[1, 0]}
          end={[1, 1]}
          style={styles.circleOutside}
        >
          <View style={styles.circleInside}>
            <View style={styles.circleTrans}>
              <Image
                source={require("../../assets/images/bike.png")}
                style={styles.profilePic}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>

    // {/* <Button
    //     title="Go to Register"
    //     onPress={() => router.push("/register")}
    //   />
    //   <Button title="Login" onPress={() => router.push("/login")} /> */}
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
    // backgroundColor: "green",
    height: 150,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "green",
    borderWidth: 2,
    borderRadius: 75,
  },
  circleInside: {
    height: 120,
    width: 120,
    borderColor: "green",
    borderWidth: 2,
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
