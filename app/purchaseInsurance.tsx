import { getUid } from "@/assets/functions";
import { supabase } from "@/authen/supabase";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

export default function Purchase() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const textColor = colorScheme === "dark" ? styles.textLight : styles.textDark;
  const themeColor =
    colorScheme === "dark" ? styles.darkColor : styles.lightColor;
  const [itemsLentOut, setItemsLentOut] = useState<any[]>([]);
  const [mergedList, setMergedList] = useState<any[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

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
        .in("uid", uidList);

      // console.log("IAJDIAJDI", uploads);

      const uploadIds = (uploads ?? []).map((item) => item.id);

      const { data: rentalIn, error: rentalError } = await supabase
        .from("blockedOutDates")
        .select("*")
        .in("item_id", uploadIds)
        .is("insurance", null);

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

  const buyInsurance = async () => {
    const blocked_uid = selectedItem.blocked_uid;

    const { data: state, error: error1 } = await supabase
      .from("blockedOutDates")
      .update({ insurance: "insured" })
      .eq("id", blocked_uid);
  };

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
    blocked_uid: string;
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
    blocked_uid,
  }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedItem({
          Title,
          image_url,
          owner_username,
          condition,
          price,
          address,
          rate,
          decription,
          insurance,
          blocked_uid,
        });
        setShowModal(true);
      }}
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
    <View style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            router.replace("/(tabs)/me");
          }}
        >
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            alignItems: "center",
            marginLeft: 110,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Insurance
        </Text>
      </View>
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
            blocked_uid={item.id}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        style={[styles.details]}
      />
      {showModal && selectedItem && (
        <Modal
          transparent
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Do you want to purchase insurance for this item?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "green" }]}
                  onPress={async () => {
                    console.log(selectedItem);
                    await buyInsurance();

                    Alert.alert("Purchased insurance for:", selectedItem.Title);
                    setShowModal(false);
                  }}
                >
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "gray" }]}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    backgroundColor: "green",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 16,
  },
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    borderRadius: 8,
    width: "40%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
