import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

export default function ChatScreen(){
  const colorScheme = useColorScheme();
      const textColor = colorScheme === "dark" ? styles.textLight : styles.textDark;
      const themeColor = colorScheme === "dark" ? styles.darkColor : styles.lightColor;

  return (
    <SafeAreaView style={[styles.safe, themeColor]}>
      <View>
        <Text>chatscreen</Text>
      </View>
    </SafeAreaView>
  )
}





const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  lightColor: { 
    backgroundColor: "#fff"
  },

  darkColor: {
     backgroundColor: "black" 
  },

  textDark: {
    color: "black"
  },
  textLight: {
    color: "white"
  },
})