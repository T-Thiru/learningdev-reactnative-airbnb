import { View, Text } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function Rating({ num }) {
  let rating = [];
  const isDecimal = !Number.isInteger(num);
  const flooredNum = Math.floor(num);

  for (let i = 1; i <= 5; i++) {
    if (num >= i) {
      rating.push(<FontAwesome name="star" size={24} color="yellow" key={i} />);
    }

    if (num < i && rating.length < 5) {
      rating.push(
        <FontAwesome name="star-o" size={24} color="black" key={i} />
      );
    }

    if (flooredNum === i && isDecimal) {
      rating.push(
        <FontAwesome name="star-half" size={24} color="black" key={i} />
      );
    }
  }

  return rating;
}
