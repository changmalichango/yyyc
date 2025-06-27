import { getUid } from "@/assets/functions";
import { supabase } from "@/authen/supabase";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";

export default function ChatScreen() {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? styles.textLight : styles.textDark;
  const themeColor =
    colorScheme === "dark" ? styles.darkColor : styles.lightColor;
  const [chatId, setChatId] = useState("");

  const checkExist = async () => {
    const myself = await getUid();

    const [sentMessages, setSentMessages] = useState("");
    const loadMessage = async () => {
      const { data: prv, error: error3 } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true });
    };

    const [text, setText] = useState("");

    const sendMessgae = async () => {
      const { data: msg, error: error4 } = await supabase
        .from("messages")
        .insert({
          chat_id: chatId,
          sender_id: myself,
          messages: text,
        });
    };

    return (
      <SafeAreaView style={[styles.safe, themeColor]}>
        <View>
          <Text>chatscreen</Text>
        </View>
      </SafeAreaView>
    );
  };
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
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
});
