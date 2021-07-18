import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
<<<<<<< HEAD
=======
  SafeAreaView,
>>>>>>> sajith
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
<<<<<<< HEAD
} from "react-native";
import { TouchableRipple } from "react-native-paper";
import Constants from "expo-constants";
=======
  ScrollView,
} from "react-native";
// import { TouchableRipple } from "react-native-paper";
// import Constants from "expo-constants";
import { SIZES, COLORS, icons } from "../../constants";
>>>>>>> sajith
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Urls from "../../constant";

export default function serviceHome(props) {
  //const data = props.route.params.data;

  return (
<<<<<<< HEAD
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
=======
    <View
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      style={styles.container}
    >
      <SafeAreaView
        style={{
          height: 100,
          width: "100%",
          backgroundColor: COLORS.darkGreen,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", padding: SIZES.padding }}>
            <Icons
              name="menu"
              color="#ffffff"
              size={30}
              onPress={() => props.navigation.openDrawer()}
            />
            <Text style={{ color: COLORS.white, marginLeft: 10, fontSize: 25 }}>
              Home
            </Text>
          </View>
          <View>
            <Icons
              name="bell-outline"
              style={{ padding: SIZES.padding }}
              color="#ffffff"
              size={30}
            />
          </View>
        </View>
      </SafeAreaView>
      <ScrollView style={styles.scrollcontainer}>
        <View></View>
      </ScrollView>
    </View>
>>>>>>> sajith
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
<<<<<<< HEAD
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
=======
  scrollcontainer: {
    flex: 1,
    marginTop: -22,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    backgroundColor: COLORS.secondary,
>>>>>>> sajith
  },
});
