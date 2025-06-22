import { supabase } from "@/authen/supabase";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

export default function ListingsScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const textColor = colorScheme === "dark" ? styles.textLight : styles.textDark;
  const themeColor =
    colorScheme === "dark" ? styles.darkColor : styles.lightColor;

  const [listing, setListing] = useState<any[]>([]);

  useEffect(() => {
    const getList = async () => {
      const { data: list, error } = await supabase.from("uploads").select("*");
      if (error) {
        Alert.alert("error.message");
      } else {
        setListing(list);
      }
    };

    getList();
  }, []);

  type Props = {
    title: string;
    price: number;
    username: string;
    image_url: any;
    rate: string;
  };

  const Card: React.FC<Props> = ({
    title,
    price,
    username,
    image_url,
    rate,
  }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/itemdetails",
          params: { title, price: price.toString(), image_url, rate },
        })
      }
      style={[styles.itemCard, themeColor]}
    >
      <Image source={{ uri: image_url }} style={styles.image} />
      <Text style={[styles.itemTitle, textColor]}>{title}</Text>
      <Text style={styles.price}>
        ${price}/{rate}
      </Text>
      <Text style={styles.username}>@{username}</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={[styles.safe, themeColor]}>
      {/* ///////////////////////////////////// */}
      {/* TOP BAR AND SEARCHING BAR!!!!!!!!!!!! */}
      <View style={styles.topSection}>
        <View style={styles.logoTitle}>
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
      </View>
      {/* ///////////////////////////////////// */}

      <FlatList
        contentContainerStyle={[styles.container, { paddingBottom: 150 }]}
        data={listing}
        renderItem={({ item }) => (
          <Card
            title={item.item}
            price={item.price}
            rate={item.duration}
            username={item.name}
            image_url={item.image_url}
          />
        )}
        keyExtractor={(item) => item.title}
        numColumns={2}
        columnWrapperStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        style={[styles.details]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  topSection: {
    padding: 20,
  },
  bottomSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 12,
    rowGap: 24,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lightColor: { backgroundColor: "#fff" },
  darkColor: { backgroundColor: "black" },
  textDark: { color: "black" },
  textLight: { color: "white" },
  logoTitle: {
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
    paddingBottom: 60,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    marginRight: 19,
    borderRadius: 8,
    resizeMode: "contain",
  },
  scrollView: {
    paddingBottom: 0,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    resizeMode: "cover",
  },
  label: { marginTop: 8, fontSize: 18, fontWeight: "600" },
  itemCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    marginLeft: 5,
    marginBottom: 0,
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 25,
    color: "black",
    paddingTop: 2,
    marginLeft: 11.9,
  },
  price: {
    fontSize: 20,
    color: "#28a745",
    fontWeight: 600,
    marginLeft: 11.9,
  },
  username: {
    fontSize: 15,
    color: "#888",
    marginLeft: 11.9,
  },
  details: {
    paddingBottom: 100,
  },
});
