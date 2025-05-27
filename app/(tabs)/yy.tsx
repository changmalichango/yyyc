import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "#0066cc", fontSize: 20 }}>
        Welcome to my Home screen 👋
      </Text>
    </View>
  );
}
