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
  useColorScheme,
} from "react-native";

export default function ListingsScreen() {
  const colorScheme = useColorScheme();
  const textTheme = colorScheme === "dark" ? styles.textLight : styles.textDark;
  const themeStyle =
    colorScheme === "dark" ? styles.darkColor : styles.lightColor;
  
  type Props = {
    title: string;
    price: number;
    username: string;
    image: any;
  }

  const Card: React.FC<Props> = ({title, price, username, image}) => (
    <View style={styles.itemCard}> 
      <Image source={image} style={styles.image} />
      <View>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.price}>${price}</Text>  
        <Text style={styles.username}>@{username}</Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={[styles.safe, themeStyle,]}>
      {/* ///////////////////////////////////// */}
      {/* TOP BAR AND SEARCHING BAR!!!!!!!!!!!! */}
      <View style ={styles.topSection}>
        <View style={styles.logoTitle}>
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
        {/* ///////////////////////////////////// */}

    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={[styles.bottomSection, {paddingBottom: 50}]}>
        <Card
          title= "Bike"
          price= {30}
          username= "yy143"
          image={require('../../assets/images/bike.png')}
        />  
        <Card
          title= "Effiel tower"
          price= {30}
          username= "yc"
          image={require('../../assets/images/eiffertower.png')}
        />  
        <Card
          title= "Effiel tower"
          price= {30}
          username= "yc"
          image={require('../../assets/images/sky.png')}
        />  
        <Card
          title= "Effiel tower"
          price= {30}
          username= "yc"
          image={require('../../assets/images/sky.png')}
        />
        <Card
          title= "Effiel tower"
          price= {30}
          username= "yc"
          image={require('../../assets/images/sky.png')}
        />
        <Card
          title= "Bike"
          price= {30}
          username= "yy143"
          image={require('../../assets/images/shoe.png')}
        />  
        <Card
          title= "slave"
          price= {30}
          username= "yy143"
          image={require('../../assets/images/guitar.png')}
        />  
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  topSection: {
    padding: 20,
  },
  bottomSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
    rowGap: 24,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lightColor: { backgroundColor: "#fff" },
  darkColor: { backgroundColor: "black" },
  textDark: { color: "black" },
  textLight: { color: "white" },
  logoTitle: {
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
  image: { width: '100%', height: 200, marginRight: 19, borderRadius: 8, resizeMode: 'contain'},
  scrollView: {
    padding: 0,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    resizeMode: 'contain',
  },
  label: { marginTop: 8, fontSize: 18, fontWeight: "600" },
  itemCard:{
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding:10,
    elevation: 2,
    marginLeft: 5,
    marginBottom: 0,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    paddingTop: 2,
    marginLeft: 11.9
  },
  price: {
    fontSize:20,
    color: '#28a745',
    fontWeight: 600,
    marginLeft: 11.9,
  },
  username:{
    fontSize: 15,
    color: '#888',
    marginLeft: 11.9,
  },
  details: {
    paddingBottom: 60,
  }
});