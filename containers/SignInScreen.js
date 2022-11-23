import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import stylesSignIn from "../styles/styleSignIn";

export default function SignInScreen({ setToken, setUser }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState();

  const handleSignIn = async () => {
    try {
      const data = {
        email,
        password,
      };

      const signIn = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        data
      );
      console.log(signIn.data);
      setUser(signIn.data);
      setToken(signUp.data.token);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      <View style={stylesSignIn.containerLogo}>
        <Image
          style={stylesSignIn.logo}
          source={require("../assets/logo.png")}
          resizeMode="center"
        />
      </View>
      <View>
        <TextInput
          style={stylesSignIn.input}
          placeholder="Email"
          value={email}
          onChange={(email) => {
            setEmail(email);
          }}
        />

        <TextInput
          style={stylesSignIn.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => {
            setPassword(password);
          }}
        />
        <View style={stylesSignIn.containerBtn}>
          <TouchableOpacity
            style={stylesSignIn.btn}
            onPress={async () => {
              const userToken = "secret-token";
              setToken(userToken);
            }}
          >
            <Text style={stylesSignIn.txt}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>No account? Register now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
