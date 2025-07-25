import { supabase } from "@/authen/supabase";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
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
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleClearSearch = () => {
    setSearchText("");
    getList();
  };

  const handleSearch = async () => {
    if (!searchText.trim()) {
      await getList();
      return;
    }

    setRefreshing(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      Alert.alert(userError.message);
      setRefreshing(false);
      return;
    }

    if (!user) {
      Alert.alert("User not found.");
      setRefreshing(false);
      return;
    }

    const { data, error } = await supabase
      .from("uploads")
      .select("*")
      .neq("uid", user.id)
      .ilike("item", `%${searchText}%`);

    if (error) {
      Alert.alert(error.message);
    } else {
      setListing(data);
    }

    setRefreshing(false);
  };

  type ListingOrPlaceholder = ListingItem | { id: string; isPlaceholder: true };

  interface ListingItem {
    condition: string;
    address: string;
    id: string;
    item: string;
    price: number;
    uid: string;
    duration: string;
    name: string;
    image_url: string;
    description: string;

    isPlaceholder?: boolean;
  }

  const getAdjustedData = (data: ListingItem[]): ListingOrPlaceholder[] => {
    if (!data) return [];
    if (data.length % 2 === 1) {
      return [
        ...data,
        { id: `placeholder-${data.length}`, isPlaceholder: true },
      ];
    }
    return data;
  };

  const getList = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      Alert.alert(userError.message);
      return;
    }

    if (!user) {
      Alert.alert("User not found.");
      return;
    }

    const { data: list, error } = await supabase
      .from("uploads")
      .select("*")
      .neq("uid", user.id);

    if (error) {
      Alert.alert(error.message);
    } else {
      // console.log("IAHDIAHD", list);
      setListing(list);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getList();
    setRefreshing(false);
  };

  useEffect(() => {
    getList();
  }, []);

  type Props = {
    Title: string;
    price: number;
    username: string;
    image_url: any;
    rate: string;
    description: string;
    user_uid: string;
    id: string;
    condition: string;
    address: string;
  };

  const Card: React.FC<Props> = ({
    Title,
    price,
    username,
    image_url,
    rate,
    description,
    user_uid,
    id,
    condition,
    address,
  }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/itemdetails",
          params: {
            Title,
            price: price.toString(),
            image_url,
            rate,
            description,
            user_uid,
            id,
            address,
            condition,
          },
        })
      }
      style={[styles.itemCard, themeColor]}
    >
      <Image source={{ uri: image_url }} style={styles.image} />
      <Text style={[styles.itemTitle, textColor]}>{Title}</Text>
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
          <TextInput
            placeholder="Search"
            style={{ flex: 3.0, paddingVertical: 0, paddingHorizontal: 7 }}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={handleClearSearch}
              style={styles.clearButton}
            >
              <AntDesign name="closecircleo" size={20} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleSearch} style={styles.searchBtn}>
            <Text style={styles.btnText}>Go!</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* ///////////////////////////////////// */}

      <FlatList
        contentContainerStyle={[styles.container, { paddingBottom: 150 }]}
        data={getAdjustedData(listing)}
        renderItem={({ item }) =>
          item.isPlaceholder ? (
            <View style={[styles.itemCard, { opacity: 0 }]} />
          ) : (
            <Card
              Title={item.item}
              price={item.price}
              rate={item.duration}
              username={item.name}
              image_url={item.image_url}
              description={item.description}
              user_uid={item.uid}
              id={item.id}
              address={item?.address}
              condition={item.condition}
            />
          )
        }
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : `placeholder-${index}`
        }
        numColumns={2}
        columnWrapperStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        style={[styles.details]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
  clearButton: {
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
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
    borderRadius: 20,
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
