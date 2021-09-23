import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  TextInput,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SIZES, COLORS, icons } from "../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Urls from "../constant";

export default function Business_Profile(props) {
  //const data = props.route.params.data;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [br, setBr] = useState("");
  const [cmpcategory, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData] = useState("");
  const [loading, setloading] = useState(true);
  const [annualPaid, setannualPaid] = useState(false);

  const getData = async () => {
    const email = await AsyncStorage.getItem("email");
    const name = await AsyncStorage.getItem("name");
    const br = await AsyncStorage.getItem("br");
    const cmp = await AsyncStorage.getItem("category");
    const d = new Date();
    const yr = d.getFullYear();
    console.log(email);
    setEmail(email);
    setBr(br);
    setCategory(cmp);
    setName(name);
    fetch(Urls.cn + "/company/" + br)
      .then((res) => res.json())
      .then((result) => {
        console.log(result.location);
        setData(result);
        setLocation(result.location);
      });
    fetch(Urls.cn + "/annualfee/yearbr/" + yr + "/" + br)
      .then((res) => res.json())
      .then((result) => {
        if (result.length > 0) {
          setannualPaid(true);
        }
      });
  };

  useEffect(() => {
    getData();
    setloading(false);
    //console.log(data[0]);
  }, []);

  return (
    <View
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      style={styles.container}
    >
      {!loading ? (
        <>
          <SafeAreaView
            style={{
              height: 100,
              width: "100%",
              backgroundColor: COLORS.green,
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
                  size={25}
                  onPress={() => props.navigation.openDrawer()}
                />
                <Text
                  style={{ color: COLORS.white, marginLeft: 10, fontSize: 23 }}
                >
                  Business Profile
                </Text>
              </View>
            </View>
          </SafeAreaView>
          <ScrollView
            style={styles.scrollcontainer}
            refreshControl={
              <RefreshControl
                onRefresh={() => getData()}
                refreshing={loading}
              />
            }
          >
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: data.image }} />
              <Text
                style={{ fontSize: 25, fontWeight: "700", color: COLORS.green }}
              >
                {data.company_name}
              </Text>
              <Text
                style={{ fontSize: 20, fontWeight: "600", color: COLORS.green }}
              >
                {data.category}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: SIZES.base * 2,
                marginHorizontal: SIZES.base * 2,
              }}
            >
              <Text style={{ color: COLORS.black, fontSize: 20 }}>Email</Text>
              <Text style={{ color: COLORS.green, fontSize: 20 }}>
                {data.email}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: SIZES.base * 2,
                marginHorizontal: SIZES.base * 2,
              }}
            >
              <Text style={{ color: COLORS.black, fontSize: 20 }}>
                Br Number
              </Text>
              <Text style={{ color: COLORS.green, fontSize: 20 }}>
                {data.br_number}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: SIZES.base * 2,
                marginHorizontal: SIZES.base * 2,
              }}
            >
              <Text style={{ color: COLORS.black, fontSize: 20 }}>Phone</Text>
              <Text style={{ color: COLORS.green, fontSize: 20 }}>
                {data.contact === "" ? "not set" : data.contact}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: SIZES.base * 2,
                marginHorizontal: SIZES.base * 2,
              }}
            >
              <Text style={{ color: COLORS.black, fontSize: 20 }}>Address</Text>
              <Text style={{ color: COLORS.green, fontSize: 20 }}>
                {data.address === "" ? "not set" : data.address}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: SIZES.base * 2,
                marginHorizontal: SIZES.base * 2,
              }}
            >
              <Text style={{ color: COLORS.black, fontSize: 20 }}>
                Location
              </Text>
              <Text style={{ color: COLORS.green, fontSize: 20 }}>
                {location.lat === null ? "not set" : "set"}
              </Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity
                style={[
                  styles.inputContainer,
                  styles.btn,
                  {
                    backgroundColor: COLORS.green,
                    borderColor: COLORS.green,
                  },
                ]}
                onPress={() =>
                  props.navigation.navigate("Business_Profile_Update", {
                    data,
                  })
                }
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.inputContainer,
                  styles.btn,
                  {
                    backgroundColor: COLORS.primary,
                    borderColor: COLORS.primary,
                  },
                ]}
                onPress={() =>
                  props.navigation.navigate("Map", {
                    data,
                  })
                }
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  Set Location
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.inputContainer,
                  styles.btn,
                  {
                    backgroundColor: COLORS.red,
                    borderColor: COLORS.red,
                  },
                ]}
                onPress={() => {
                  annualPaid
                    ? Alert.alert("Already Paid")
                    : props.navigation.navigate("StripeApp", {
                        data,
                      });
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  Pay Annual Fee
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
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
  imageContainer: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 23,
    height: 200,
    width: "100%",
  },
  image: {
    marginHorizontal: 0,
    height: 160,
    width: "80%",
    borderBottomLeftRadius: 23,
    borderBottomRightRadius: 23,
  },
  btn: {
    backgroundColor: COLORS.green,
    justifyContent: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    marginTop: 18,
    paddingHorizontal: 20,
    borderColor: COLORS.green,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    right: 85,
    paddingVertical: 2,
    height: 45,
  },
  buttonview: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  modalview: {
    position: "absolute",
    bottom: 2,
    paddingBottom: 10,
    paddingTop: 10,
    width: "100%",
    backgroundColor: COLORS.lightGreen3,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  inputContainer2: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 35,
    borderWidth: 2,
    marginTop: 24,
    paddingHorizontal: 10,
    borderColor: COLORS.green,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingVertical: 2,
    height: 45,
  },
});
