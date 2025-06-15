import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import {
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

export default function ListingsScreen() {
  const colorScheme = useColorScheme();
  const textTheme = colorScheme === "dark" ? styles.textLight : styles.textDark;
  const themeStyle =
    colorScheme === "dark" ? styles.darkColor : styles.lightColor;
  const items = [
    {
      id: "bike",
      title: "Bike",
      image: require("../../assets/images/bike.png"),
    },
    {
      id: "guitar",
      title: "Guitar",
      image: require("../../assets/images/guitar.png"),
    },
    {
      id: "shoe",
      title: "Shoe",
      image: require("../../assets/images/shoe.png"),
    },
  ];

  return (
    <SafeAreaView style={[styles.safe, themeStyle]}>
      {/* ///////////////////////////////////// */}
      {/* TOP BAR AND SEARCHING BAR!!!!!!!!!!!! */}
      <View style={styles.title}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.logoText}>CanIRent</Text>
      </View>

      {/* ///////////////////////////////////// */}
      {/* THIS IS THE SEARCHING BAR!!!!!!!!!!!! */}
      <View style={styles.search}>
        <FontAwesome name="search" size={24} style={styles.searchIcon} />
        <TextInput placeholder="Search" style={{ width: "75%" }} />
        <TouchableOpacity style={styles.searchBtn}>
          <Text style={styles.btnText}>Go!</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {items.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={[styles.label, textTheme]}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  lightColor: { backgroundColor: "#fff" },
  darkColor: { backgroundColor: "black" },
  textDark: { color: "black" },
  textLight: { color: "white" },
  title: {
    height: 40,
    flexDirection: "row",
  },
  logo: {
    resizeMode: "contain",
    height: 40,
    width: 40,
    paddingLeft: 0,
    marginLeft: 10,
  },
  logoText: {
    fontWeight: "bold",
    fontSize: 28,
    color: "green",
    paddingTop: 2,
  },
  search: {
    height: 40,
    width: "95%",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "green",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  searchIcon: { marginLeft: 10, color: "green", marginRight: 5 },
  searchBtn: {
    flex: 1,
    backgroundColor: "green",
    height: 37,
    // width: 0,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: { color: "white", fontSize: 20, fontWeight: "600" },
  container: {
    padding: 16,
    height: "95%",
    alignItems: "center",
    // backgroundColor: "blue",
  },
  card: { marginBottom: 24, alignItems: "center" },
  image: { width: 150, height: 150 },
  label: { marginTop: 8, fontSize: 18, fontWeight: "600" },
});
