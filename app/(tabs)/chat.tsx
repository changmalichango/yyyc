import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
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
    };
    
      const ChatBox: React.FC<Props> = ({username, image}) => (
          <View style={[styles.chatRectangle, themeColor]}> 
            <Image source={image} style={styles.circlePfp} />
            <View>
              <Text style={styles.chatUsername}>@{username}</Text>
            </View>
          </View>
        )

  return (
    <SafeAreaView style={[styles.safe, themeColor]}>
      <View style= {styles.topSection}>
        <Text style={[styles.chatsText, textColor]}>Chats</Text>
      </View>

      {/* Chat list would go here */}
      <FlatList
        contentContainerStyle={[styles.container, {paddingBottom: 200}, styles.bottomSection]}
          data={[
            { username: "yc", image: require("../../assets/images/beatrice.png") },
            { username: "y1", image: require("../../assets/images/indian.png") },
            { username: "y4", image: require("../../assets/images/reiner.png") },
            { username: "yt", image: require("../../assets/images/bike.png") },
                
              ]}
              renderItem={({ item }) => (
                <ChatBox
                  username={item.username}
                  image={item.image}
                />
              )}
              keyExtractor={(item) => item.username}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              style={[styles.details]}
            />
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
  height: 20,
  padding: 3,
  marginRight: 300,
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
container: {
    padding: 16,
    paddingBottom: 60,
    alignItems: "center",
  },
});