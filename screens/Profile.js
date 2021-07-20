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
  Button,
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

export default function Home(props) {
  //const data = props.route.params.data;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [br, setBr] = useState("");
  const [cmpcategory, setCategory] = useState("");
  const [img, setimg] = useState("");
  const [address, setAddress] = useState("");
  const [NIC, setNIC] = useState("");
  const [mobile, setMobile] = useState("");
  const [accountType, setAcc] = useState("");
  const [data, setData] = useState("");
  const [loading, setloading] = useState(true);
  const [modal, setmodal] = useState(null);
  const getData = async () => {
    const email = await AsyncStorage.getItem("email");
    const name = await AsyncStorage.getItem("name");
    const br = await AsyncStorage.getItem("br");
    const cmp = await AsyncStorage.getItem("category");
    console.log(email);
    setEmail(email);
    setBr(br);
    setCategory(cmp);
    setName(name);
    fetch(Urls.cn + "/users/" + email)
      .then((res) => res.json())
      .then((result) => {
        setData(result[0]);
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
                <Text
                  style={{ color: COLORS.white, marginLeft: 10, fontSize: 25 }}
                >
                  Profile
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
              <Image style={styles.image} source={{ uri: data.img }} />
              <Text style={{ fontSize: 30, color: COLORS.white }}>
                {data.name}
              </Text>
              <Text style={{ fontSize: 20, color: COLORS.white }}>
                {data.accountType}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: SIZES.base * 2,
                marginHorizontal: SIZES.base,
              }}
            >
              <Text style={{ color: COLORS.primary, fontSize: 23 }}>
                {data.email}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: SIZES.base * 2,
                marginHorizontal: SIZES.base,
              }}
            >
              <Text style={{ color: COLORS.primary, fontSize: 23 }}>
                {data.NIC}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: SIZES.base * 2,
                marginHorizontal: SIZES.base,
              }}
            >
              <Text style={{ color: COLORS.primary, fontSize: 23 }}>
                {data.mobile === "" ? "not set" : data.mobile}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: SIZES.base * 2,
                marginHorizontal: SIZES.base,
              }}
            >
              <Text style={{ color: COLORS.primary, fontSize: 23 }}>
                {data.Address === "" ? "not set" : data.Address}
              </Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity
                style={[
                  styles.inputContainer,
                  styles.btn,
                  {
                    backgroundColor: COLORS.darkGreen,
                    borderColor: COLORS.darkGreen,
                  },
                ]}
                onPress={() =>
                  props.navigation.navigate("updateProfile", {
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
                    backgroundColor: COLORS.red,
                    borderColor: COLORS.red,
                  },
                ]}
                onPress={() => setmodal(true)}
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  Reset Password
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => setmodal(false)}
          >
            <View style={styles.modalview}>
              <View
                style={[
                  styles.inputContainer,
                  { right: 0, marginHorizontal: 20, borderColor: COLORS.black },
                ]}
              >
                <TextInput
                  style={{
                    paddingHorizontal: 10,
                    color: COLORS.black,
                    fontSize: 20,
                  }}
                  placeholder="Current Password"
                  placeholderTextColor={COLORS.primary}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
              <TouchableOpacity
                style={[
                  styles.inputContainer,
                  { right: 0, marginHorizontal: 20, borderColor: COLORS.black },
                ]}
                onPress={() => setmodal(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
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
    backgroundColor: COLORS.secondary,
  },
  imageContainer: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 23,
    height: 250,
    width: "100%",
  },
  image: {
    marginHorizontal: 0,
    borderRadius: 90,
    height: 180,
    width: 180,
    resizeMode: "contain",
  },
  btn: {
    backgroundColor: COLORS.lightGreen2,
    justifyContent: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    marginTop: 18,
    paddingHorizontal: 20,
    borderColor: COLORS.lightGreen2,
    borderRadius: 23,
    right: 85,
    paddingVertical: 2,
    height: 45,
  },
  buttonview: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  modalview: {
    position: "absolute",
    bottom: 2,
    paddingBottom: 10,
    paddingTop: 10,
    width: "100%",
    backgroundColor: COLORS.lightGray3,
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
  },
});
