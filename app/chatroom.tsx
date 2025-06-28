import { getUid } from "@/assets/functions";
import { supabase } from "@/authen/supabase";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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

  const [chatHistory, setChatHistroy] = useState<any[]>([]);

  const LoadMessage = async () => {
    const { data: prevMessages, error: error2 } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true });

    setChatHistroy(prevMessages ?? []);
    console.log(prevMessages);
  };

  useEffect(() => {
    LoadMessage();
  }, [chatId]);

  const [text, setText] = useState("");

  const uploadMessage = async () => {
    const senderUid = await getUid();

    const { data: messages, error: error1 } = await supabase
      .from("messages")
      .insert({ chat_id: chatId, sender_id: senderUid, messages: text });
    if (error1) {
      console.log(error1.message);
    } else {
      setText("");
      LoadMessage();
    }
  };

  useEffect(() => {
    const channel = supabase
      .channel("chat")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          setChatHistroy((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId]);

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
              : require("../assets/images/defaultpfp.png")
          }
          style={styles.image}
        />
      </View>

      <ScrollView style={{ height: "85%" }}>
        <View>
          {chatHistory.map((message) => (
            <View
              key={message.id}
              style={[
                message.sender_id === otherUserUid
                  ? styles.otherChatStyle
                  : styles.myChatStyle,
                styles.messageBox,
              ]}
            >
              <Text>{message.messages}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.chatbar}>
        <TextInput
          placeholder="text"
          style={{ width: "85%" }}
          onChangeText={setText}
          value={text}
        />
        <TouchableOpacity onPress={uploadMessage}>
          <Feather name="arrow-up" size={24} color="black" />
        </TouchableOpacity>
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
  otherChatStyle: { alignSelf: "flex-start", backgroundColor: "green" },
  myChatStyle: { alignSelf: "flex-end", backgroundColor: "blue" },
  messageBox: {
    maxWidth: "70%",
    padding: 10,
    marginVertical: 4,
    borderRadius: 10,
    marginHorizontal: 10,
  },
});

export const options = {
  headerShown: false,
}