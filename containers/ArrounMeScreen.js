import { ActivityIndicator } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import Map from "../components/Map";
import axios from "axios";

export default function ArrounMeScreen() {
  const [positions, setPositions] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getPosition = async () => {
      try {
        const position = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms/around"
        );
        setPositions(position.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPosition();
  }, []);

  if (isLoading === true) {
    return <ActivityIndicator size="large" color="red" style={{ flex: 1 }} />;
  }

  return <Map data={positions} />;
}
