import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import stylesSignUp from "../styles/styleSignUp";
import axios from "axios";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [description, setDescription] = useState();
  const [password, setPassword] = useState();
  const [confirmPwd, setConfirmPwd] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignUp = async () => {
    try {
      const data = {
        email,
        username,
        description,
        password,
      };

      const signUp = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/sign_up",
        data
      );
      console.log(Object.values(signUp));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      <View style={stylesSignUp.containerLogo}>
        <Image
          style={stylesSignUp.logo}
          source={require("../assets/logo.png")}
          resizeMode="contain"
        />
      </View>
      <View>
        <TextInput
          style={stylesSignUp.input}
          placeholder="Email"
          value={email}
          onChange={(email) => {
            setEmail(email);
          }}
        />
        <TextInput
          style={stylesSignUp.input}
          placeholder="Username"
          value={username}
          onChange={(username) => {
            setUsername(username);
          }}
        />
        <TextInput
          style={stylesSignUp.inputMultiple}
          multiline
          numberOfLines={4}
          placeholder="Describe yourself..."
          value={description}
          onChange={(description) => {
            setDescription(description);
          }}
          Up
        />
        <TextInput
          style={stylesSignUp.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => {
            setPassword(password);
          }}
        />
        <TextInput
          style={stylesSignUp.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPwd}
          onChangeText={(confirmPwd) => {
            setConfirmPwd(confirmPwd);
          }}
        />
        {errorMsg ? <Text style={stylesSignUp.error}>{errorMsg}</Text> : null}

        <View style={stylesSignUp.containerBtn}>
          <TouchableOpacity
            style={stylesSignUp.btn}
            onPress={() => {
              if (password === confirmPwd) {
                handleSignUp();
              } else {
                setErrorMsg("les mots de pass ne sont pas identiques");
              }
            }}
          >
            <Text style={stylesSignUp.txt}>Log In</Text>
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
