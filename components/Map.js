import { View, Text } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

export default function Map({ data }) {
  const navigation = useNavigation();

  if (data.length > 0) {
    return (
      <MapView
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
              title={position.title}
              description={position.price + "$"}
              onCalloutPress={() => {
                navigation.navigate("Room", { id: position._id });
              }}
            />
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
