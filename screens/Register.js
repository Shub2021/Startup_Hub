import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Header,
  KeyboardAvoidingView,
  Button,
  Keyboard,
  Platform,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import Icons from "@expo/vector-icons/AntDesign";
import { Appbar } from "react-native-paper";

export default function Register(props) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Appbar.Header style={{ top: -10 }}>
        <Appbar.BackAction onPress={() => props.navigation.navigate("Login")} />
        <Appbar.Content title={"Register"} />
      </Appbar.Header>

      <View style={styles.inputContainer}>
        <TextInput
          style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
          placeholder="Name"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
          placeholder="Email"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
          placeholder="Contact Number"
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
          placeholder="Username"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
          placeholder="Password"
        />
      </View>
      <TouchableOpacity style={[styles.inputContainer, styles.btn]}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Register
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: Keyboard.height,
    width: "100%",
    borderBottomRightRadius: 70,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  welcome: {
    fontSize: 25,
    marginBottom: 15,
    fontWeight: "bold",
    color: "white",
  },
  welcomeContainer: {
    justifyContent: "center",
    height: 250,
    width: "100%",
    marginLeft: 10,
  },
  logintxt: {
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 28,
    color: "#1255ff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 35,
    borderWidth: 2,
    marginTop: 24,
    paddingHorizontal: 10,
    borderColor: "#306bff",
    borderRadius: 23,
    paddingVertical: 2,
    height: 45,
  },
  btn: {
    backgroundColor: "#306bff",
    justifyContent: "center",
    marginTop: 40,
  },
  registerbtn: {
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  apbar: {
    height: 40,
  },
});
