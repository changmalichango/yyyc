import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ListingsScreen() {
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
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {items.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.label}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 16, alignItems: "center" },
  card: { marginBottom: 24, alignItems: "center" },
  image: { width: 150, height: 150 },
  label: { marginTop: 8, fontSize: 18, fontWeight: "600" },
});
