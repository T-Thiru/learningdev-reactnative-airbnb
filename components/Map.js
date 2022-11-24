import { View, Text, Image } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import Rating from "./Rating";

export default function Map({ data }) {
  const navigation = useNavigation();

  if (data.length > 0) {
    return (
      <MapView
        provider="google"
        showsUserLocation
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      >
        {data.map((position) => {
          return (
            <Marker
              key={position._id}
              coordinate={{
                latitude: position.location[1],
                longitude: position.location[0],
              }}
              //   title={position.title}
              //   description={position.price + "$"}
              //   onCalloutPress={() => {
              //     navigation.navigate("Room", { id: position._id });
              //   }}
            >
              <Callout
                onPress={() => {
                  navigation.navigate("Room", { id: position._id });
                }}
              >
                <View style={{ padding: 5 }}>
                  <Text style={{ fontWeight: "600", fontSize: 15 }}>
                    {position.title}
                  </Text>
                  <Text style={{ fontWeight: "600", fontSize: 25 }}>
                    {position.price + "$"}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Rating num={position.ratingValue} />
                  </View>
                  <Image
                    source={{
                      uri: position.photos[0].url,
                    }}
                    resizeMode="center,cover"
                    style={{ width: "auto", height: 80 }}
                  />
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    );
  } else {
    return (
      <MapView
        showsUserLocation
        style={{ width: 430, height: 400, marginTop: 10 }}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      >
        <Marker
          key={data._id}
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
          title={data.title}
          description={data.price + "$"}
        />
      </MapView>
    );
  }
}
