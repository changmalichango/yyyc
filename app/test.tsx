import { DropdownCondition, DropdownDuration } from "@/assets/functions";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function TestScreen() {
  const [selectedCondition, setSelectedCondition] = useState("");
  const [date, setDate] = useState("");

  return (
    <View>
      <View>
        <DropdownCondition onValueChange={(val) => setSelectedCondition(val)} />

        <TouchableOpacity onPress={() => console.log(selectedCondition)}>
          <Text>ahfaudhaouf</Text>
        </TouchableOpacity>
      </View>
      <View>
        <DropdownDuration onValueChange={(val) => setDate(val)} />

        <TouchableOpacity onPress={() => console.log(date)}>
          <Text>ahfaudhaouf</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
