import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { Surface } from "@react-native-material/core";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Rating from "../components/Rating";
import * as Location from "expo-location";

export default function HomeScreen() {
  // const user = useContext(UserContext);
  const [dataRooms, setDataRooms] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [coords, setCoords] = useState();

  // console.log(coords);

  useEffect(() => {
    const askPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});

        const obj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setCoords(obj);
      }
    };

    const fetchRooms = async () => {
      try {
        const rooms = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        // console.log(Object.keys(rooms.data));
        setDataRooms(rooms.data);
        // console.log(dataRooms);
      } catch (error) {
        console.log(error.message);
      }
    };
    askPermission();
    fetchRooms();
    setIsLoading(false);
  }, []);

  if (isLoading === true) {
    return <ActivityIndicator size="large" color="red" style={{ flex: 1 }} />;
  }

  return (
    <FlatList
      // scrollEnabled={true}
      data={dataRooms}
      keyExtractor={(item) => {
        return item._id;
      }}
      renderItem={({ item }) => {
        return (
          <Surface elevation={4} category="medium" style={{ margin: 10 }}>
            {/* <ScrollView horizontal={true}> */}
            <FlatList
              horizontal={true}
              style={{ flexDirection: "row" }}
              data={item.photos}
              keyExtractor={(photo) => {
                // console.log(photo);
                return photo.picture_id;
              }}
              renderItem={({ item }) => {
                // console.log(item);
                return (
                  <Image
                    source={{
                      uri: item.url,
                    }}
                    resizeMode={"center, cover"}
                    style={{ width: 410, height: 250 }}
                  />
                );
              }}
            />
            {/* </ScrollView> */}
            <View
              style={{
                backgroundColor: "black",
                width: 100,
                position: "absolute",
                bottom: 120,

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", margin: 20, fontSize: 20 }}>
                {item.price}$
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Room", { id: item._id })}
            >
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
                    {item.title}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Rating num={item.ratingValue} />
                    <Text style={{ margin: 10 }}>{item.reviews} Reviews</Text>
                  </View>
                </View>
                <Image
                  source={{
                    uri: item.user.account.photo.url,
                  }}
                  resizeMode="center,cover"
                  style={{ width: 80, height: 80, borderRadius: 50 }}
                />
              </View>
            </TouchableOpacity>
          </Surface>
        );
      }}
    />
  );
}
