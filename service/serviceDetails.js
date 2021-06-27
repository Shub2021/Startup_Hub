import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Header,
  KeyboardAvoidingView,
  Button,
  Keyboard,
  Platform,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import Constants from "expo-constants";
import Icons from "@expo/vector-icons/AntDesign";
import { AntDesign,Feather } from '@expo/vector-icons'; 
import { Appbar, FAB } from "react-native-paper";
import { Value } from "react-native-reanimated";


  export default function serviceDetails(props) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
       
       <View style={styles.labelContainer}>
          <Text
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 18 }} 
          >Service Type</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }} 
          >Document analasis</Text>
        </View>

        <View style={styles.labelContainer}>
          <Text
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 18 }} 
          >Service Type</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }} 
          >Document analasis</Text>
        </View>

        <View style={styles.labelContainer}>
          <Text
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 18 }} 
          >Service Type</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }} 
          >Document analasis</Text>
        </View>
       
        <FAB
        style={styles.fab}
        small={false}
        icon="plus"
        onPress={() => props.navigation.navigate("addService")}
      />
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
      borderBottomWidth: 2,
      marginTop: 10,
      paddingHorizontal: 10,
      borderColor: "#306bff",
      borderRadius: 23,
      paddingVertical: 2,
      height: 45,
    },
    labelContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 44,
      paddingHorizontal: 10,
      borderColor: "#306bff",
     
      height: 10,
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
    fab: {
      position: "absolute",
      backgroundColor: "#4636ff",
      marginBottom: 20,
      marginRight: 20,
      right: 0,
      bottom: 0,
    },
  });
