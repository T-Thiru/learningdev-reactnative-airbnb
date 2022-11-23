import { useNavigation } from "@react-navigation/core";
import { Text, View } from "react-native";
import { useContext } from "react";
import { Button } from "@react-native-material/core";

export default function HomeScreen() {
  // const user = useContext(UserContext);
  const navigation = useNavigation();
  return (
    <View>
      <Text>Welcome home!</Text>
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: "1234" });
        }}
      />
    </View>
  );
}
