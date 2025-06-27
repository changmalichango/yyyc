import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatroomScreen() {
  const { chatId, otherUserUid, image, username } = useLocalSearchParams();
  const router = useRouter();
  console.log(chatId, otherUserUid, image, username);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            router.replace("/(tabs)/chat");
          }}
        >
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: "center",
            // paddingLeft: 190,
            fontWeight: "bold",
            fontSize: 15,
          }}
        >
          {username}
        </Text>
        <Image
          source={
            image
              ? { uri: image }
              : require("../../assets/images/defaultpfp.png")
          }
          style={styles.image}
        />
      </View>

      <ScrollView style={{ height: "85%" }}>
        <View>
          <Text>hhh</Text>
        </View>
      </ScrollView>

      <View style={styles.chatbar}>
        <TextInput placeholder="text" style={{ width: "85%" }} />
        <Feather name="arrow-up" size={24} color="black" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "green",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  image: {
    height: 40,
    width: 40,
    resizeMode: "contain",
    borderRadius: 20,
    borderWidth: 1,
  },
  chatbar: { flexDirection: "row" },
});
