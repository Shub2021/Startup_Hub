import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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

export default function Register(props) {
  const [company_name, setCName] = useState("");
  const [admin, setAdmin] = useState("");
  const [contact, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [br_number, setBr] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  const abortController = new AbortController();

  const submitData = () => {
    if (password == repassword) {
      fetch(Urls.cn + "/company", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name,
          name: admin,
          contact,
          email,
          address,
          br_number,
          type,
          category,
          password,
        }),
      });
      fetch(Urls.cn + "/users/signup", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          br_number,
          email,
          name: admin,
          password,
        }),
      });

      Alert.alert("Registered Successfully");
      props.navigation.navigate("Login");
    } else {
      Alert.alert("Password and re entered passwors does not match");
    }
    abortController.abort();
  };

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
              onPress={() => props.navigation.navigate("Login")}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Register</Text>
        </View>
      </ImageBackground>
      <ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Company Name"
            value={company_name}
            onChangeText={(text) => setCName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Contact Person"
            value={admin}
            onChangeText={(text) => setAdmin(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Contact Number"
            keyboardType="number-pad"
            value={contact}
            onChangeText={(text) => setPhone(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Business Registration Number"
            value={br_number}
            onChangeText={(text) => setBr(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={type}
            style={{ paddingLeft: 280, color: "#306bff", fontSize: 20 }}
            onValueChange={(itemValue) => setType(itemValue)}
          >
            <Picker.Item label="Product" value="product" />
            <Picker.Item label="Service" value="service" />
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          {type == "product" ? (
            <Picker
              selectedValue={category}
              style={{ paddingLeft: 280, color: "#306bff", fontSize: 20 }}
              onValueChange={(itemValue) => setCategory(itemValue)}
            >
              <Picker.Item label="Apparrel" value="apparel" />
              <Picker.Item label="Healthcare" value="helthcare" />
              <Picker.Item label="Household" value="household" />
              <Picker.Item label="Foods & Beverages" value="foods & everages" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          ) : (
            <Picker
              selectedValue={category}
              style={{ paddingLeft: 280, color: "#306bff", fontSize: 20 }}
              onValueChange={(itemValue) => setCategory(itemValue)}
            >
              <Picker.Item label="Design" value="design" />
              <Picker.Item label="Marketing & Sales" value="marketing" />
              <Picker.Item label="Education" value="education" />
              <Picker.Item label="Helthcare" value="helthcare" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Re Enter Password"
            value={repassword}
            onChangeText={(text) => setRePassword(text)}
          />
        </View>
        <TouchableOpacity
          style={[styles.inputContainer, styles.btn]}
          onPress={submitData}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Register
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
