import { getUid } from "@/assets/functions";
import { supabase } from "@/authen/supabase";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PendingRequests() {
  const router = useRouter();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    const uid = await getUid();
    console.log("My UID:", uid);
    if (!uid) return;

    const { data: request, error: error1 } = await supabase
      .from("rentalRequest")
      .select("*")
      .eq("owner_uid", uid)
      .eq("status", "pending");

    console.log("Raw rentalRequest data:", request);
    if (error1) {
      Alert.alert("Error fetching requests", error1.message);
    } else {
      const ids = request?.map((r) => r.item_id) ?? [];
      const { data: details, error: error2 } = await supabase
        .from("uploads")
        .select("*")
        .in("id", ids);

      if (error2) Alert.alert(error2.message);

      const merged = request.map((r) => {
        const item = details?.find((i) => i.id === r.item_id);
        return { ...r, item };
      });

      setRequests(merged);
      // console.log("MERGED", merged);
    }

    setLoading(false);
    // console.log("Supabase result:", requests);
  };

  type Props = {
    renter_name: string;
    start_date: any;
    end_date: any;
    item: string;
    request_id: any;
  };

  interface pendingRequests {
    renter_name: string;
    start_date: any;
    end_date: any;
    item: string;
    request_id: any;
  }

  const Card: React.FC<Props> = ({
    renter_name,
    request_id,
    item,
    start_date,
    end_date,
  }) => (
    <View style={styles.card}>
      <Text style={styles.itemTitle}>Item Name: {item}</Text>
      <Text>Renter: {renter_name}</Text>
      <Text>From: {start_date}</Text>
      <Text>To: {end_date}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.accept]}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.reject]}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
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
            marginLeft: 80,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Pending Approval
        </Text>
      </View>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            renter_name={item.item.name}
            start_date={item.start_date}
            end_date={item.end_date}
            item={item.item.item}
            request_id={item.id}
          />
        )}
        refreshing={loading}
        onRefresh={fetchRequests}
        ListEmptyComponent={
          loading ? null : <Text style={styles.empty}>No pending requests</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: {
    backgroundColor: "green",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 5,
    alignItems: "center",
  },
  accept: {
    backgroundColor: "#4CAF50",
  },
  reject: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  empty: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 50,
  },
});