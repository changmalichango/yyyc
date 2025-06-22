import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

export const options = {
  headerShown: false,
};

export default function ItemDetailsScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const textColor = colorScheme === "dark" ? styles.textLight : styles.textDark;
  const themeColor =
    colorScheme === "dark" ? styles.darkColor : styles.lightColor;
  const { title, price, image_url, rate } = useLocalSearchParams();
  return (
    <SafeAreaView style={[styles.safe, themeColor]}>
      <ScrollView style={styles.container}>
        <Image source={{ uri: image_url as string }} style={styles.image} />
        <Text style={[styles.title, textColor]}>{title}</Text>
        <Text style={[styles.price]}>
          ${price} per {rate}
        </Text>
        <Text style={[styles.condition, textColor]}>Condition</Text>
        <Text style={[styles.actualCondition, textColor]}>9</Text>
        <Text style={[styles.details, textColor]}>Description</Text>
        <Text style={[styles.description, textColor]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt moll
          ahslkjdfhlkjlasdjhkgfbljkabdfgljkbalsdfkgblhbsdfglhblsd
        </Text>
        <Text style={[styles.location, textColor]}>Location</Text>
        <Text style={[styles.mrt, textColor]}>Sengkang</Text>
      </ScrollView>

      <View style={[styles.bottomSection]}>
        <View style={styles.chatBox}>
          <Image
            source={require("../assets/images/chaticon.jpg")}
            style={styles.chatIconImage}
          />
          <Text style={styles.chatText}>Chat</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingBottom: 20,
  },
  lightColor: {
    backgroundColor: "#fff",
  },
  darkColor: {
    backgroundColor: "black",
  },
  textDark: {
    color: "black",
  },
  textLight: {
    color: "white",
  },
  container: {
    height: "100%",
  },
  image: {
    width: "100%",
    height: 450,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    padding: 15,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  actualCondition: {
    fontSize: 16,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  location: {
    fontSize: 20,
    paddingHorizontal: 15,
    fontWeight: "bold",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  condition: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 15,
  },
  mrt: {
    fontSize: 14,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  details: {
    fontSize: 20,
    paddingHorizontal: 15,
    fontWeight: "bold",
  },
  topSection: {
    padding: 20,
  },
  bottomSection: {
    paddingTop: 20,
    backgroundColor: "grey",
    height: 60,
  },
  chatBox: {
    width: "20%",
    height: "90%",
    padding: 5,
    justifyContent: "center",
    backgroundColor: "red",
    alignSelf: "center",
    flexWrap: "wrap",
  },
  chatText: {
    fontWeight: "bold",
    fontSize: 17,
    alignSelf: "center",
  },
  chatIconImage: {
    height: 25,
    width: 25,
    alignSelf: "center",
  },
});
