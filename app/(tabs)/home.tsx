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
    <View style={styles.card}> 
      <Image source={image} style={styles.image} />
      <View style={styles.titleRow}>
        <Text style={styles.itemTitle}>{title}</Text>
        <View>
          <Text style={styles.price}>${price}</Text>  
        </View>
      </View>    
      <Text style={styles.username}>@{username}</Text>
    </View>
  )

  return (
    <SafeAreaView style={[styles.safe, themeStyle]}>
      {/* ///////////////////////////////////// */}
      {/* TOP BAR AND SEARCHING BAR!!!!!!!!!!!! */}
      <View style={styles.topSection}>
        <View style={styles.logoTitle}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>  
          <Text style={styles.logoText}>CanIRent</Text>
        

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
      <View style={[styles.bottomSection, styles.imageContainer]}>
        <Card
          title= "bike"
          price= {30}
          username= "yy143"
          image={require('../../assets/images/eiffertower.png')}
        />  
      </View>
      <View style={[styles.bottomSection, styles.imageContainer]}>
        <Card
          title= "guitar"
          price= {30}
          username= "yc"
          image={require('../../assets/images/guitar.png')}
        />  
      </View>
      <View style={[styles.bottomSection, styles.imageContainer]}>
        <Card
          title= "bike"
          price= {30}
          username= "tzefoong"
          image={require('../../assets/images/sky.png')}
        />  
      </View>
    </ScrollView>
  </SafeAreaView>
  )
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
    paddingHorizontal: 12,
    rowGap: 24,
  },
  listContainer: {
    padding: 10,
  },
  itemCard:{
    width: '46%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 32,
    marginRight: 10,
    elevation: 2,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    paddingTop: 2,
    marginLeft: 10
  },
  price: {
    fontSize:20,
    color: '#28a745',
    fontWeight: 600,
    marginLeft: 60,
    marginTop: 7
  },
  username:{
    fontSize: 15,
    color: '#888',
    marginLeft:0,
  },
  scrollview: {
    padding: 20,
  },
  imageContainer: {
  width: 225,
  height: 225,
  marginBottom: 40,
  borderColor: '#28a745',
  
  justifyContent: 'center',
  alignItems: 'center',
  
  },
  leftHalf: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  rightHalf: {
    flex: 1,
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
  card: { marginBottom: 24, alignItems: "center" },
  image: { width: '100%', height: '100%', marginBottom: 6, resizeMode: 'contain'},
  label: { marginTop: 8, fontSize: 18, fontWeight: "600" },
});