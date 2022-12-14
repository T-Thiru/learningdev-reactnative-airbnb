import { Button, Text, View } from "react-native";

export default function SettingsScreen({ setToken, setUser }) {
  return (
    <View>
      <Text>Hello Settings</Text>

      <Button
        title="Log Out"
        onPress={() => {
          setUser(null);
          setToken(null);
        }}
      />
    </View>
  );
}
