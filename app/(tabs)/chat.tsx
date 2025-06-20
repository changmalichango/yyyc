import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme
} from "react-native";



export default function ChatScreen() {
    const colorScheme = useColorScheme();
    const textColor = colorScheme === "dark" ? styles.textLight : styles.textDark;
    const themeColor =
      colorScheme === "dark" ? styles.darkColor : styles.lightColor;

    type Props = {
      username: string;
      image: any;
      borderColor: string;
    };
    
      const ChatBox: React.FC<Props> = ({username, image}) => (
      <View style={[styles.chatRectangle, themeColor]}>
        <Image source={image} style={styles.circlePfp} />
        <View>
          <Text style={[styles.chatUsername, textColor]}>
            {username}
          </Text>
        </View>  
      </View>
      )

  return (
    <SafeAreaView style={[styles.safe, themeColor]}>
      <View style= {styles.topSection}>
        <Text style={[styles.chatsText, textColor]}>Chats</Text>
        borderColor={colorScheme === "dark" ? "white" : "black" }
      </View>

      {/* Chat list would go here */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.bottomSection}>
          <ChatBox
            image={require("../../assets/images/eiffertower.png")}
            username="yy"
            borderColor={colorScheme === 'dark' ? 'white' : 'black'}
          />
        <ChatBox
            image={require("../../assets/images/reiner.png")}
            username="yc"
            borderColor={colorScheme === 'dark' ? 'white' : 'black'}
          />
        <ChatBox
            image={require("../../assets/images/sky.png")}
            username="tzefoong"
            borderColor={colorScheme === 'dark' ? 'white' : 'black'}
          />
          <ChatBox
            image={require("../../assets/images/guitar.png")}
            username="tzefoong"
            borderColor={colorScheme === 'dark' ? 'white' : 'black'}
          />
          <ChatBox
            image={require("../../assets/images/bike.png")}
            username="tzefoong"
            borderColor={colorScheme === 'dark' ? 'white' : 'black'}
          />
          <ChatBox
            image={require("../../assets/images/beatrice.png")}
            username="tzefoong"
            borderColor={colorScheme === 'dark' ? 'white' : 'black'}
          />
          <ChatBox
            image={require("../../assets/images/sky.png")}
            username="tzefoong"
            borderColor={colorScheme === 'dark' ? 'white' : 'black'}
          />
          <ChatBox
            image={require("../../assets/images/tabitha.png")}
            username="tzefoong"
            borderColor={colorScheme === 'dark' ? 'white' : 'black'}
          />
          <ChatBox
            image={require("../../assets/images/reiner.png")}
            username="tzefoong"
            borderColor={colorScheme === 'dark' ? 'white' : 'black'}
          />
          <ChatBox
            image={require("../../assets/images/sky.png")}
            username="tzefoong"
            borderColor={colorScheme === 'dark' ? 'white' : 'black'}
          />
          <ChatBox
            image={require("../../assets/images/beatrice.png")}
            username="tzefoong"
            borderColor={colorScheme === 'dark' ? 'white' : 'black'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>)
}

const styles = StyleSheet.create({
  safe:{
    flex: 1,
  },

  scrollView: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
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

  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },

  bottomSection: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingBottom: 60,
  },

  chatsText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
  },

 chatRectangle:{
  flexDirection: 'row',
  flex: 1,
  borderLeftWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
  alignItems: 'center',
  width: '100%',
  padding: 3,
},

circlePfp: {
  width: 65,
  height: 65,
  borderRadius: 150 / 2,
  overflow: "hidden",
  borderWidth: 1,
  borderColor: "grey",
  marginLeft: 7,
  alignSelf: 'stretch',
},

chatUsername: {
  marginLeft: 10,
  flexDirection: 'column',
  alignSelf: 'flex-start',
  marginBottom: 45
},
});