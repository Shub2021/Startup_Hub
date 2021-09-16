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
import { SIZES, COLORS, icons } from "../constants";
import Input from "../components/Input";

export default function Register(props) {
  const [company_name, setCName] = useState("");
  const [company_namevalid, setCNamevalid] = useState(false);
  const [admin, setAdmin] = useState("");
  const [adminvalid, setAdminvalid] = useState(false);
  const [contact, setPhone] = useState("");
  const [contactvalid, setPhonevalid] = useState(false);
  const [email, setEmail] = useState("");
  const [emailvalid, setEmailvalid] = useState(true);
  const [address, setAddress] = useState("");
  const [addressvalid, setAddressvalid] = useState(false);
  const [br_number, setBr] = useState("");
  const [br_numbervalid, setBrvalid] = useState(false);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [password, setPassword] = useState("");
  const [passwordvalid, setPasswordvalid] = useState(false);
  const [repassword, setRePassword] = useState("");
  const [repasswordvalid, setRePasswordvalid] = useState(false);

  const abortController = new AbortController();

  const submitData = () => {
    if (
      adminvalid &&
      company_namevalid &&
      contactvalid &&
      emailvalid &&
      addressvalid &&
      br_numbervalid &&
      passwordvalid &&
      repasswordvalid
    ) {
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
            accountType: "admin",
          }),
        });

        Alert.alert("Registered Successfully");
        props.navigation.navigate("Login");
      } else {
        Alert.alert("Password and re entered passwors does not match");
      }
    } else {
      Alert.alert("Please fill the required feilds");
    }
    abortController.abort();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ImageBackground
        source={require("../assets/logo1.png")}
        style={styles.header}
        imageStyle={{ borderBottomRightRadius: 10 }}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <Ionicons
              name="arrow-back"
              size={28}
              color="#0E357A"
              onPress={() => props.navigation.navigate("Login")}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Register Your startups</Text>
        </View>
        
      </ImageBackground>
      
      <ScrollView>
        <View style={styles.inputContainer}>
          <Input
            style={{ paddingHorizontal: 10, color: "#0E357A", fontSize: 20 }}
            placeholder="Company Name"
            pattern={"[^s]"}
            onValidation={(isValid) => setCNamevalid(isValid)}
            value={company_name}
            onChangeText={(text) => setCName(text)}
          />
        </View>
        <View style={{ marginHorizontal: 40, height: 10 }}>
          {!company_namevalid ? (
            <Text style={{ color: COLORS.red }}>Required</Text>
          ) : (
            <Text></Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Input
            style={{ paddingHorizontal: 10, color: "#0E357A", fontSize: 20 }}
            placeholder="Contact Person"
            value={admin}
            pattern={"[^s]"}
            onValidation={(isValid) => setAdminvalid(isValid)}
            onChangeText={(text) => setAdmin(text)}
          />
        </View>
        <View style={{ marginHorizontal: 40, height: 10 }}>
          {!adminvalid ? (
            <Text style={{ color: COLORS.red }}>Required</Text>
          ) : (
            <Text></Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Input
            style={{ paddingHorizontal: 10, color: "#0E357A", fontSize: 20 }}
            placeholder="Email"
            pattern={"^[^@]+@[^@]+.[^@]+$"}
            onValidation={(isValid) => setEmailvalid(isValid)}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={{ marginHorizontal: 40, height: 10 }}>
          {!emailvalid ? (
            <Text style={{ color: COLORS.red }}>Enter a valid email</Text>
          ) : email === "" ? (
            <Text style={{ color: COLORS.red }}>Required</Text>
          ) : (
            <Text style={{ color: COLORS.red }}></Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Input
            style={{ paddingHorizontal: 10, color: "#0E357A", fontSize: 20 }}
            placeholder="Contact Number"
            keyboardType="number-pad"
            value={contact}
            pattern={"^0[0-9]{9}$"}
            onValidation={(isValid) => setPhonevalid(isValid)}
            onChangeText={(text) => setPhone(text)}
          />
        </View>
        <View style={{ marginHorizontal: 40, height: 10 }}>
          {contact === "" ? (
            <Text style={{ color: COLORS.red }}>Required</Text>
          ) : !contactvalid ? (
            <Text style={{ color: COLORS.red }}>
              Enter a valid Contact Number
            </Text>
          ) : (
            <Text style={{ color: COLORS.red }}></Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Input
            style={{ paddingHorizontal: 10, color: "#0E357A", fontSize: 20 }}
            placeholder="Address"
            value={address}
            pattern={"[^s]"}
            onValidation={(isValid) => setAddressvalid(isValid)}
            onChangeText={(text) => setAddress(text)}
          />
        </View>
        <View style={{ marginHorizontal: 40, height: 10 }}>
          {!addressvalid ? (
            <Text style={{ color: COLORS.red }}>Required</Text>
          ) : (
            <Text></Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Input
            style={{ paddingHorizontal: 10, color: "#0E357A", fontSize: 20 }}
            placeholder="Business Registration Number"
            value={br_number}
            keyboardType="number-pad"
            pattern={"^[0-9]{5}$"}
            onValidation={(isValid) => setBrvalid(isValid)}
            onChangeText={(text) => setBr(text)}
          />
        </View>
        <View style={{ marginHorizontal: 40, height: 10 }}>
          {br_number === "" ? (
            <Text style={{ color: COLORS.red }}>Required</Text>
          ) : !br_numbervalid ? (
            <Text style={{ color: COLORS.red }}>Enter a valid Br Number</Text>
          ) : (
            <Text style={{ color: COLORS.red }}></Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={type}
            style={{ paddingLeft: 280, color: "#0E357A", fontSize: 20 }}
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
              style={{ paddingLeft: 280, color: "#0E357A", fontSize: 20 }}
              onValueChange={(itemValue) => setCategory(itemValue)}
            >
              <Picker.Item label="Apparel" value="Apparel" />
              <Picker.Item label="Healthcare" value="Helthcare" />
              <Picker.Item label="Household" value="Household" />
              <Picker.Item label="Cosmetics" value="Cosmetics" />
              <Picker.Item label="Foods & Beverages" value="Food & Bev" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          ) : (
            <Picker
              selectedValue={category}
              style={{ paddingLeft: 280, color: "#0E357A", fontSize: 20 }}
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
          <Input
            style={{ paddingHorizontal: 10, color: "#0E357A", fontSize: 20 }}
            placeholder="Password"
            value={password}
            pattern={"^[a-zA-Z0-9]{8,}$"}
            onValidation={(isValid) => setPasswordvalid(isValid)}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={{ marginHorizontal: 40, height: 10 }}>
          {password === "" ? (
            <Text style={{ color: COLORS.red }}>Required</Text>
          ) : !passwordvalid ? (
            <Text style={{ color: COLORS.red }}>
              Password must contain at least 8 characters
            </Text>
          ) : (
            <Text style={{ color: COLORS.red }}></Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Input
            style={{ paddingHorizontal: 10, color: "#0E357A", fontSize: 20 }}
            placeholder="Re Enter Password"
            value={repassword}
            pattern={password}
            onValidation={(isValid) => setRePasswordvalid(isValid)}
            onChangeText={(text) => setRePassword(text)}
          />
        </View>
        <View style={{ marginHorizontal: 40, height: 10 }}>
          {repassword === "" ? (
            <Text style={{ color: COLORS.red }}>Required</Text>
          ) : !repasswordvalid ? (
            <Text style={{ color: COLORS.red }}>Not matching</Text>
          ) : (
            <Text style={{ color: COLORS.red }}></Text>
          )}
        </View>
        <TouchableOpacity
          style={[styles.inputContainer, styles.btn]}
          onPress={submitData}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            SIGNUP
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
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    alignSelf: "center",
    color: "#0E357A",
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
    borderWidth: 1.5,
    marginTop: 24,
    paddingHorizontal: 10,
    borderColor: "#0E357A",
    borderRadius: 15,
    paddingVertical: 2,
    height: 45,
  },
  btn: {
    backgroundColor: "#0E357A",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  registerbtn: {
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
