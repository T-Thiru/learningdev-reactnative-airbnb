import { useNavigation } from "@react-navigation/core";
import { Button, Text, View } from "react-native";
import { useContext } from "react";

export default function HomeScreen({ user }) {
  const user = useContext(UserContext);
  const navigation = useNavigation();
  return (
    <View>
      <Text>Welcome home!</Text>
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: user.id });
        }}
      />
    </View>
  );
}
