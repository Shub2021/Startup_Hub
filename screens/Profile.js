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
import Input from "../components/Input";

import Urls from "../constant";

export default function Profile(props) {
  //const data = props.route.params.data;
  const [notvisible1, setVisible1] = useState(true);
  const [notvisible2, setVisible2] = useState(true);
  const [notvisible3, setVisible3] = useState(true);
  const [email, setEmail] = useState("");
  const [curpass, setCpass] = useState("");
  const [newpass, setNpass] = useState("");
  const [newpassvalid, setNpassvalid] = useState("");
  const [repass, setRpass] = useState("");
  const [repassvalid, setRpassvalid] = useState("");
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
  const resetPassword = () => {
    if (newpass === repass) {
      fetch(Urls.cn + "/users/reset/" + email, {
        method: "patch",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          curpass,
          newpass,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Reset successful") {
            console.log(data);
            Alert.alert("Password reset successfull");
          } else {
            Alert.alert("Password reset unsuccessfull");
          }
        });
    } else {
      Alert.alert("New passwords does not match");
    }
  };
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
                  size={30}
                  onPress={() => props.navigation.openDrawer()}
                />
                <Text
                  style={{ color: COLORS.white, marginLeft: 10, fontSize: 23 }}
                >
                  Profile
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
              <Image style={styles.image} source={{ uri: data.img }} />
              <Text
                style={{ fontSize: 25, fontWeight: "700", color: COLORS.green }}
              >
                {data.name}
              </Text>
              <Text
                style={{ fontSize: 20, fontWeight: "600", color: COLORS.green }}
              >
                {data.accountType}
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
              <Text style={{ color: COLORS.black, fontSize: 20 }}>NIC</Text>
              <Text style={{ color: COLORS.green, fontSize: 20 }}>
                {data.NIC}
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
                {data.mobile === "" ? "not set" : data.mobile}
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
                {data.Address === "" ? "not set" : data.Address}
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
                  { right: 0, marginHorizontal: 20, borderColor: COLORS.green },
                ]}
              >
                <TextInput
                  style={{
                    paddingHorizontal: 10,
                    color: COLORS.black,
                    fontSize: 20,
                  }}
                  placeholder="Current Password"
                  placeholderTextColor={COLORS.gray}
                  value={curpass}
                  secureTextEntry={notvisible1}
                  onChangeText={(text) => setCpass(text)}
                />
                <TouchableOpacity
                  style={{ marginLeft: 275, top: 6, position: "absolute" }}
                  onPress={() => setVisible1(!notvisible1)}
                >
                  {notvisible1 ? (
                    <Icons name="eye-outline" color={COLORS.green} size={30} />
                  ) : (
                    <Icons
                      name="eye-off-outline"
                      color={COLORS.green}
                      size={30}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.inputContainer,
                  { right: 0, marginHorizontal: 20, borderColor: COLORS.green },
                ]}
              >
                <Input
                  style={{
                    paddingHorizontal: 10,
                    color: COLORS.black,
                    fontSize: 20,
                  }}
                  placeholder="New Password"
                  placeholderTextColor={COLORS.gray}
                  value={newpass}
                  pattern={"^[a-zA-Z0-9]{8,}$"}
                  onValidation={(isValid) => setNpassvalid(isValid)}
                  secureTextEntry={notvisible2}
                  onChangeText={(text) => setNpass(text)}
                />

                <TouchableOpacity
                  style={{ marginLeft: 275, top: 6, position: "absolute" }}
                  onPress={() => setVisible2(!notvisible2)}
                >
                  {notvisible2 ? (
                    <Icons name="eye-outline" color={COLORS.green} size={30} />
                  ) : (
                    <Icons
                      name="eye-off-outline"
                      color={COLORS.green}
                      size={30}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View style={{ marginHorizontal: 40, height: 10 }}>
                {newpass === "" ? (
                  <Text style={{ color: COLORS.red }}>Required</Text>
                ) : !newpassvalid ? (
                  <Text style={{ color: COLORS.red }}>
                    Password must contain at least 8 characters
                  </Text>
                ) : (
                  <Text style={{ color: COLORS.red }}></Text>
                )}
              </View>
              <View
                style={[
                  styles.inputContainer,
                  { right: 0, marginHorizontal: 20, borderColor: COLORS.green },
                ]}
              >
                <Input
                  style={{
                    paddingHorizontal: 10,
                    color: COLORS.black,
                    fontSize: 20,
                  }}
                  placeholder="Re-Enter Password"
                  placeholderTextColor={COLORS.gray}
                  value={repass}
                  pattern={"^[a-zA-Z0-9]{8,}$"}
                  onValidation={(isValid) => setRpassvalid(isValid)}
                  secureTextEntry={notvisible3}
                  onChangeText={(text) => setRpass(text)}
                />
                <TouchableOpacity
                  style={{ marginLeft: 275, top: 6, position: "absolute" }}
                  onPress={() => setVisible3(!notvisible3)}
                >
                  {notvisible3 ? (
                    <Icons name="eye-outline" color={COLORS.green} size={30} />
                  ) : (
                    <Icons
                      name="eye-off-outline"
                      color={COLORS.green}
                      size={30}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View style={{ marginHorizontal: 40, height: 10 }}>
                {repass === "" ? (
                  <Text style={{ color: COLORS.red }}>Required</Text>
                ) : !repassvalid ? (
                  <Text style={{ color: COLORS.red }}>
                    Password must contain at least 8 characters
                  </Text>
                ) : (
                  <Text style={{ color: COLORS.red }}></Text>
                )}
              </View>
              <TouchableOpacity
                style={[
                  styles.inputContainer,
                  styles.buttonview,
                  {
                    right: 0,
                    marginHorizontal: 20,
                    borderColor: COLORS.green,
                    justifyContent: "center",
                    backgroundColor: COLORS.green,
                  },
                ]}
                onPress={resetPassword}
              >
                <Text style={{ color: COLORS.white, fontSize: 20 }}>Reset</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.inputContainer2,
                  {
                    right: 0,
                    marginHorizontal: 20,
                    borderColor: COLORS.green,
                    justifyContent: "center",
                  },
                ]}
                onPress={() => setmodal(false)}
              >
                <Text style={{ fontSize: 20, color: COLORS.green }}>
                  Cancel
                </Text>
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
    backgroundColor: COLORS.white,
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
  },
  btn: {
    marginTop: 20,
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
    bottom: 0,
    paddingBottom: 10,
    paddingTop: 10,
    width: "100%",
    height: "55%",
    borderWidth: 1,
    borderColor: COLORS.green,
    backgroundColor: COLORS.lightGreen3,
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
    elevation: SIZES.elevation,
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
