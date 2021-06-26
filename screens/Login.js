import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Button,
  Keyboard,
  Platform,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "@expo/vector-icons/AntDesign";
import Urls from "../constant";

export default function Login(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const signin = async () => {
    //console.log(email);
    fetch(Urls.cn + "/users/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then(async (result) => {
        console.log(result);
        if (result.message === "Auth successful") {
          Alert.alert("login successfull");
          try {
            await AsyncStorage.setItem("token", result.token);
            await AsyncStorage.setItem("br", result.br_number);
            await AsyncStorage.setItem("email", email);
            await AsyncStorage.setItem("name", result.name);
          } catch (e) {
            console.log(e);
          }

          props.navigation.push("Drawer");
          setEmail("");
          setPassword("");
        } else {
          Alert.alert("login unsuccessfull");
        }
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      style={styles.container}
    >
      <ImageBackground
        source={require("../assets/img1.png")}
        style={styles.header}
        imageStyle={{ borderBottomRightRadius: 65 }}
      >
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcome}>Welcome To,</Text>
          <Text style={styles.title}>STARTUP HUB</Text>
        </View>
      </ImageBackground>
      <Text style={styles.logintxt}>Login</Text>
      <View style={styles.inputContainer}>
        <Icons name="mail" color="#306bff" size={30} />
        <TextInput
          style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icons name="lock" color="#306bff" size={30} />
        <TextInput
          style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity
        style={[styles.inputContainer, styles.btn]}
        onPress={signin}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Log in
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.registerbtn, styles.inputContainer]}
        onPress={() => props.navigation.navigate("Register")}
      >
        <Text style={{ color: "#306bff", fontSize: 20, fontWeight: "bold" }}>
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
});
