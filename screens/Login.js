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
import Iconics from "react-native-vector-icons/MaterialCommunityIcons";
import Urls from "../constant";
import { SIZES, COLORS, icons } from "../constants";
import Input from "../components/Input";
//import { useSelector, useDispatch } from "react-redux";

export default function Login(props) {
  //const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [notvisible, setVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [emailvalid, setEmailvalid] = useState(true);
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
            await AsyncStorage.setItem("acctype", result.usertype);
            fetch(Urls.cn + "/company/" + result.br_number)
              .then((res) => res.json())
              .then(async (cmp) => {
                console.log(cmp);
                await AsyncStorage.setItem("type", cmp.type);
                await AsyncStorage.setItem("category", cmp.category);
                if (cmp.type === "product") {
                  props.navigation.navigate("PDrawer");
                  setEmail("");
                  setPassword("");
                } else if (cmp.type === "service") {
                  props.navigation.navigate("SDrawer");
                  setEmail("");
                  setPassword("");
                }
              });
            // dispatch({ type: "br", payload: result.br_number });
            // dispatch({ type: "email", payload: email });
            // dispatch({ type: "name", payload: result.name });
            // dispatch({ type: "set_loading", payload: false });
          } catch (e) {
            console.log(e);
          }
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
        source={require("../assets/login.png")}
        style={styles.header}
      >
        <View style={styles.welcomeContainer}></View>
      </ImageBackground>
      <Text style={styles.logintxt}>Login</Text>
      <View style={styles.inputContainer}>
        <Icons name="mail" color={COLORS.green} size={30} />
        <Input
          style={{ paddingHorizontal: 10, color: COLORS.green, fontSize: 20 }}
          placeholder="Email"
          value={email}
          pattern={"^[^@]+@[^@]+.[^@]+$"}
          onChangeText={(text) => setEmail(text)}
          onValidation={(isValid) => setEmailvalid(isValid)}
        />
      </View>
      <View style={{ marginHorizontal: 40, height: 10}}>
        {!emailvalid ? (
          <Text style={{ color: COLORS.red }}>Enter a valid email</Text>
        ) : (
          <Text></Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Icons name="lock" color={COLORS.green} size={30} />
        <TextInput
          style={{
            paddingHorizontal: 10,
            color: COLORS.green,
            fontSize: 20,
          }}
          placeholder="Password"
          value={password}
          secureTextEntry={notvisible}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={{ marginLeft: 250, top: 6, position: "absolute" }}
          onPress={() => setVisible(!notvisible)}
        >
          {notvisible ? (
            <Iconics name="eye-outline" color={COLORS.green} size={30} />
          ) : (
            <Iconics name="eye-off-outline" color={COLORS.green} size={30} />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.inputContainer2, styles.btn]}
        onPress={signin}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.registerbtn, styles.inputContainer2]}
        onPress={() => props.navigation.navigate("Register")}
      >
        <Text style={{ color: COLORS.green, fontSize: 20, fontWeight: "bold" }}>
          Register
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          marginTop: 10,
          alignItems: "center",
        }}
        onPress={() => props.navigation.navigate("Register")}
      >
        <Text style={{ color: COLORS.green, fontSize: 15 }}>
          Forgot Password
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    height: Keyboard.height,
    width: "100%",
    borderBottomRightRadius: 70,
  },
  title: {
    marginTop: 250,
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
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
    marginTop: 10,
  },
  logintxt: {
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 28,
    color: COLORS.green,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 35,
    borderWidth: 1,
    marginTop: 24,
    paddingHorizontal: 10,
    borderColor: COLORS.green,
    borderRadius: 15,
    paddingVertical: 2,
    height: 45,
  },
  inputContainer2: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 35,
    borderWidth: 2,
    marginTop: 24,
    paddingHorizontal: 10,
    borderColor: COLORS.green,
    borderRadius: 15,
    paddingVertical: 2,
    height: 45,
  },
  btn: {
    backgroundColor: COLORS.green,
    justifyContent: "center",
    marginTop: 40,
  },
  registerbtn: {
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
