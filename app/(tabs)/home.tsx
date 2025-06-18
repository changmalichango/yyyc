import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";

export default function ListingsScreen() {
  const colorScheme = useColorScheme();
  const textTheme = colorScheme === "dark" ? styles.textLight : styles.textDark;
  const themeStyle =
    colorScheme === "dark" ? styles.darkColor : styles.lightColor;
<<<<<<< HEAD

=======
  
>>>>>>> 92afa5ff05934c3002a97e6fffc83dd0356192b1
  type Props = {
    title: string;
    price: number;
    username: string;
    image: any;
<<<<<<< HEAD
  };

  const Card: React.FC<Props> = ({ title, price, username, image }) => (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.titleRow}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
=======
  }

  const Card: React.FC<Props> = ({title, price, username, image}) => (
    <View style={styles.card}> 
      <Image source={image} style={styles.image} />
      <View style={styles.titleRow}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.price}>${price}</Text>  
      </View>    
>>>>>>> 92afa5ff05934c3002a97e6fffc83dd0356192b1
      <Text style={styles.username}>@{username}</Text>
    </View>
  );

  return (
<<<<<<< HEAD
    <SafeAreaView style={[styles.safe, themeStyle]}>
      {/* ///////////////////////////////////// */}
      {/* TOP BAR AND SEARCHING BAR!!!!!!!!!!!! */}
      <View style={styles.topSection}>
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
        <View style={styles.bottomSection}>
          <Card
            title="Bike"
            price={30}
            username="yy143"
            image={require("../../assets/images/bike.png")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
=======
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.bottomSection}>
        <Card
          title= "Bike"
          price= {30}
          username= "yy143"
          image={require('../../assets/images/bike.png')}
        />  
      </View>
    </ScrollView>
  )

>>>>>>> 92afa5ff05934c3002a97e6fffc83dd0356192b1
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
<<<<<<< HEAD
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 12,
    rowGap: 24,
  },
  listContainer: {
    padding: 10,
  },
  itemCard: {
    width: "46%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    marginRight: 10,
    elevation: 2,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 25,
    color: "black",
    paddingTop: 2,
    marginLeft: 60,
  },
  price: {
    fontSize: 20,
    color: "#28a745",
    fontWeight: 600,
    marginLeft: 60,
  },
  username: {
    fontSize: 15,
    color: "#888",
    marginLeft: 60,
  },
  scrollview: {
    padding: 20,
  },
  leftHalf: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rightHalf: {
    flex: 1,
  },
=======
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
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
    marginBottom: 20,
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
  scrollview: {
    padding: 20,
  },
  leftHalf: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  rightHalf: {
    flex: 1,
  },
>>>>>>> 92afa5ff05934c3002a97e6fffc83dd0356192b1
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
<<<<<<< HEAD
  image: { width: "100%", height: 120, borderRadius: 8, marginBottom: 6 },
=======
  image: { width: '100%', height: 120, borderRadius: 8, marginBottom: 6},
>>>>>>> 92afa5ff05934c3002a97e6fffc83dd0356192b1
  label: { marginTop: 8, fontSize: 18, fontWeight: "600" },
  itemDimension: {
    resizeMode: "contain",
    height: 150,
    width: 150,
<<<<<<< HEAD
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 50,
  },
});
=======
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 50
  },
});
>>>>>>> 92afa5ff05934c3002a97e6fffc83dd0356192b1
