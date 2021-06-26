import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Header,
  KeyboardAvoidingView,
  Button,
  Keyboard,
  Alert,
  Platform,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Picker,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Urls from "../constant";

const auth = require("../Contolers/Authentication.js");

export default function AddProduct(props) {
  const [product_name, setPname] = useState("");
  const [picture, setPicture] = useState("");
  const [unitprice, setUprice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [br_number, setBr] = useState("");

  const submitData = () => {};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ImageBackground
        source={require("../assets/img1.png")}
        style={styles.header}
        imageStyle={{ borderBottomRightRadius: 30 }}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <Ionicons
              name="arrow-back"
              size={28}
              color="white"
              onPress={() => props.navigation.navigate("Products")}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Add Product</Text>
        </View>
      </ImageBackground>
      <ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Product Name"
            value={product_name}
            onChangeText={(text) => setPname(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Unit Price"
            value={unitprice}
            onChangeText={(text) => setUprice(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Quantity"
            keyboardType="number-pad"
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Description"
            value={description}
            onChangeText={(text) => setPhone(text)}
          />
        </View>

        <TouchableOpacity
          style={[styles.inputContainer, styles.btn]}
          onPress={submitData}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Create
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 70,
    width: "100%",
    borderBottomRightRadius: 70,
    borderBottomLeftRadius: 70,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  headerContainer: {
    height: 70,
    width: "100%",
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
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
    marginBottom: 10,
  },
  registerbtn: {
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
