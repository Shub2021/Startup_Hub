import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Button,
  Keyboard,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// import { TouchableRipple } from "react-native-paper";
// import Constants from "expo-constants";
import { SIZES, COLORS, icons } from "../../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Urls from "../../constant";

export default function serviceHome(props) {
  //const data = props.route.params.data;

  return (
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
            <Text style={{ color: COLORS.white, marginLeft: 20,marginTop: -5, fontSize: 25 }}>
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
        <View>
        <ImageBackground
          source={require("../../assets/logo.png")}
          style={{height:200,flex:1,justifyContent:"center",opacity:0.4,alignContent:"center",width: 400,marginTop:230}}
       // imageStyle={{ borderBottomRightRadius: 65 }}
        >
        </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollcontainer: {
    flex: 1,
    marginTop: -22,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    backgroundColor: COLORS.white,
  },
});
