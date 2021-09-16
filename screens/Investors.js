import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  Button,
  Keyboard,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Card, FAB } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Urls from "../constant";
import { SIZES, COLORS, icons } from "../constants";

export default function Investors(props) {
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState("0");
  const [name, setName] = useState("");
  const [br, setBr] = useState("");
  const [cmpcategory, setCategory] = useState("");
  const [data, setdata] = useState([]);
  const [sentdata, setsentdata] = useState([]);
  const [recieveddata, setrecieveddata] = useState([]);
  const [subscribedata, setsubscribedata] = useState([]);
  const [loading, setloading] = useState(true);
  const getData = async () => {
    const email = await AsyncStorage.getItem("email");
    const name = await AsyncStorage.getItem("name");
    const br = await AsyncStorage.getItem("br");
    const cmp = await AsyncStorage.getItem("category");
    setEmail(email);
    setBr(br);
    setCategory(cmp);
    setName(name);
    fetch(Urls.cn + "/investor/")
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setdata(result);
      });
    fetch(Urls.cn + "/startuprequest/sent/" + br)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setsentdata(result);
      });
    fetch(Urls.cn + "/investorrequest/recieved/" + br)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setrecieveddata(result);
      });
    fetch(Urls.cn + "/subscribe/sent/" + br)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setsubscribedata(result);
      });
    setloading(false);
  };
  const fetchData = () => {};
  useEffect(() => {
    getData();
    //fetchData();
  }, []);
  function acceptInvestment(item) {
    fetch(Urls.cn + "/investorrequest/" + br + "/" + item.email, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("successfuly Accepted");
      });
    const investorEmail = item.email;
    console.log(investorEmail);
    fetch(Urls.cn + "/subscribe/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        investorEmail,
        startupId: br,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        if (data.message === "Request exists") {
          Alert.alert("Request exists");
        } else {
          Alert.alert("Accepted");
        }
      });
  }
  function sendRequest(item) {
    const investorEmail = item.email;
    console.log(investorEmail);
    fetch(Urls.cn + "/startuprequest/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        investorEmail,
        startupId: br,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        if (data.message === "Request exists") {
          Alert.alert("Request exists");
        } else {
          Alert.alert("Request Sent");
        }
      });
  }
  function cancleRequest(item) {
    fetch(Urls.cn + "/startuprequest/" + br + "/" + item.email, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("successfuly deleted");
      });
  }
  function rejectRequest(item) {
    fetch(Urls.cn + "/investorrequest/" + br + "/" + item.email, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("successfuly rejected");
      });
  }
  const deleteMember = (id) => {
    fetch(Urls.cn + "/users/" + id, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("Member is successfuly deleted");
      });
  };
  const showAlert = (item) =>
    Alert.alert(
      item.cName,
      "Invest Area : " +
        item.investArea +
        "\nCompany Address : " +
        item.cAddress +
        "\nContact : " +
        item.cTel +
        "\nEmail : " +
        item.email,
      [
        {
          text: "Ok",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  const renderList = (item) => {
    let sflag = false;
    let rflag = false;
    let suflag = false;
    for (let i = 0; i < sentdata.length; i++) {
      const element = sentdata[i];
      if (item.email === element.investorEmail) {
        sflag = true;
      }
    }
    for (let i = 0; i < recieveddata.length; i++) {
      const element = recieveddata[i];
      if (item.email === element.investorEmail) {
        rflag = true;
      }
    }
    for (let i = 0; i < subscribedata.length; i++) {
      const element = subscribedata[i];
      if (item.email === element.investorEmail) {
        suflag = true;
      }
    }
    if (!rflag && !suflag) {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.radius,
            borderRadius: SIZES.radius * 2,
            paddingHorizontal: SIZES.padding / 1.3,
            marginHorizontal: SIZES.padding / 2,
            paddingVertical: SIZES.radius / 2,
            backgroundColor: COLORS.white,
            borderWidth: SIZES.borderWidth,
            borderColor: COLORS.green,
            elevation: SIZES.elevation,
            marginTop: 20,
            flexDirection: "row",
          }}
          //   onPress={() =>
          //     props.navigation.navigate("Partners_Products", {
          //       item,
          //       flag,
          //       pflag,
          //     })
          //   }
        >
          <View style={{ flexDirection: "column", marginLeft: 0, padding: 2 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: COLORS.green, fontSize: 20 }}>
                {item.cName}
              </Text>
              <Icons
                name="card-account-details"
                color="#0E357A"
                size={28}
                onPress={() => showAlert(item)}
              />
            </View>

            <Text style={{ color: COLORS.gray3, fontSize: 18 }}>
              {item.investArea}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={{
                  width: 130,
                  borderRadius: 15,
                  paddingLeft: 5,
                  alignItems: "center",
                  marginTop: 5,
                  backgroundColor: COLORS.green,
                  flexDirection: "row",
                }}
                onPress={() => props.navigation.navigate("Plan", { item })}
              >
                <Icons name="file-document" color="#ffffff" size={20} />
                <Text
                  style={{ color: COLORS.white, fontSize: 18, padding: 3 , marginLeft: 5}}
                >
                  View Plan
                </Text>
              </TouchableOpacity>
              {sflag ? (
                <TouchableOpacity
                  style={{
                    width: 155,
                    borderRadius: 23,
                    paddingLeft: 5,
                    marginTop: 5,
                    marginLeft: 20,
                    borderColor: COLORS.red,
                    borderWidth: 2,
                    flexDirection: "row",
                  }}
                  onPress={() => cancleRequest(item)}
                >
                  <Text
                    style={{
                      color: COLORS.red,
                      fontSize: 18,
                      paddingTop: 3,
                      marginLeft: 5,
                    }}
                  >
                    Cancel Request
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    width: 160,
                    borderRadius: 23,
                    alignItems: "center",
                    paddingLeft: 5,
                    marginTop: 5,
                    marginLeft: 10,
                    borderColor: COLORS.green,
                    borderWidth: 2,
                    flexDirection: "row",
                  }}
                  onPress={() => sendRequest(item)}
                >
                  <Icons name="send" color="#0E357A" size={15} />
                  <Text
                    style={{ color: COLORS.green, fontSize: 18, padding: 3, marginLeft: 5 }}
                  >
                    Send Request
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };
  const renderList2 = (item) => {
    let sflag = false;
    let rflag = false;
    let suflag = false;
    for (let i = 0; i < sentdata.length; i++) {
      const element = sentdata[i];
      if (item.email === element.investorEmail) {
        sflag = true;
      }
    }
    for (let i = 0; i < recieveddata.length; i++) {
      const element = recieveddata[i];
      if (item.email === element.investorEmail) {
        rflag = true;
      }
    }
    for (let i = 0; i < subscribedata.length; i++) {
      const element = subscribedata[i];
      if (item.email === element.investorEmail) {
        suflag = true;
      }
    }
    if (rflag && !suflag) {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.radius,
            borderRadius: SIZES.radius * 2,
            paddingHorizontal: SIZES.padding / 1.3,
            marginHorizontal: SIZES.padding / 2,
            paddingVertical: SIZES.radius / 2,
            backgroundColor: COLORS.white,
            borderWidth: SIZES.borderWidth,
            borderColor: COLORS.green,
            elevation: SIZES.elevation,
            marginTop: 20,
            flexDirection: "row",
          }}
          //   onPress={() =>
          //     props.navigation.navigate("Partners_Products", {
          //       item,
          //       flag,
          //       pflag,
          //     })
          //   }
        >
          <View style={{ flexDirection: "column", marginLeft: 0, padding: 2 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: COLORS.green, fontSize: 23 }}>
                {item.cName}
              </Text>
              <Icons
                name="delete"
                color="#0E357A"
                size={25}
                onPress={() => rejectRequest(item)}
              />
            </View>
            <Text style={{ color: COLORS.green, fontSize: 23 }}>
              {item.investArea}
            </Text>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={{
                  width: 130,
                  borderRadius: 15,
                  paddingLeft: 5,
                  alignItems: "center",
                  marginTop: 5,
                  backgroundColor: COLORS.green,
                  flexDirection: "row",
                }}
                onPress={() => props.navigation.navigate("Plan", { item })}
              >
                <Icons name="file-document" color="#ffffff" size={20} />
                <Text
                  style={{ color: COLORS.white, fontSize: 18, paddingTop: 3 , marginLeft: 8}}
                >
                  View Plan
                </Text>
              </TouchableOpacity>
              {sflag ? (
                <TouchableOpacity
                  style={{
                    width: 155,
                    borderRadius: 23,
                    paddingLeft: 5,
                    marginTop: 5,
                    marginLeft: 10,
                    borderColor: COLORS.red,
                    borderWidth: 2,
                    flexDirection: "row",
                  }}
                  onPress={() => cancleRequest(item)}
                >
                  <Text
                    style={{
                      color: COLORS.red,
                      fontSize: 18,
                      paddingTop: 3,
                      marginLeft: 5,
                    }}
                  >
                    Cancel Request
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    width: 155,
                    borderRadius: 23,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 5,
                    marginLeft: 20,
                    borderColor: COLORS.green,
                    borderWidth: 2,
                    flexDirection: "row",
                  }}
                  onPress={() => acceptInvestment(item)}
                >
                  {/* <Icons name="account-outline" color="#ffffff" size={30} /> */}
                  <Text
                    style={{ color: COLORS.green, fontSize: 18 }}
                  >
                    Accept
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };
  const renderList3 = (item) => {
    let suflag = false;
    for (let i = 0; i < subscribedata.length; i++) {
      const element = subscribedata[i];
      if (item.email === element.investorEmail) {
        suflag = true;
      }
    }
    if (suflag) {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.radius,
            borderRadius: SIZES.radius * 2,
            paddingHorizontal: SIZES.padding / 1.3,
            marginHorizontal: SIZES.padding / 2,
            paddingVertical: SIZES.radius / 2,
            backgroundColor: COLORS.white,
            borderWidth: SIZES.borderWidth,
            borderColor: COLORS.green,
            elevation: SIZES.elevation,
            flexDirection: "row",
          }}
          //   onPress={() =>
          //     props.navigation.navigate("Partners_Products", {
          //       item,
          //       flag,
          //       pflag,
          //     })
          //   }
        >
          <View style={{ flexDirection: "column", marginLeft: 0, padding: 2 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: COLORS.green, fontSize: 20 }}>
                {item.cName}
              </Text>
              <Icons
                name="card-account-details"
                color="#0E357A"
                size={30}
                style={{ marginLeft: 100 }}
                onPress={() => showAlert(item)}
              />
            </View>
            <Text style={{ color: COLORS.gray3, fontSize: 18, marginBottom: 10 }}>
              {item.investArea}
            </Text>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={{
                  width: 150,
                  borderRadius: 15,
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 5,
                  alignItems: "center",
                  paddingRight: 10,
                  paddingLeft:10,
                  backgroundColor: COLORS.green,
                  borderColor: COLORS.green,
                  borderWidth: 2,
                  flexDirection: "row",
                }}
                onPress={() => props.navigation.navigate("Plan", { item })}
              >
                <Icons name="file-document" color="#ffffff" size={20}  />
                <Text
                  style={{ color: COLORS.white, fontSize: 18, padding: 3, paddingLeft: 10 }}
                >
                  View Plan
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };
  return (
    <View style={styles.container}>
      {!loading ? (
        <>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "position"}
          >
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
                    style={{
                      color: COLORS.white,
                      marginLeft: 10,
                      fontSize: 25,
                    }}
                  >
                    Investors
                  </Text>
                </View>
              </View>
            </SafeAreaView>
          </KeyboardAvoidingView>
          <View style={styles.scrollcontainer}>
            <View
              style={{
                flexDirection: "row",
                height: 50,
                marginTop: SIZES.radius,
                justifyContent: "center",
                paddingHorizontal: SIZES.padding * 1.7,
              }}
            >
              {/* tab buttons */}
              <View style={{ flex: 1, flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ alignItems: "center", width: 80 }}
                  onPress={() => setSelected("0")}
                >
                  <Text
                    style={{
                      color: selected === "0" ? COLORS.green : COLORS.gray,
                      fontSize: 18,
                    }}
                  >
                    Request
                  </Text>
                  <View
                    style={{
                      marginTop: selected === "0" ? 3 : 4,
                      height: selected === "0" ? 4 : 2,
                      width: "100%",
                      backgroundColor:
                        selected === "0" ? COLORS.green : COLORS.gray,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignItems: "center", width: 100 }}
                  onPress={() => setSelected("1")}
                >
                  <Text
                    style={{
                      color: selected === "1" ? COLORS.green : COLORS.gray,
                      fontSize: 18,
                    }}
                  >
                    Received
                  </Text>
                  <View
                    style={{
                      marginTop: selected === "1" ? 3 : 4,
                      height: selected === "1" ? 4 : 2,
                      width: "100%",
                      backgroundColor:
                        selected === "1" ? COLORS.green : COLORS.gray,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignItems: "center", width: 100 }}
                  onPress={() => setSelected("2")}
                >
                  <Text
                    style={{
                      color: selected === "2" ? COLORS.green : COLORS.gray,
                      fontSize: 18,
                    }}
                  >
                    Accepted
                  </Text>
                  <View
                    style={{
                      marginTop: selected === "2" ? 3 : 4,
                      height: selected === "2" ? 4 : 2,
                      width: "100%",
                      backgroundColor:
                        selected === "2" ? COLORS.green : COLORS.gray,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {selected === "0" ? (
              <View>
                {/* All */}
                <FlatList
                  style={{
                    marginTop: SIZES.radius,
                    marginBottom: SIZES.radius * 5,
                    paddingHorizontal: SIZES.radius / 3,
                  }}
                  data={data}
                  renderItem={({ item }) => {
                    return renderList(item);
                  }}
                  keyExtractor={(item) => item._id.toString()}
                  onRefresh={() => getData()}
                  refreshing={loading}
                />
              </View>
            ) : selected === "1" ? (
              <View>
                {/* Requested */}
                <FlatList
                  style={{
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.radius / 3,
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
            ) : (
              <View>
                {/* Partners */}
                <FlatList
                  style={{
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.radius / 3,
                    marginBottom: SIZES.radius * 5,
                  }}
                  data={data}
                  renderItem={({ item }) => {
                    return renderList3(item);
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 75,
    width: "100%",
    borderBottomRightRadius: 20,
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
    flexDirection: "row",
    height: 75,
    width: "100%",
    marginTop: 20,
    marginLeft: 15,
    paddingBottom: 10,
  },
  image: {
    marginHorizontal: 0,

    borderTopStartRadius: 23,
    borderTopEndRadius: 23,
    height: 150,
    width: 300,
  },
  card: {
    margin: 5,
    padding: 5,
    marginHorizontal: 20,
    borderRadius: 23,
    height: 80,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  fab: {
    position: "absolute",
    backgroundColor: COLORS.green,
    marginBottom: 20,
    marginRight: 20,
    right: 0,
    bottom: 0,
  },
  scrollcontainer: {
    flex: 1,
    marginTop: -22,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    backgroundColor: COLORS.white,
  },
});
