import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ProfileLogo() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Profile");
      }}
    >
      <MaterialIcons name="account-circle" size={40} color="tomato" />
    </TouchableOpacity>
  );
}
