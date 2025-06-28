import { getEmail, getImageUrl, getName } from "@/assets/functions";
import { supabase } from "@/authen/supabase";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function MeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const styleColor =
    colorScheme === "dark" ? styles.darkStyle : styles.lightStyle;
  const textColor = colorScheme === "dark" ? styles.lightText : styles.darkText;

  const [username, setUsername] = useState<string | null>(null);
  useEffect(() => {
    const fetchUsername = async () => {
      const name = await getName();
      setUsername(name);
    };

    fetchUsername();
  }, []);

  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    const fetchEmail = async () => {
      const email = await getEmail();
      setEmail(email);
    };
    fetchEmail();
  }, []);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    const fetchImage = async () => {
      const url = await getImageUrl();
      setImageUrl(url);
    };

    fetchImage();
  }, []);

  return (
    <SafeAreaView style={[styles.container, styleColor]}>
      {/* TITLE BOX
      /////////////////////////////////////////////////////////////////////////// */}

      <View style={styles.titleBox}>
        <Text style={[textColor, styles.titleText]}>Profile</Text>
      </View>

      {/* MAIN PIC BOX
      /////////////////////////////////////////////////////////////////////////// */}
      <View style={styles.picBox}>
        <LinearGradient
          colors={["#037d50", "transparent"]}
          start={[0, 0]}
          end={[0, 1]}
          style={[styles.circleOutside, styleColor]}
        >
          <View style={[styles.circleInside, styleColor]}>
            <LinearGradient
              colors={["#037d50", "transparent"]}
              start={[0, 0]}
              end={[0, 1]}
              style={[styles.circleOutside2, styleColor]}
            >
              <View style={[styles.circleInside2, styleColor]}>
                <LinearGradient
                  colors={["green", "transparent"]}
                  start={[0, 0]}
                  end={[0, 1]}
                  style={styles.circletrans}
                >
                  <ImageBackground
                    source={
                      imageUrl
                        ? { uri: imageUrl }
                        : require("../../assets/images/defaultpfp.png")
                    }
                    style={styles.picture}
                  ></ImageBackground>
                </LinearGradient>
              </View>
            </LinearGradient>
          </View>
        </LinearGradient>
      </View>

      {/* //////////////////////////////////////////////////////////////////
USER NAME AND EMAIL */}

      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Text style={[{ fontWeight: "bold", fontSize: 25 }, textColor]}>
          {username || "Loading.."}
        </Text>
        <Text style={{ marginTop: 5, color: "grey", fontSize: 20 }}>
          {email || "Loading.."}
        </Text>
        <Text></Text>
      </View>

      {/* ////////////////////////////////////////////////////////////////////////////
      EDIT PROFILE */}

      <View style={{ marginTop: 40 }}>
        <TouchableOpacity
          onPress={() => {
            router.replace("/edit profile");
          }}
        >
          <View style={styles.functionBox}>
            <Feather name="edit" size={24} style={styles.icons} />
            <Text style={[textColor, styles.boxText]}>Edit Profile</Text>
            <Feather
              name="chevron-right"
              size={24}
              color={"green"}
              style={{ paddingRight: 15 }}
            />
          </View>
        </TouchableOpacity>

        {/* 
        FAV 
        ////////////////////////////////////////////////////////////////////////// */}
        <TouchableOpacity>
          <View style={styles.functionBox}>
            <Feather name="heart" size={24} style={styles.icons} />
            <Text style={[textColor, styles.boxText]}>Favourites</Text>
            <Feather
              name="chevron-right"
              size={24}
              color={"green"}
              style={{ paddingRight: 15 }}
            />
          </View>
        </TouchableOpacity>

        {/* 
        My Listings
        /////////////////////////////////////////////////////// */}
        <TouchableOpacity onPress={() => router.replace("/My Listings")}>
          <View style={styles.functionBox}>
            <Feather name="book-open" size={24} style={styles.icons} />
            <Text style={[textColor, styles.boxText]}>My Listings</Text>
            <Feather
              name="chevron-right"
              size={24}
              color={"green"}
              style={{ paddingRight: 15 }}
            />
          </View>
        </TouchableOpacity>

        {/* LOG OUT
        ///////////////////////////////////////////////////////////// */}
        <TouchableOpacity
          onPress={() => {
            supabase.auth.signOut();
            router.replace("/login");
          }}
        >
          <View style={styles.functionBox}>
            <Feather name="log-out" size={24} style={styles.icons} />
            <Text style={[textColor, styles.boxText]}>Log Out</Text>
            <Feather
              name="chevron-right"
              size={24}
              color={"green"}
              style={{ paddingRight: 15 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  darkStyle: { backgroundColor: "black" },
  lightStyle: { backgroundColor: "white" },
  darkText: { color: "black" },
  lightText: { color: "white" },
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleBox: { alignItems: "center", marginTop: 20 },
  titleText: { fontWeight: "bold", fontSize: 20 },

  picBox: { alignItems: "center", marginTop: 20 },
  circleOutside: {
    height: 150,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "green",
    padding: 0,
    borderRadius: 75,
  },
  circleInside: {
    height: 145,
    width: 145,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  circleOutside2: {
    height: 120,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "green",
    padding: 0,

    borderRadius: 75,
  },
  circleInside2: {
    height: 115,
    width: 115,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  circletrans: {
    height: 100,
    width: 100,
    borderColor: "#f6f6f6",
    borderWidth: 2,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  picture: {
    height: 100,
    width: 100,
  },
  profilePic: { height: 70, resizeMode: "contain", borderRadius: 100 },

  functionBox: {
    // backgroundColor: "#aaaaaa",
    width: 400,
    height: 60,
    // borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    // marginTop: 20,
    alignItems: "center",
    // justifyContent: "space-between",
    flexDirection: "row",
  },
  boxText: {
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 20,
    marginRight: 170,

    width: 130,
  },
  icons: {
    color: "#E2D7AB",
    marginLeft: 15,
    backgroundColor: "#0F4415",
    borderWidth: 10,
    borderRadius: 100,
    borderColor: "#0F4415",
  },
});
