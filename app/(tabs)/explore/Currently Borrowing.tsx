import { getUid } from "@/assets/functions";
import { supabase } from "@/authen/supabase";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

const RentIn = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const textColor = colorScheme === "dark" ? styles.textLight : styles.textDark;
  const themeColor =
    colorScheme === "dark" ? styles.darkColor : styles.lightColor;
  const [itemsLentOut, setItemsLentOut] = useState<any[]>([]);
  const [mergedList, setMergedList] = useState<any[]>([]);

  useEffect(() => {
    const fetchRentIn = async () => {
      const uid = await getUid();
      if (!uid) return;

      const { data: ownerUid, error: error3 } = await supabase
        .from("blockedOutDates")
        .select("owner_uid")
        .eq("renter_uid", uid);

      // console.log("UAHDIHADIH", ownerUid);

      const uidList = ownerUid?.map((obj) => obj.owner_uid) ?? [];

      const { data: uploads, error: uploadsError } = await supabase
        .from("uploads")
        .select("*")
        .in("uid", [uidList]);

      // console.log("IAJDIAJDI", uploads);

      const uploadIds = (uploads ?? []).map((item) => item.id);

      const { data: rentalIn, error: rentalError } = await supabase
        .from("blockedOutDates")
        .select("*")
        .in("item_id", uploadIds);

      if (uploadsError || rentalError) {
        console.error(
          "Error fetching data:",
          uploadsError?.message || rentalError?.message
        );
        return;
      }

      const merged = (rentalIn ?? []).map((r) => {
        const item = (uploads ?? []).find((u) => u.id === r.item_id);
        return {
          title: item?.title,
          image_url: item?.image_url,
          id: r.id,
          start_date: r.start_date,
          end_date: r.end_date,
          owner_uid: r.owner_uid,
          item: item?.item,
          renter: item?.name,
          insurance: r.insurance,
          condition: item.condition,
          price: item.price,
          rate: item.duration,
          decription: item.description,
          address: item.address,
        };
      });

      console.log("MERGED LIST ", merged);
      setMergedList(merged);
    };

    fetchRentIn();
  }, []);

  type Props = {
    Title: string;
    image_url: any;
    start_date: any;
    end_date: any;
    owner_username: string;
    condition: string;
    price: string;
    rate: string;
    decription: string;
    address: string;
    insurance: string;
  };

  const Box: React.FC<Props> = ({
    Title,
    image_url,
    start_date,
    end_date,
    owner_username,
    condition,
    price,
    address,
    rate,
    decription,
    insurance,
  }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/itemdetails",
          params: {
            Title,
            image_url,
            owner_username,
            condition,
            price,
            address,
            rate,
            decription,
          },
        })
      }
      style={[styles.box, themeColor]}
    >
      <Image source={{ uri: image_url }} style={styles.image} />
      <View>
        <Text style={[styles.itemTitle, styles.itemAndDays, textColor]}>
          {Title}
        </Text>
        <Text style={[styles.username, textColor]}>@{owner_username}</Text>
        <Text style={[styles.days, styles.itemAndDays, textColor]}>
          {start_date}-{end_date}
        </Text>
        <View style={insurance ? styles.insurebox : styles.notinsurebox}>
          <Text>{insurance ? "insured" : "not insured"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <FlatList
      contentContainerStyle={[styles.container, { paddingBottom: 150 }]}
      data={mergedList}
      renderItem={({ item }) => (
        <Box
          Title={item.item}
          image_url={item.image_url}
          start_date={item.start_date}
          end_date={item.end_date}
          owner_username={item.renter}
          condition={item.condition}
          price={item.price}
          address={item.address}
          decription={item.description}
          rate={item.rate}
          insurance={item.insurance}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}
      style={[styles.details]}
    />
  );
};

export default RentIn;

const styles = StyleSheet.create({
  box: {
    width: "100%",
    height: 120,
    borderBottomWidth: 2,
    borderColor: "green",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  details: {},
  lightColor: { backgroundColor: "#fff" },
  darkColor: { backgroundColor: "black" },
  textDark: { color: "black" },
  textLight: { color: "white" },
  itemTitle: {
    fontWeight: "bold",
    color: "black",
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
    fontWeight: "bold",
    fontSize: 20,
  },
  itemAndDays: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  image: {
    resizeMode: "contain",
    width: "20%",
    height: "100%",
    paddingBottom: 5,
    marginTop: 2,
  },
  days: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  container: {
    alignItems: "center",
  },
  insurebox: {
    backgroundColor: "green",
    borderRadius: 20,
    width: 60,
    alignItems: "center",
  },

  notinsurebox: {
    backgroundColor: "orange",
    borderRadius: 20,
    width: 80,
    alignItems: "center",
  },
});
