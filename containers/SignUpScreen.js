import {
  Button,
  Text,
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
import { Ionicons } from "@expo/vector-icons";
import { TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

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
  const [visiblePwd, setVisiblePwd] = useState(false);
  const [securePwd, setSecurePwd] = useState(true);
  const [visiblePwdConfirm, setVisiblePwdConfirm] = useState(false);
  const [securePwdConfirm, setSecurePwdConfirm] = useState(true);

  // const user = useContext(UserContext);

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
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
            color="red"
            variant="standard"
            style={[
              stylesSignUp.input,
              { backgroundColor: email ? "" : color },
            ]}
            label="Email"
            value={email}
            onChangeText={(email) => {
              setEmail(email);
            }}
          />
          <TextInput
            color="red"
            variant="standard"
            style={[
              stylesSignUp.input,
              { backgroundColor: username ? "" : color },
            ]}
            label="Username"
            value={username}
            onChangeText={(username) => {
              setUsername(username);
            }}
          />
          <TextInput
            color="red"
            variant="standard"
            style={stylesSignUp.inputMultiple}
            multiline
            numberOfLines={4}
            label="Describe yourself..."
            value={description}
            onChangeText={(description) => {
              setDescription(description);
            }}
            Up
          />
          <TextInput
            color="red"
            variant="standard"
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
            style={[
              stylesSignUp.input,
              { backgroundColor: password ? "" : color },
            ]}
            label="Password"
            secureTextEntry={securePwd}
            value={password}
            onChangeText={(password) => {
              setPassword(password);
            }}
          />
          <TextInput
            trailing={(props) => (
              <IconButton
                onPress={() => {
                  setVisiblePwdConfirm(!visiblePwdConfirm);
                  setSecurePwdConfirm(!securePwdConfirm);
                }}
                icon={(props) => (
                  <Icon
                    name={visiblePwdConfirm ? "eye-off" : "eye"}
                    {...props}
                  />
                )}
                {...props}
              />
            )}
            color="red"
            variant="standard"
            style={[
              stylesSignUp.input,
              { backgroundColor: confirmPwd ? "" : color },
            ]}
            label="Confirm Password"
            secureTextEntry={securePwdConfirm}
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
