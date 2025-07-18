import { getUid } from "@/assets/functions";
import { supabase } from "@/authen/supabase";
import Entypo from "@expo/vector-icons/Entypo";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from "react-native";
import { Calendar } from "react-native-calendars";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const options = {
  headerShown: false,
};

export default function ItemDetailsScreen() {
  const colorScheme = useColorScheme();
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  const textColor = colorScheme === "dark" ? styles.textLight : styles.textDark;
  const themeColor =
    colorScheme === "dark" ? styles.darkColor : styles.lightColor;
  const [userId, setUserId] = useState<string | null>(null);
  const { Title, price, image_url, rate, description, user_uid, id } =
    useLocalSearchParams();
  const [selectedRange, setSelectedRange] = useState({});
const [startDate, setStartDate] = useState<string | null>(null);
const [endDate, setEndDate] = useState<string | null>(null);

interface MarkedDate {
  color: string;
  textColor: string;
  startingDay?: boolean;
  endingDay?: boolean;
}

type MarkedRange = Record<string, MarkedDate>;

const getMarkedRange = (start: string, end: string): MarkedRange => {
  let range: MarkedRange = {};
  let startD = new Date(start);
  let endD = new Date(end);

  while (startD <= endD) {
    const dateStr = startD.toISOString().split('T')[0];
    range[dateStr] = {
      color: 'green',
      textColor: 'white'
    };
    startD.setDate(startD.getDate() + 1);
  }

  range[start] = { startingDay: true, color: 'green', textColor: 'white' };
  range[end] = { endingDay: true, color: 'green', textColor: 'white' };

  return range;
};

  console.log(user_uid);
  useEffect(() => {
    const loadInitial = async () => {
      const uid = await getUid();
      setUserId(uid);

      if (!uid || !id) return;

      // Check if favourited
      const { data, error } = await supabase
        .from("favourites")
        .select("id")
        .eq("user_uid", uid)
        .eq("item_id", id)
        .single();

      if (!error && data) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    };

    loadInitial();
  }, [id]);

  const onPress = async () => {
    console.log("❤️ Heart pressed!");
    console.log(id);
    // console.log("❤️ Heart pressed!");

    const uid = await getUid();

    if (!uid || !id) {
      console.log("here");
      return;
    }

    if (liked) {
      // Remove from favourites
      const { error } = await supabase
        .from("favourites")
        .delete()
        .eq("user_uid", uid)
        .eq("item_id", id);

      if (error) {
        console.error("❌ Delete error:", error);
        Alert.alert("Error removing favourite", error.message);
        return;
      }

      setLiked(false);
      console.log("❤️ liked state before:", liked);
    } else {
      // Add to favourites
      const { data, error } = await supabase
        .from("favourites")
        .insert([{ user_uid: uid, item_id: id }]);

      if (error) {
        console.error("❌ Insert error:", error);
        Alert.alert("Error adding to favourites", error.message);
        return;
      }

      setLiked(true);
      console.log("❤️ liked state after:", liked);
    }

    // Animate
    scale.value = withSpring(1.3, {}, () => {
      scale.value = withSpring(1);
    });
  };

  

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <SafeAreaView style={[styles.safe, themeColor]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            router.replace("/home");
          }}
        >
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            alignItems: "center",
            marginLeft: 123,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          My Listings
        </Text>
      </View>

      <ScrollView style={styles.container}>
        <Image source={{ uri: image_url as string }} style={styles.image} />
        <Text style={[styles.title, textColor]}>{Title}</Text>
        <Text style={[styles.price]}>
          ${price} per {rate}
        </Text>
        <Text style={[styles.condition, textColor]}>Condition</Text>
        <Text style={[styles.actualCondition, textColor]}>9</Text>
        <Text style={[styles.details, textColor]}>Description</Text>
        <Text style={[styles.description, textColor]}>{description}</Text>
        <Text style={[styles.location, textColor]}>Location</Text>
        <Text style={[styles.mrt, textColor]}>Sengkang</Text>

        <View style={{ padding: 15 }}>
        <Text>Select your proposed rental dates:</Text>
        <Calendar
          markingType={'period'}
          markedDates={selectedRange}
          onDayPress={(day) => {
            if (!startDate) {
              setStartDate(day.dateString);
              setSelectedRange({
                [day.dateString]: {
                  startingDay: true,
                  color: 'green',
                  textColor: 'white',
                }
              });
            } else if (!endDate) {
              setEndDate(day.dateString);
              const newRange = getMarkedRange(startDate, day.dateString);
              setSelectedRange(newRange);
            } else {
              // reset
              setStartDate(null);
              setEndDate(null);
              setSelectedRange({});
            }
          }}
        />

  <Text>Start Date: {startDate ?? 'Not selected'}</Text>
  <Text>End Date: {endDate ?? 'Not selected'}</Text>

  <TouchableOpacity
    style={{
      marginTop: 10,
      padding: 10,
      backgroundColor: 'green',
      borderRadius: 5,
      alignItems: 'center',
    }}
    onPress={async () => {
  console.log('✅ Edit Available Dates button pressed');

  if (!startDate || !endDate) {
    Alert.alert('Please select a start and end date first!');
    return;
  }

  const uid = await getUid();

  if (!uid || !id) {
    Alert.alert('Error: missing user or item ID');
    return;
  }


    // 1️⃣ DELETE all existing blocked dates for this item
    const { error: deleteError } = await supabase
      .from('blockedOutDates')
      .delete()
      .eq('item_id', id);

    if (deleteError) {
      console.log('❌ Delete error:', deleteError);
      Alert.alert('Error clearing existing dates', deleteError.message);
      return;
    }

    console.log('✅ Inserting new blocked date:', startDate, endDate);

    // 2️⃣ INSERT new blocked date
    const { error: insertError } = await supabase
      .from('blockedOutDates')
      .insert([
        {
          item_id: id,
          owner_uid: uid,
          start_date: startDate,
          end_date: endDate,
        }
      ]);

    if (insertError) {
      console.log('❌ Insert error:', insertError);
      Alert.alert('Error saving new dates', insertError.message);
    } else {
      console.log('✅ Dates updated successfully!');
      Alert.alert('Dates updated successfully!');
      setStartDate(null);
      setEndDate(null);
      setSelectedRange({});


  }
}}

  >
    <Text style={{ color: 'white', fontWeight: 'bold' }}>Edit Dates Available</Text>
    </TouchableOpacity>
        </View>
        </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingBottom: 20,
  },
  lightColor: {
    backgroundColor: "#fff",
  },
  darkColor: {
    backgroundColor: "black",
  },
  textDark: {
    color: "black",
  },
  textLight: {
    color: "white",
  },
  container: {
    height: "100%",
  },
  image: {
    width: "100%",
    height: 450,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    padding: 15,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  actualCondition: {
    fontSize: 16,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  location: {
    fontSize: 20,
    paddingHorizontal: 15,
    fontWeight: "bold",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  condition: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 15,
  },
  mrt: {
    fontSize: 14,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  details: {
    fontSize: 20,
    paddingHorizontal: 15,
    fontWeight: "bold",
  },
  topSection: {
    padding: 20,
  },
  bottomSection: {
    backgroundColor: "brown",
    height: 50,
    flexDirection: "row",
    gap: 10,
  },
  header: {
    backgroundColor: "green",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 16,
  },
  chatBox: {
    width: "20%",
    height: "100%",
    backgroundColor: "#006400",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    borderRadius: 10,
  },
  chatText: {
    fontSize: 17,
    alignSelf: "center",
    color: "white",
    marginRight: 10,
  },
  chatIconImage: {
    height: 25,
    width: 30,
    alignSelf: "center",
    marginLeft: 10,
  },
  heartWrapper: {
    justifyContent: "center",
    alignContent: "center",
    height: "100%",
    width: 40,
    marginLeft: 10,
  },
  heartIcon: {
    height: "100%",
    width: 40,
    marginLeft: 10,
  },
});

console.log("userId");
