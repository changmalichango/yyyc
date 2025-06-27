import { useEffect, useState } from "react";
import { supabase } from "../authen/supabase";

import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export const getUid = async (): Promise<string | null> => {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    console.error("Failed to get UID:", error?.message);
    return null;
  }

  return data.user.id;
};

export const getEmail = async (): Promise<string | null> => {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    console.error("Failed to get email:", error?.message);
    return null;
  }

  return data.user.email ?? null;
};

export const getName = async (): Promise<string | null> => {
  const myUid = await getUid();
  const { data: username, error: error2 } = await supabase
    .from("users")
    .select("name")
    .eq("uid", myUid)
    .maybeSingle();
  return username?.name ?? null;
};

export const getImageUrl = async (): Promise<string | null> => {
  const myUid = await getUid();
  const { data: username, error } = await supabase
    .from("users")
    .select("profile_pic")
    .eq("uid", myUid)
    .maybeSingle();
  return username?.profile_pic ?? null;
};

// DROPDOWN
// //////////////////////////////////////////////

export const condition = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
];

export const DropdownCondition = ({
  onValueChange,
}: {
  onValueChange: (val: string) => void;
}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = (item: any) => {
    setValue(item.value);
    setIsFocus(false);
    onValueChange(item.value);
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={[dropdownConditionStyle.label, isFocus && { color: "blue" }]}
        ></Text>
      );
    }
    return null;
  };

  return (
    <View style={dropdownConditionStyle.container}>
      {renderLabel()}
      <Dropdown
        style={[
          dropdownConditionStyle.dropdown,
          isFocus && { borderColor: "blue" },
        ]}
        placeholderStyle={dropdownConditionStyle.placeholderStyle}
        selectedTextStyle={dropdownConditionStyle.selectedTextStyle}
        inputSearchStyle={dropdownConditionStyle.inputSearchStyle}
        iconStyle={dropdownConditionStyle.iconStyle}
        data={condition}
        // search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleChange}
        // renderLeftIcon={() => (
        //   <AntDesign
        //     style={dropdownConditionStyle.icon}
        //     color={isFocus ? "blue" : "black"}
        //     name="Safety"
        //     size={20}
        //   />
        // )}
      />
    </View>
  );
};

export const dropdownConditionStyle = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // padding: 16,
  },
  dropdown: {
    height: 50,
    width: 150,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export const duration = [
  { label: "per day", value: "day" },
  { label: "per week", value: "week" },
  { label: "per month", value: "month" },
  { label: "per year", value: "year" },
];

export const DropdownDuration = ({
  onValueChange,
}: {
  onValueChange: (val: string) => void;
}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = (item: any) => {
    setValue(item.value);
    setIsFocus(false);
    onValueChange(item.value);
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={[dropdownConditionStyle2.label, isFocus && { color: "blue" }]}
        ></Text>
      );
    }
    return null;
  };

  return (
    <View style={dropdownConditionStyle2.container}>
      {renderLabel()}
      <Dropdown
        style={[
          dropdownConditionStyle2.dropdown,
          isFocus && { borderColor: "blue" },
        ]}
        placeholderStyle={dropdownConditionStyle2.placeholderStyle}
        selectedTextStyle={dropdownConditionStyle2.selectedTextStyle}
        inputSearchStyle={dropdownConditionStyle2.inputSearchStyle}
        iconStyle={dropdownConditionStyle2.iconStyle}
        data={duration}
        // search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select " : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleChange}
        // renderLeftIcon={() => (
        //   <AntDesign
        //     style={dropdownConditionStyle.icon}
        //     color={isFocus ? "blue" : "black"}
        //     name="Safety"
        //     size={20}
        //   />
        // )}
      />
    </View>
  );
};

export const dropdownConditionStyle2 = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // padding: 16,
  },
  dropdown: {
    height: 50,
    width: 150,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export const sex = [
  { label: "male", value: "male" },
  { label: "female", value: "female" },
  { label: "prefer not to say", value: null },
];

export const DropdownSex = ({
  onValueChange,
}: {
  onValueChange: (val: string) => void;
}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = (item: any) => {
    setValue(item.value);
    setIsFocus(false);
    onValueChange(item.value);
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={[dropdownConditionStyle2.label, isFocus && { color: "blue" }]}
        ></Text>
      );
    }
    return null;
  };

  return (
    <View style={dropdownConditionStyle2.container}>
      {renderLabel()}
      <Dropdown
        style={[
          dropdownConditionStyle2.dropdown,
          isFocus && { borderColor: "blue" },
        ]}
        placeholderStyle={dropdownConditionStyle2.placeholderStyle}
        selectedTextStyle={dropdownConditionStyle2.selectedTextStyle}
        inputSearchStyle={dropdownConditionStyle2.inputSearchStyle}
        iconStyle={dropdownConditionStyle2.iconStyle}
        data={sex}
        // search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select " : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleChange}
        // renderLeftIcon={() => (
        //   <AntDesign
        //     style={dropdownConditionStyle.icon}
        //     color={isFocus ? "blue" : "black"}
        //     name="Safety"
        //     size={20}
        //   />
        // )}
      />
    </View>
  );
};
