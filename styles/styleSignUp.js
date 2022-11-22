import { StyleSheet } from "react-native";

const stylesSignUp = StyleSheet.create({
  containerLogo: {
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },

  input: {
    borderBottomColor: "red",
    borderBottomWidth: 2,
    height: 50,
    marginHorizontal: 30,
    marginVertical: 15,
  },

  inputMultiple: {
    height: 80,
    borderColor: "red",
    borderWidth: 2,
    marginHorizontal: 30,
    marginVertical: 20,
  },

  txt: {
    fontSize: 20,
    fontWeight: "bold",
  },

  containerBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  btn: {
    height: 60,
    width: 250,
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 30,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  error: {
    marginHorizontal: 30,
    color: "red",
  },
});

export default stylesSignUp;
