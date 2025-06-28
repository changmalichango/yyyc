import { getUid } from "@/assets/functions";
import { supabase } from "@/authen/supabase";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

export default function ChatScreen() {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? styles.textLight : styles.textDark;
  const themeColor =
    colorScheme === "dark" ? styles.darkColor : styles.lightColor;
  const router = useRouter();

  const [listing, setListing] = useState<any[]>([]);

  useEffect(() => {
    const getList = async () => {
      const myUid = await getUid();
      const { data: list, error } = await supabase
        .from("chats")
        .select("*")
        .or(`user_1.eq.${myUid}, user_2.eq.${myUid}`);
      if (error) {
        Alert.alert("error.message");
      }

      if (!list) {
        setListing([]);
        return;
      }

      const chatInfo = await Promise.all(
        list.map(async (chats) => {
          const otherUserUid =
            chats.user_1 === myUid ? chats.user_2 : chats.user_1;

          const { data: profile, error: error1 } = await supabase
            .from("users")
            .select("*")
            .eq("uid", otherUserUid);
          if (error1) Alert.alert("here");

          const user = profile?.[0];
          // console.log(user);

          return {
            chatId: chats.id,
            otherUserUid: otherUserUid,
            username: user.name,
            image_url: user.profile_pic,
          };
        })
      );
      // console.log(chatInfo);
      setListing(chatInfo);
    };

    getList();
    // console.log("help");

    // console.log(listing);
  }, []);

  type Props = {
    image: any;
    username: string;
    chatId: string;
    otherUserUid: string;
  };

  const ChatBox: React.FC<Props> = ({
    username,
    image,
    chatId,
    otherUserUid,
  }) => (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "../chatroom",
          params: {
            chatId,
            otherUserUid,
            username,
            image,
          },
        });
      }}
    >
      <View style={[styles.chatRectangle]}>
        <Image
          source={
            image
              ? { uri: image }
              : require("../../assets/images/defaultpfp.png")
          }
          style={styles.circlePfp}
        />
        <View>
          <Text style={styles.chatUsername}>@{username}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safe, themeColor]}>
      <View style={styles.topSection}>
        <Text style={[styles.chatsText, textColor]}>Chats</Text>
      </View>

      {/* Chat list would go here */}

      <FlatList
        contentContainerStyle={[
          styles.container,
          { paddingBottom: 200 },
          styles.bottomSection,
        ]}
        data={listing}
        renderItem={({ item }) => (
          <ChatBox
            username={item.username}
            image={item.image_url}
            chatId={item.chatId}
            otherUserUid={item.otherUserUid}
          />
        )}
        keyExtractor={(item) => item.chatId}
        numColumns={1}
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

  scrollView: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
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
  details: {
    paddingBottom: 100,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },

  bottomSection: {
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingBottom: 60,
  },

  chatsText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    justifyContent: "center",
  },

  chatRectangle: {
    // backgroundColor: "blue",

    flexDirection: "row",
    flex: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    alignItems: "center",
    width: "100%",
    height: 20,
    padding: 3,
    marginRight: 300,
    // backgroundColor: "blue",
  },

  circlePfp: {
    width: 65,
    height: 65,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "grey",
    marginLeft: 7,
    alignSelf: "stretch",
  },

  chatUsername: {
    fontSize: 30,
    marginLeft: 10,
    flexDirection: "column",
    alignSelf: "flex-start",
    // marginBottom: 25,
    backgroundColor: "blue",
  },
  container: {
    // backgroundColor: "blue",
    padding: 16,
    paddingBottom: 60,
    alignItems: "center",
  },
});
