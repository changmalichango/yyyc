import { supabase } from "@/authen/supabase";
import { Entypo } from "@expo/vector-icons";
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
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function FavouritesScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const textColor = colorScheme === "dark" ? styles.textLight : styles.textDark;
  const themeColor =
    colorScheme === "dark" ? styles.darkColor : styles.lightColor;

  const [listing, setListing] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  type ListingOrPlaceholder = ListingItem | { id: string; isPlaceholder: true };

  interface ListingItem {
    id: string;
    item: string;
    price: number;
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

    const { data: list, error: error1 } = await supabase
      .from("favourites")
      .select("*")
      .eq("user_uid", user.id);

    const ids = list?.map((item) => item.item_id);
    // console.log(user.id);
    console.log("here");
    console.log(ids);
    if (error1) {
      Alert.alert(error1.message);
    }
    const { data: itemList, error: error2 } = await supabase
      .from("uploads")
      .select("*")
      .in("id", ids ?? []);

    if (error2) {
      Alert.alert(error2.message);
    } else {
      setListing(itemList);
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
  };
  const Card: React.FC<Props> = ({
    Title,
    price,
    username,
    image_url,
    rate,
    description,
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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            router.replace("/(tabs)/me");
          }}
        >
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            alignItems: "center",
            marginLeft: 110,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Favourites
        </Text>
      </View>

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
  header: {
    backgroundColor: "green",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 16,
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
