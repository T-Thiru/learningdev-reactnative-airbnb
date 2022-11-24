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
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RatingStar = ({ num }) => {
  let rating = [];
  const isDecimal = !Number.isInteger(num);
  const flooredNum = Math.floor(num);

  for (let i = 1; i <= 5; i++) {
    if (num >= i) {
      rating.push(<FontAwesome name="star" size={24} color="yellow" />);
    }

    if (num < i && rating.length < 5) {
      rating.push(<FontAwesome name="star-o" size={24} color="black" />);
    }

    if (flooredNum === i && isDecimal) {
      rating.push(<FontAwesome name="star-half" size={24} color="black" />);
    }
  }

  return rating;
};

export default function HomeScreen() {
  // const user = useContext(UserContext);
  const [dataRooms, setDataRooms] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        // console.log(Object.keys(rooms.data));
        setDataRooms(rooms.data);
        // console.log(dataRooms);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRooms();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return <ActivityIndicator size="large" color="red" style={{ flex: 1 }} />;
  }

  return (
    <FlatList
      scrollEnabled={true}
      data={dataRooms}
      keyExtractor={(room) => {
        return room._id;
      }}
      renderItem={({ item }) => {
        return (
          <Surface elevation={4} category="medium" style={{ margin: 10 }}>
            <ScrollView horizontal={true}>
              <FlatList
                style={{ flexDirection: "row" }}
                data={item.photos}
                keyExtractor={(item) => {
                  return item.picture_id;
                }}
                renderItem={({ item }) => {
                  // console.log(item);
                  return (
                    <Image
                      source={{
                        uri: item.url,
                      }}
                      resizeMode="center, cover"
                      style={{ width: 410, height: 250 }}
                    />
                  );
                }}
              />
            </ScrollView>
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
              onPress={() => navigation.navigate("Room", { item: item })}
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
                    <RatingStar num={item.ratingValue} />
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
