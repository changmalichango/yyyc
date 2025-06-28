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
    { id: "1", username: 'yyyc', Title: 'gay', image: require("../../../assets/images/guitar.png") },
    { id: "2", username: 'yyyc', Title: 'gf', image: require("../../../assets/images/beatrice.png") },
    { id: "3", username: 'yyyc', Title: 'bf', image: require("../../../assets/images/sky.png") },
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
            <Text style={[styles.itemTitle, styles.itemAndDays, textColor]}>{Title}</Text>
            <Text style={[styles.username, textColor]}>@{username}</Text>
            <Text style={[styles.days, styles.itemAndDays, textColor]}>2 Days</Text>
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
    height: 120,
    borderBottomWidth: 2,
    borderColor: 'green',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  details: {
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
  itemAndDays: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  image: {
    resizeMode: 'contain',
    width: '20%',
    height: '100%',
    paddingBottom: 5,
    marginTop: 2,
  },
  days: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  }, 
  container: {
    alignItems: "center",
  },
})