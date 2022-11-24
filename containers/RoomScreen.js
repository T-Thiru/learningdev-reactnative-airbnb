import { View, Text, FlatList, Image, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import React from "react";

export default function RoomScreen() {
  const { params } = useRoute();
  //   console.log(params.item);
  return (
    <View>
      <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
        <FlatList
          scrollEnabled={true}
          style={{ flexDirection: "row" }}
          data={params.item.photos}
          keyExtractor={(item) => item.picture_id}
          renderItem={({ item }) => {
            return (
              <Image
                source={{
                  uri: item.url,
                }}
                resizeMode="center, cover"
                style={{ width: 430, height: 250 }}
              />
            );
          }}
        />
      </ScrollView>
    </View>
  );
}
