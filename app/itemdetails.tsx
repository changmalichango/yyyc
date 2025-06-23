import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
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
  const router = useRouter();
  const textColor = colorScheme === "dark" ? styles.textLight : styles.textDark;
  const themeColor =
    colorScheme === "dark" ? styles.darkColor : styles.lightColor;
  const { Title, price, image_url, rate, description, } = useLocalSearchParams();
  
  const [liked, setLiked] = useState(false);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const onPress = () => {
    setLiked((prev) => !prev);
    scale.value = withSpring(1.3, {}, () => {
      scale.value = withSpring(1);
    });
  };
  
  return (
    <SafeAreaView style={[styles.safe, themeColor]}>
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
    backgroundColor: "brown",
    height: 50,
    flexDirection: 'row',
    gap: 10,
  },
  chatBox: {
    width: "20%",
    height: "100%",
    backgroundColor: "#006400",
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    borderRadius: 10,
  },
  chatText: {
    fontSize: 17,
    alignSelf: 'center',
    color: 'white',
    marginRight: 10,
  },
  chatIconImage: {
    height: 25,
    width: 30,
    alignSelf: "center",
    marginLeft: 10,
  },
  heartWrapper: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
    width: 40,
    marginLeft: 10,
  },
  heartIcon: {
    height: '100%',
    width: 40,
    marginLeft: 10,
  },

});
