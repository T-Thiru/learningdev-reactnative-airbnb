import { useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";
import { useContext } from "react";

export default function ProfileScreen({ user }) {
  // const user = useContext(UserContext);
  const { params } = useRoute();
  return (
    <View>
      <Text>user id : {user.id}</Text>
      <Text>Email : {user.email}</Text>
      <Text>Username : {user.username}</Text>
    </View>
  );
}
