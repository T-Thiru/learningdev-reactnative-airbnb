import { Image } from "react-native";
import React from "react";

export default function TitleLogo() {
  return (
    <Image
      source={require("../assets/logo.png")}
      style={{ width: 40, height: 40 }}
      resizeMode="center,cover"
    />
  );
}
