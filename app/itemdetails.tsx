import { getUid } from "@/assets/functions";
import { supabase } from "@/authen/supabase";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const options = {
  headerShown: false,
};

export default function ItemDetailsScreen() {
  const colorScheme = useColorScheme();
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  const textColor = colorScheme === "dark" ? styles.textLight : styles.textDark;
  const themeColor =
    colorScheme === "dark" ? styles.darkColor : styles.lightColor;
  const [userId, setUserId] = useState<string | null>(null);
  const { Title, price, image_url, rate, description, userUid, singleListing } =
    useLocalSearchParams();
  
  useEffect(() => {
  const loadInitial = async () => {
    const uid = await getUid();
    setUserId(uid);

    if (!uid || !singleListing) return;

    // Check if favourited
    const { data, error } = await supabase
      .from('favourites')
      .select('id')
      .eq('user_uid', uid)
      .eq('item_id', singleListing)
      .single();

    if (!error && data) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };

  loadInitial();
}, [singleListing]);

const onPress = async () => {
  console.log("❤️ Heart pressed!");
  const uid = await getUid();

  if (!uid || !singleListing) return;

  if (liked) {
    // Remove from favourites
    const { error } = await supabase
    .from('favourites')
    .delete()
    .eq('user_uid', uid)
    .eq('item_id', singleListing);

  if (error) {
  console.error('❌ Delete error:', error);
  Alert.alert('Error removing favourite', error.message);
  return;
  }

  setLiked(false);
  console.log("❤️ liked state before:", liked);
  } else {
    // Add to favourites
    const { data, error } = await supabase
    .from('favourites')
    .insert([{ user_uid: uid, item_id: singleListing }]);

  if (error) {
  console.error('❌ Insert error:', error);
  Alert.alert('Error adding to favourites', error.message);
  return;
  } 

  setLiked(true);
  console.log("❤️ liked state after:", liked);
  }

  // Animate
  scale.value = withSpring(1.3, {}, () => {
    scale.value = withSpring(1);
  });
};

  const CheckChat = async () => {
    const seller_uid = userUid;
    const buyer_uid = await getUid();


    // CHECKING IF THE CHAT EXISTS
    // ///////////////////////////////////////////////////////

    if (buyer_uid === seller_uid) {
      Alert.alert("You cannot chat with yourself!");
    } else {
      const { data: existence, error: error1 } = await supabase
        .from("chats")
        .select("*")
        .or(
          `and(user_1.eq.${seller_uid},user_2.eq.${buyer_uid}),and(user_2.eq.${seller_uid},user_1.eq.${buyer_uid})`
        )
        .maybeSingle();

      if (error1) {
        Alert.alert(error1.message);
      } else {
        // INSERT IF NOT EXISTENT
        // ///////////////////////////////////////////

        if (!existence) {
          const { data: table, error: error2 } = await supabase
            .from("chats")
            .insert({
              user_1: buyer_uid,
              user_2: seller_uid,
            })
            .select()
            .single();

          if (error2) Alert.alert(error2.message);
          else console.log("created new chat");
          console.log(table.id);
        } else {
          console.log("chat existed");

          console.log(existence.id);
        }
      }
    }
  };

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <SafeAreaView style={[styles.safe, themeColor]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            router.replace("/home");
          }}
        >
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            alignItems: "center",
            marginLeft: 123,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          My Listings
        </Text>
      </View>

      <ScrollView style={styles.container}>
        <Image source={{ uri: image_url as string }} style={styles.image} />
        <Text style={[styles.title, textColor]}>{Title}</Text>
        <Text style={[styles.price]}>
          ${price} per {rate}
        </Text>
        <Text style={[styles.condition, textColor]}>Condition</Text>
        <Text style={[styles.actualCondition, textColor]}>9</Text>
        <Text style={[styles.details, textColor]}>Description</Text>
        <Text style={[styles.description, textColor]}>{description}</Text>
        <Text style={[styles.location, textColor]}>Location</Text>
        <Text style={[styles.mrt, textColor]}>Sengkang</Text>
      </ScrollView>

      <View style={[styles.bottomSection]}>
        <View>
          <Pressable onPress={onPress}>
            <Animated.View style={[styles.heartWrapper, animatedStyle]}>
              <FontAwesome
                name="heart"
                size={30}
                color={liked ? "red" : "white"}
              />
            </Animated.View>
          </Pressable>
        </View>
        <View style={styles.chatBox}>
          <Image
            source={require("../assets/images/chatIcon.webp")}
            style={styles.chatIconImage}
          />
          <TouchableOpacity
            style={styles.chatText}
            onPress={async () => {
              await CheckChat(), router.replace("/(tabs)/chat");
            }}
          >
            <Text style={styles.chatText}>Chat</Text>
          </TouchableOpacity>
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
    backgroundColor: "brown",
    height: 50,
    flexDirection: "row",
    gap: 10,
  },
  header: {
    backgroundColor: "green",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 16,
  },
  chatBox: {
    width: "20%",
    height: "100%",
    backgroundColor: "#006400",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    borderRadius: 10,
  },
  chatText: {
    fontSize: 17,
    alignSelf: "center",
    color: "white",
    marginRight: 10,
  },
  chatIconImage: {
    height: 25,
    width: 30,
    alignSelf: "center",
    marginLeft: 10,
  },
  heartWrapper: {
    justifyContent: "center",
    alignContent: "center",
    height: "100%",
    width: 40,
    marginLeft: 10,
  },
  heartIcon: {
    height: "100%",
    width: 40,
    marginLeft: 10,
  },
});

console.log('userId')
