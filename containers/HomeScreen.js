import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { Button, Flex } from "@react-native-material/core";
import axios from "axios";

export default function HomeScreen() {
  // const user = useContext(UserContext);
  const navigation = useNavigation();
  const [dataRooms, setDataRooms] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        // console.log(Object.keys(rooms.data));
        setDataRooms(rooms.data);
        console.log(dataRooms);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRooms();
  }, []);

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <ActivityIndicator size="large" color="red" style={{ flex: 1 }} />;
  }

  return (
    <FlatList
      style={{ height: 50 }}
      data={dataRooms}
      keyExtractor={(room) => room._id}
      renderItem={(room) => {
        <Text>{room._id}</Text>;
      }}
    />
  );
}
