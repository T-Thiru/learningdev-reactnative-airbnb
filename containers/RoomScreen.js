import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Rating from "../components/Rating";
import SwiperFlatList from "react-native-swiper-flatlist";
import Map from "../components/Map";
import { AntDesign } from "@expo/vector-icons";

export default function RoomScreen() {
  const { params } = useRoute();
  const [dataRoom, setDataRoom] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showMoore, setShowMoore] = useState(false);
  // console.log(params.id);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const room = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${params.id}`
        );
        // console.log(Object.keys(rooms.data));
        setDataRoom(room.data);
        // console.log(dataRooms);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRoom();
  }, [params.id]);

  if (isLoading === true) {
    return <ActivityIndicator size="large" color="red" style={{ flex: 1 }} />;
  }

  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <SwiperFlatList
          autoplay
          autoplayDelay={2}
          autoplayLoop
          index={0}
          showPagination
          data={dataRoom.photos}
          renderItem={({ item }) => (
            <Image
              source={{
                uri: item.url,
              }}
              resizeMode="center"
              style={{ width: 430, height: 250 }}
            />
          )}
        />

        <View
          style={{
            backgroundColor: "black",
            width: 100,
            position: "absolute",
            bottom: 10,
            left: 15,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", margin: 20, fontSize: 20 }}>
            {dataRoom.price}$
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",

          padding: 10,
        }}
      >
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "space-evenly",
            flexWrap: "nowrap",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              flexWrap: "nowrap",
              width: 300,
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {dataRoom.title}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Rating num={dataRoom.ratingValue} />
            <Text style={{ margin: 10 }}>{dataRoom.reviews} Reviews</Text>
          </View>
        </View>
        <Image
          source={{
            uri: dataRoom.user.account.photo.url,
          }}
          resizeMode="center,cover"
          style={{ width: 80, height: 80, borderRadius: 50 }}
        />
      </View>
      <Text
        numberOfLines={showMoore ? "" : 2}
        ellipsizeMode="tail"
        style={{ margin: 10 }}
      >
        {dataRoom.description}
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}
      >
        <Text>Show moore</Text>

        <TouchableOpacity
          onPress={() => {
            setShowMoore(!showMoore);
          }}
        >
          <AntDesign
            name={showMoore ? "upcircleo" : "circledowno"}
            size={24}
            color="black"
            style={{ margin: 5 }}
          />
        </TouchableOpacity>
      </View>
      <Map data={dataRoom} />
    </ScrollView>
  );
}
