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
import { TouchableRipple } from "react-native-paper";
import Constants from "expo-constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Urls from "../../constant";

export default function Home(props) {
  //const data = props.route.params.data;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      style={styles.container}
    >
      <ImageBackground
        source={require("../../assets/img1.png")}
        style={styles.header}
      >
        <View style={styles.welcomeContainer}>
          <Icons
            name="menu"
            color="#ffffff"
            size={30}
            onPress={() => props.navigation.openDrawer()}
          />
          <Text style={styles.welcome}>Home</Text>
          <Icons
            name="bell-outline"
            style={{ marginLeft: 110 }}
            color="#ffffff"
            size={30}
          />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 75,
    width: "100%",
    borderBottomRightRadius: 20,
  },
  footer: {
    height: 75,
    width: "100%",
    borderBottomLeftRadius: 20,
    flexDirection: "column-reverse",
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
    marginLeft: 10,
    color: "white",
    width: 150,
  },
  welcomeContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
    height: 75,
    width: "100%",
    marginTop: 20,
    marginLeft: 15,
    paddingBottom: 10,
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