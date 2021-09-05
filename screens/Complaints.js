import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Image,
  ScrollView,
  Picker,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, COLORS, icons } from "../constants";
import { Card } from "react-native-paper";
import Urls from "../constant";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Input from "../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Complaints(props) {
  const [selected, setSelected] = useState("0");
  const [br, setBr] = useState("");
  const [category, setCategory] = useState("");

  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);

  const getData = async () => {
    const brr = await AsyncStorage.getItem("br");
    const cmp = await AsyncStorage.getItem("type");
    fetch(Urls.cn + "/complaint/br/" + brr)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
    setBr(brr);
    setCategory(cmp);
    console.log(cmp);
    setloading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  const markAsRead = (item) => {
    fetch(Urls.cn + "/complaint/viewed/" + item._id, {
      method: "patch",
      headers: { "Content-Type": "application/json" },
    });
  };
  const showAlert1 = (item) =>
    Alert.alert(
      "Alert",
      "Are you sure to mark as read?",
      [
        {
          text: "Yes",
          onPress: () => markAsRead(item),
          style: "cancel",
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  const renderList1 = (item) => {
    const id = item._id.slice(20, 23);
    if (item.status === "placed") {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.radius,
            borderRadius: SIZES.radius * 2,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.radius,
            backgroundColor: COLORS.gray3,
          }}
          onPress={() => showAlert1(item)}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: COLORS.lightYellow, fontSize: 18 }}>
              Id #{id}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              Client Email
            </Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.client_email}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              Description
            </Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.description}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>Date</Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.placed_date}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>Order ID</Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              #{item.item_id.slice(18, 23)}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };
  const renderList2 = (item) => {
    const id = item._id.slice(20, 23);
    if (item.status === "viewed") {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.radius,
            borderRadius: SIZES.radius * 2,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.radius,
            backgroundColor: COLORS.gray3,
          }}
          onPress={() => showAlert1(item)}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: COLORS.lightYellow, fontSize: 18 }}>
              Id #{id}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              Client Email
            </Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.client_email}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              Description
            </Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.description}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>Date</Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.placed_date}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>Order ID</Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              #{item.item_id.slice(18, 23)}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    top: -5,
                    left: 0,
                    padding: 10,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.green,
                  }}
                  onPress={() => {
                    if (category === "service") {
                      props.navigation.navigate("ServiceHome");
                    } else {
                      props.navigation.navigate("Home");
                    }
                  }}
                >
                  <Image
                    source={icons.leftArrow}
                    resizeMode="contain"
                    style={{ width: 25, height: 25, tintColor: COLORS.white }}
                  />
                </TouchableOpacity>
                <Text
                  style={{ color: COLORS.white, marginLeft: 10, fontSize: 25 }}
                >
                  Complaints
                </Text>
              </View>
            </View>
          </SafeAreaView>
          <View style={styles.scrollcontainer}>
            <View
              style={{
                flexDirection: "row",
                height: 50,
                marginTop: SIZES.radius,
                justifyContent: "center",
                paddingHorizontal: SIZES.padding * 1.5,
              }}
            >
              {/* tab buttons */}
              <View style={{ flex: 1, flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ alignItems: "center", width: 150 }}
                  onPress={() => setSelected("0")}
                >
                  <Text
                    style={{
                      color: selected === "0" ? COLORS.primary : COLORS.gray,
                      fontSize: 18,
                    }}
                  >
                    Not Viewed
                  </Text>
                  <View
                    style={{
                      marginTop: selected === "0" ? 3 : 4,
                      height: selected === "0" ? 4 : 2,
                      width: "100%",
                      backgroundColor:
                        selected === "0" ? COLORS.primary : COLORS.gray,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignItems: "center", width: 140 }}
                  onPress={() => setSelected("1")}
                >
                  <Text
                    style={{
                      color: selected === "1" ? COLORS.primary : COLORS.gray,
                      fontSize: 18,
                    }}
                  >
                    Viewed
                  </Text>
                  <View
                    style={{
                      marginTop: selected === "1" ? 3 : 4,
                      height: selected === "1" ? 4 : 2,
                      width: "100%",
                      backgroundColor:
                        selected === "1" ? COLORS.primary : COLORS.gray,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {selected === "0" ? (
              <View>
                {/* Placed Orders */}
                <FlatList
                  style={{
                    marginTop: SIZES.radius,
                    marginBottom: SIZES.radius * 5,
                    paddingHorizontal: SIZES.radius,
                  }}
                  data={data}
                  renderItem={({ item }) => {
                    return renderList1(item);
                  }}
                  keyExtractor={(item) => item._id.toString()}
                  onRefresh={() => getData()}
                  refreshing={loading}
                />
              </View>
            ) : (
              <View>
                {/* Processing Orders */}
                <FlatList
                  style={{
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.radius,
                    marginBottom: SIZES.radius * 5,
                  }}
                  data={data}
                  renderItem={({ item }) => {
                    return renderList2(item);
                  }}
                  keyExtractor={(item) => item._id.toString()}
                  onRefresh={() => getData()}
                  refreshing={loading}
                />
              </View>
            )}
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    marginTop: 24,
    left: 40,
    paddingHorizontal: 10,
    borderColor: COLORS.green,
    borderRadius: 15,
    paddingVertical: 2,
    height: 45,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    borderRadius: 23,
    height: 200,
    width: "100%",
  },
  card: {
    borderRadius: 23,
    height: 200,
    width: 300,
  },
  image: {
    marginHorizontal: 0,
    borderRadius: 23,
    height: 200,
    width: 300,
    resizeMode: "contain",
  },
  btn: {
    backgroundColor: COLORS.green,
    justifyContent: "flex-start",
    paddingLeft: 20,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10,
  },

  scrollcontainer: {
    flex: 1,
    marginTop: -22,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    backgroundColor: COLORS.white,
  },
});
