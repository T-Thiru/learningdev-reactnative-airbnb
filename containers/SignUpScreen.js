import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import stylesSignUp from "../styles/styleSignUp";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen({ setToken, setUser }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [errorMsg, setErrorMsg] = useState();
  const [color, setColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const user = useContext(UserContext);

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
      // console.log(signUp.data);
      setUser(signUp.data);
      setToken(signUp.data.token);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <KeyboardAwareScrollView>
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
            style={[
              stylesSignUp.input,
              { backgroundColor: email ? "" : color },
            ]}
            placeholder="Email"
            value={email}
            onChangeText={(email) => {
              setEmail(email);
            }}
          />
          <TextInput
            style={[
              stylesSignUp.input,
              { backgroundColor: username ? "" : color },
            ]}
            placeholder="Username"
            value={username}
            onChangeText={(username) => {
              setUsername(username);
            }}
          />
          <TextInput
            style={stylesSignUp.inputMultiple}
            multiline
            numberOfLines={4}
            placeholder="Describe yourself..."
            value={description}
            onChangeText={(description) => {
              setDescription(description);
            }}
            Up
          />
          <TextInput
            style={[
              stylesSignUp.input,
              { backgroundColor: password ? "" : color },
            ]}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => {
              setPassword(password);
            }}
          />
          <TextInput
            style={[
              stylesSignUp.input,
              { backgroundColor: confirmPwd ? "" : color },
            ]}
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
              disabled={isLoading}
              style={stylesSignUp.btn}
              onPress={() => {
                if (password === confirmPwd && email && username) {
                  handleSignUp();
                } else if (password !== confirmPwd) {
                  setErrorMsg("les mots de pass ne sont pas identiques");
                } else if (!email || !username || !password || !confirmPwd) {
                  setColor("#F1D5D5");
                  setErrorMsg("veuillez remplir les champs obligatoires");
                }
              }}
            >
              <Text style={stylesSignUp.txt}>Log In</Text>
            </TouchableOpacity>
            {isLoading ? <ActivityIndicator size="large" color="red" /> : null}
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
    </KeyboardAwareScrollView>
  );
}
