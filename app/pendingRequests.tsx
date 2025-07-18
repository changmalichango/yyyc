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
    View
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
    //console.log("My UID:", uid);
    if (!uid) return;

    const { data, error } = await supabase
      .from("rentalRequest")
      .select("*")
      .eq("owner_uid", uid)
      .eq("status", "pending");

    //console.log("Raw rentalRequest data:", data);
    if (error) {
      Alert.alert("Error fetching requests", error.message);
    } else {
      setRequests(data);
    }

    setLoading(false);
    //console.log("Supabase result:", data);

  };

  const updateStatus = async (id: number, newStatus: "accepted" | "rejected") => {
  const { error } = await supabase
    .from("rentalRequest")
    .update({ status: newStatus })
    .eq("id", id);

  if (error) {
    Alert.alert("Error", error.message);
    return;
  }

  if (newStatus === "accepted") {
    const { data, error: fetchError } = await supabase
      .from("rentalRequest")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !data) {
      Alert.alert("Error fetching request data", fetchError?.message || "No data");
      return;
    }

    const { item_id, start_date, end_date, renter_uid, owner_uid } = data;

    const { error: insertError } = await supabase
      .from("blockedOutDates")
      .insert([
        {
          item_id,
          start_date,
          end_date,
          renter_uid,
          owner_uid
        },
      ]);

    if (insertError) {
      Alert.alert("Error blocking out dates", insertError.message);
      return;
    }
  }

  setRequests((prev) => prev.filter((item) => item.id !== id));
  Alert.alert(`Request ${newStatus}`);
};



  type Props = {
    renter_uid: string;
    start_date: any;
    end_date: any; 
    id: string;
    request_id: any;
  };

  interface pendingRequests {
    renter_uid: string;
    start_date: any;
    end_date: any; 
    id: string;
    request_id: any;
  };

  const Card: React.FC<Props> = ({
    renter_uid,
    request_id,
    id,
    start_date,
    end_date,
  }) => (
    <View style={styles.card}>
      <Text style={styles.itemTitle}>Item ID: {id}</Text>
      <Text>Renter UID: {renter_uid}</Text>
      <Text>From: {start_date}</Text>
      <Text>To: {end_date}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.accept]}
          onPress={() => updateStatus(request_id, "accepted")}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.reject]}
          onPress={() => updateStatus(request_id, "rejected")}
        >
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
        renderItem={({item}) => (
            <Card
                renter_uid={item.owner_uid}
                start_date={item.start_date}
                end_date={item.end_date}
                id={item.item_id}
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
