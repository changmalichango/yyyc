import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme
} from "react-native";

export default function ListingsScreen() {
  const colorScheme = useColorScheme();
  const textTheme = colorScheme === "dark" ? styles.textLight : styles.textDark;
  const themeStyle =
    colorScheme === "dark" ? styles.darkColor : styles.lightColor;
  const items = [
    {
      id: "bike",
      title: "Bike",
      image: require("../../assets/images/bike.png"),
    },
    {
      id: "guitar",
      title: "Guitar",
      image: require("../../assets/images/guitar.png"),
    },
    {
      id: "shoe",
      title: "Shoe",
      image: require("../../assets/images/shoe.png"),
    },
  ];
  const renderIteming = ({item}: { item: any}) => (
    <View style={styles.itemCard}>
      <Image source={item.image} style= {styles.image} />,
      <Text> style={styles.itemTitle}{item.title}</Text>
      <Text> style={[styles.price, textTheme]}${item.price}</Text>
      <Text style={[styles.username, textTheme]}>@{item.username}</Text>
    </View>
  )

  return (
    <SafeAreaView style={[styles.safe, themeStyle]}>
      {/* ///////////////////////////////////// */}
      {/* TOP BAR AND SEARCHING BAR!!!!!!!!!!!! */}
      <View style ={styles.topSection}>
        <View style={styles.title}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.logoText}>CanIRent</Text>
        </View>

        {/* ///////////////////////////////////// */}
        {/* THIS IS THE SEARCHING BAR!!!!!!!!!!!! */}
        <View style={styles.search}>
          <FontAwesome name="search" size={24} style={styles.searchIcon} />
          <TextInput placeholder="Search" style={{ width: "75%" }} />
          <TouchableOpacity style={styles.searchBtn}>
            <Text style={styles.btnText}>Go!</Text>
          </TouchableOpacity>
        </View>
      </View>
      
     <ScrollView contentContainerStyle = {[styles.scrollview, {paddingBottom: 100}]}>
      <View style={styles.bottomSection}>
        <View style= {{width: '48%', marginBottom: 16 }}>  
          <Image
          source = {require("../../assets/images/bike.png")} 
          style={styles.itemDimension}
          /> 
          <Text style= {styles.itemTitle}>bike</Text>
          <Text style= {styles.price}>$20</Text>
          <Text style= {styles.username}>@yyy143</Text>
        </View>

        <View>  
          <Image
          source = {require("../../assets/images/guitar.png")} 
          style={styles.itemDimension}
          /> 
          <Text style= {styles.itemTitle}>guitar</Text>
          <Text style= {styles.price}>$2100</Text>
          <Text style= {styles.username}>@yc</Text>
        </View>

        <View>  
          <Image
          source = {require("../../assets/images/shoe.png")} 
          style={styles.itemDimension}
          /> 
          <Text style= {styles.itemTitle}>shoe</Text>
          <Text style= {styles.price}>$21</Text>
          <Text style= {styles.username}>@ygay</Text>
        </View>

        <View>  
          <Image
          source = {require("../../assets/images/eiffertower.png")} 
          style={styles.itemDimension}
          /> 
          <Text style= {styles.itemTitle}>eiffel tower</Text>
          <Text style= {styles.price}>$69</Text>
          <Text style= {styles.username}>@tzefoong</Text>
        </View>

        <View>  
          <Image
          source = {require("../../assets/images/sky.png")} 
          style={styles.itemDimension}
          /> 
          <Text style= {styles.itemTitle}>sky</Text>
          <Text style= {styles.price}>$21</Text>
          <Text style= {styles.username}>@michelle</Text>
        </View>
        <View>  
          <Image
          source = {require("../../assets/images/sky.png")} 
          style={styles.itemDimension}
          /> 
          <Text style= {styles.itemTitle}>sky</Text>
          <Text style= {styles.price}>$21</Text>
          <Text style= {styles.username}>@michelle</Text>
        </View>
        <View>  
          <Image
          source = {require("../../assets/images/sky.png")} 
          style={styles.itemDimension}
          /> 
          <Text style= {styles.itemTitle}>sky</Text>
          <Text style= {styles.price}>$21</Text>
          <Text style= {styles.username}>@michelle</Text>
        </View>
      </View>

      
      </ScrollView>

</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
  },
  topSection: {
    padding: 20,
  },
  bottomSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 12,
    rowGap: 24,
  },
  leftHalf: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  rightHalf: {
    flex: 1,
  },
  listContainer: {
    padding: 10,
  },
  itemCard:{
    alignItems: 'center',
    width: '48%',
    marginBottom: 16,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    paddingTop: 2,
    marginLeft: 60
  },
  price: {
    fontSize:20,
    color: '#28a745',
    fontWeight: 600,
    marginLeft: 60,
  },
  username:{
    fontSize: 15,
    color: '#888',
    marginLeft: 60,
  },
  lightColor: { backgroundColor: "#fff" },
  darkColor: { backgroundColor: "black" },
  textDark: { color: "black" },
  textLight: { color: "white" },
  title: {
    height: 40,
    flexDirection: "row",
  },
  logo: {
    resizeMode: "contain",
    height: 40,
    width: 40,
    paddingLeft: 0,
    marginLeft: 10,
  },
  logoText: {
    fontWeight: "bold",
    fontSize: 28,
    color: "green",
    paddingTop: 2,
  },
  search: {
    height: 40,
    width: "95%",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "green",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  searchIcon: { marginLeft: 10, color: "green", marginRight: 5 },
  searchBtn: {
    flex: 1,
    backgroundColor: "green",
    height: 37,
    // width: 0,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: { color: "white", fontSize: 20, fontWeight: "600" },
  container: {
    padding: 16,
    height: "95%",
    alignItems: "center",
    // backgroundColor: "blue",
  },
  card: { marginBottom: 24, alignItems: "center" },
  image: { width: 150, height: 150 },
  label: { marginTop: 8, fontSize: 18, fontWeight: "600" },
  itemDimension: {
    resizeMode: "contain",
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 50
  },
});


/*      <ScrollView contentContainerStyle = {styles.scrollview}>
      <View style={styles.bottomSection}>
        <View>  
          <Image
          source = {require("../../assets/images/bike.png")} 
          style={styles.bike}
          /> 
        </View>

        <View>  
          <Image
          source = {require("../../assets/images/guitar.png")} 
          style={styles.guitar}
          /> 
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>

    <ScrollView>
        <View style={styles.bottomSection}>
          <Image source={ require('../../assets/images/bike.png')} style={styles.image} />
          <Text style={styles.itemTitle}> Bike </Text>
          <Text style={styles.price}> $20 </Text>
          <Text style={styles.username}> @yy134</Text>    
        </View>
      </ScrollView>
*/