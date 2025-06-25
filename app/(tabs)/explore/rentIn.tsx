import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native';


const rentIn = () => {
  
  
  const colorScheme = useColorScheme();
  const router = useRouter();
  const textColor = colorScheme === "dark" ? styles.textLight : styles.textDark;
  const themeColor =
  colorScheme === "dark" ? styles.darkColor : styles.lightColor;
  
  type Props = {
    Title: string;
    username: string;
    image: any;
  };
  const items = [
    { id: "1", username: 'yyyc', Title: 'gay', image: require("../../../assets/images/reiner.png") }
  ];
  
    const Box: React.FC<Props> = ({
      Title,
      username,
      image,
    }) => (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/itemdetails",
            params: { Title, image, username},
          })
        }
        style={[styles.box, themeColor]}
      >
        <Image source={ require("../../../assets/images/guitar.png")} style={styles.image} />
          <View>
            <Text style={[styles.itemTitle, styles.words, textColor]}>{Title}</Text>
            <Text style={[styles.username, styles.words, textColor]}>@{username}</Text>
          </View>
      </TouchableOpacity>
    );
  return (
    <FlatList
            contentContainerStyle={[styles.container, { paddingBottom: 150 }]}
            data={items}
            renderItem={({ item }) => (
              <Box
                Title={item.Title}
                username={item.username}
                image= {item.image}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
            style={[styles.details]}
          /> 
  )
}

export default rentIn

const styles = StyleSheet.create({
  box:{
    width: '100%',
    height: 110,
    borderWidth: 5,
    borderColor: 'grey',
    alignItems: 'flex-start',
    marginBottom: 40,
    flexDirection: 'row',
    padding: 5,

  },
  details: {
    paddingBottom: 100,
  },
  lightColor: { backgroundColor: "#fff" },
  darkColor: { backgroundColor: "black" },
  textDark: { color: "black" },
  textLight: { color: "white" },
  itemTitle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  },
  scrollView: {
    paddingBottom: 0,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    resizeMode: "cover",
  },
  username: {
    fontWeight: 'bold',
    fontSize: 20
  },
  words: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: 100,
    height: 100,

  },
  container: {
    alignItems: "center",
  },
})