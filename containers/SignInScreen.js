import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import {
  Button,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import stylesSignIn from "../styles/styleSignIn";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function SignInScreen({ setToken, setUser }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [color, setColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePwd, setVisiblePwd] = useState(false);
  const [securePwd, setSecurePwd] = useState(true);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const data = {
        email,
        password,
      };

      const signIn = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        data
      );
      // console.log(signIn.data);
      setUser(signIn.data);
      setToken(signIn.data.token);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 401)
        setErrorMsg("identifiant ou mpd incorrect");

      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView>
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
            variant="standard"
            color="red"
            autoCapitalize={"none"}
            style={[
              stylesSignIn.input,
              { backgroundColor: email ? "" : color },
            ]}
            placeholder="Email"
            value={email}
            onChangeText={(email) => {
              setEmail(email);
            }}
          />

          <TextInput
            trailing={(props) => (
              <IconButton
                onPress={() => {
                  setVisiblePwd(!visiblePwd);
                  setSecurePwd(!securePwd);
                }}
                icon={(props) => (
                  <Icon name={visiblePwd ? "eye-off" : "eye"} {...props} />
                )}
                {...props}
              />
            )}
            variant="standard"
            color="red"
            style={[
              stylesSignIn.input,
              { backgroundColor: password ? "" : color },
            ]}
            placeholder="Password"
            secureTextEntry={securePwd}
            value={password}
            onChangeText={(password) => {
              setPassword(password);
            }}
          />
          {errorMsg ? <Text style={stylesSignIn.error}>{errorMsg}</Text> : null}
          <View style={stylesSignIn.containerBtn}>
            <TouchableOpacity
              disabled={isLoading}
              style={stylesSignIn.btn}
              onPress={() => {
                if (password && email) {
                  handleSignIn();
                } else {
                  setColor("#F1D5D5");
                  setErrorMsg("veuillez remplir les champs obligatoires");
                }
              }}
            >
              <Text style={stylesSignIn.txt}>Log In</Text>
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
