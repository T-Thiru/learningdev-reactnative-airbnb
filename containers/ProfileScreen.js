import { useRoute } from "@react-navigation/core";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { TextInput } from "@react-native-material/core";
import { MaterialIcons } from "@expo/vector-icons";
import stylesSignUp from "../styles/styleSignIn";

export default function ProfileScreen() {
  const { params } = useRoute();
  const [isLoading, setIsLoading] = useState(true);

  // const [selectedPicture, setSelectedPicture] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const getPermissionAndGetPicture = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status === "granted") {
  //     //ouvrir la galerie photo
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       allowsEditing: true,
  //       aspect: [1, 1],
  //     });
  //     if (result.cancel === true) {
  //       alert("Pas de photo sélectionnée");
  //     } else {
  //       setSelectedPicture(result.assets[0].uri);
  //     }
  //   } else {
  //     alert("Permission refusée");
  //   }
  // };

  // const getPermissionAndTakePicture = async () => {
  //   const { status } = await ImagePicker.requestCameraPermissionsAsync();
  //   if (status === "granted") {
  //     //ouvrir l'appareil photo
  //     const result = await ImagePicker.launchCameraAsync();
  //     // console.log(result);
  //     setSelectedPicture(result.assets[0].uri);
  //   } else {
  //     alert("Permission refusée");
  //   }
  // };

  // const sendPicture = async () => {
  //   setIsLoading(true);

  //   const tab = selectedPicture.split(".");
  //   try {
  //     const formData = new FormData();
  //     formData.append("photo", {
  //       uri: selectedPicture,
  //       name: `my-pic.${tab[1]}`,
  //       type: `image/${tab[1]}`,
  //     });
  //     const response = await axios.post(
  //       "https://upload-file-server-with-js.herokuapp.com/upload",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         //Si vous avez des headers à transmettre c'est par ici !
  //         //headers: { Authorization: "Bearer " + userToken },
  //         //transformRequest: (formData) => formData,
  //       }
  //     );

  //     if (response.data) {
  //       setIsLoading(false);
  //       alert("Photo Envoyée !");
  //       console.log(response.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View style={{ marginHorizontal: 10, alignItems: "center" }}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <MaterialIcons name="account-circle" size={200} color="gray" />
        </View>
        <TextInput color="red" variant="standard" label="Email" />
        <TextInput color="red" variant="standard" label="Username" />
        <TextInput
          color="red"
          variant="standard"
          numberOfLines={5}
          label="Description"
        />

        <TouchableOpacity
          style={stylesSignUp.btn}
          disabled={isLoading}
          onPress={() => {}}
        >
          <Text style={stylesSignUp.txt}>UpDate</Text>
        </TouchableOpacity>
        {isLoading ? <ActivityIndicator size="large" color="red" /> : null}
        <TouchableOpacity
          style={stylesSignUp.btn}
          disabled={isLoading}
          onPress={() => {}}
        >
          <Text style={stylesSignUp.txt}>UpDate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
