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
  Linking,
} from "react-native";
import { SIZES, COLORS, icons } from "../../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Urls from "../../constant";

export default function Business_Profile(props) {
  //const data = props.route.params.data;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [br, setBr] = useState("");
  const [cmpcategory, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [request, setRequest] = useState([]);
  const [requestflag, setRequestflag] = useState();
  const [pflag, setpflag] = useState();
  const [data, setData] = useState("");
  const [mycmp, setMycmp] = useState("");
  const [cmpbr, setCBr] = useState("");
  const [loading, setloading] = useState(true);
  const [requested, setRequested] = useState(false);
  const [alreadypartner, setAlready] = useState(false);
  const getData = async () => {
    const email = props.route.params.email;
    const company_br = props.route.params.cmpbr;
    const rstflag = props.route.params.flag;
    const pflg = props.route.params.pflag;
    const br = await AsyncStorage.getItem("br");
    const cmp = await AsyncStorage.getItem("category");
    //console.log(email);
    setEmail(email);
    setBr(br);
    setCategory(cmp);
    setpflag(pflg);
    setCBr(company_br);
    setName(name);
    setRequestflag(rstflag);
    fetch(Urls.cn + "/company/" + company_br)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result.partners[0]);
        setData(result);
        setLocation(result.location);
      });
    fetch(Urls.cn + "/company/" + br)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result.partners[0]);
        setMycmp(result);
      });
    fetch(Urls.cn + "/prequest/sent/" + br + "/" + company_br)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setRequest(result);

        for (let i = 0; i < result.length; i++) {
          const element = result[i];
          //console.log(element);
          if (element.from === br && element.to === company_br) {
            setRequested(true);
          }
        }
      });
  };
  const openDial = () => {
    Platform.OS === "ios"
      ? Linking.openURL(`telprompt:${data.contact}`)
      : Linking.openURL(`tel:${data.contact}`);
  };
  const sendRequest = () => {
    fetch(Urls.cn + "/prequest/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: br,
        to: cmpbr,
        status: "request sent",
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
    setRequested(true);
  };

  const canclePartnership = () => {
    let myarry = mycmp.partners;
    let parray = data.partners;
    let mindex = myarry.indexOf(cmpbr);
    let pindex = parray.indexOf(br);
    myarry.splice(mindex, 1);
    parray.splice(pindex, 1);
    fetch(Urls.cn + "/company/partners/" + mycmp._id, {
      method: "patch",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        partners: myarry,
      }),
    });
    fetch(Urls.cn + "/company/partners/" + data._id, {
      method: "patch",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        partners: parray,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("Cancled Successfully");
        props.navigation.navigate("Partners");
      });
  };

  const updatePartnership = () => {
    let myarry = mycmp.partners;
    let parray = data.partners;
    myarry.push(cmpbr);
    parray.push(br);
    fetch(Urls.cn + "/prequest/" + cmpbr + "/" + br, {
      method: "delete",
    });
    fetch(Urls.cn + "/company/partners/" + mycmp._id, {
      method: "patch",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        partners: myarry,
      }),
    });
    fetch(Urls.cn + "/company/partners/" + data._id, {
      method: "patch",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        partners: parray,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("Accepted Successfully");
        props.navigation.navigate("Partners");
      });
    //console.log(data._id);
    //console.log(mycmp._id);
    //console.log(myarry);
    //console.log(parray);
  };

  const acceptRequest = () => {
    updatePartnership();
  };
  const rejectRequest = () => {
    fetch(Urls.cn + "/prequest/" + cmpbr + "/" + br, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("successfuly deleted");
        props.navigation.navigate("Partners");
      });
  };
  const cancleRequest = () => {
    fetch(Urls.cn + "/prequest/" + br + "/" + cmpbr, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("successfuly deleted");
        setRequested(false);
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
                  onPress={() => props.navigation.navigate("Partners")}
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
                  Business Profile
                </Text>
              </View>
            </View>
          </SafeAreaView>
          {pflag ? (
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
                  style={{
                    fontSize: 25,
                    fontWeight: "700",
                    color: COLORS.green,
                  }}
                >
                  {data.company_name}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    color: COLORS.green,
                  }}
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
                <Text style={{ color: COLORS.black, fontSize: 20 }}>
                  Address
                </Text>
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.inputContainer,
                    styles.btn,
                    {
                      backgroundColor: COLORS.green,
                      borderColor: COLORS.green,
                      right: 0,
                      width: 150,
                      justifyContent: "center",
                      marginLeft: 15,
                    },
                  ]}
                  onPress={openDial}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Call
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.inputContainer,
                    styles.btn,
                    {
                      backgroundColor: COLORS.green,
                      borderColor: COLORS.green,
                      right: 0,
                      width: 150,
                      justifyContent: "center",
                      marginRight: 15,
                    },
                  ]}
                  onPress={() => {
                    Linking.openURL(`mailto:${data.email}`);
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Email
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[
                  styles.inputContainer,
                  styles.btn,
                  {
                    backgroundColor: COLORS.red,
                    borderColor: COLORS.red,
                  },
                ]}
                onPress={canclePartnership}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Cancle Partnership
                </Text>
              </TouchableOpacity>
            </ScrollView>
          ) : (
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
                  style={{
                    fontSize: 25,
                    fontWeight: "700",
                    color: COLORS.green,
                  }}
                >
                  {data.company_name}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    color: COLORS.green,
                  }}
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
                <Text style={{ color: COLORS.black, fontSize: 20 }}>
                  Address
                </Text>
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
                {requestflag ? (
                  <>
                    <TouchableOpacity
                      style={[
                        styles.inputContainer,
                        styles.btn,
                        {
                          backgroundColor: COLORS.green,
                          borderColor: COLORS.green,
                        },
                      ]}
                      onPress={acceptRequest}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        Accept Request
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
                      onPress={rejectRequest}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        Reject Request
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : requested ? (
                  <TouchableOpacity
                    style={[
                      styles.inputContainer,
                      styles.btn,
                      {
                        backgroundColor: COLORS.green,
                        borderColor: COLORS.green,
                      },
                    ]}
                    onPress={cancleRequest}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      Cancel Request
                    </Text>
                  </TouchableOpacity>
                ) : alreadypartner ? (
                  <TouchableOpacity
                    style={[
                      styles.inputContainer,
                      styles.btn,
                      {
                        backgroundColor: COLORS.green,
                        borderColor: COLORS.green,
                      },
                    ]}
                    onPress={canclePartnership}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      Cancel Partnership
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[
                      styles.inputContainer,
                      styles.btn,
                      {
                        backgroundColor: COLORS.green,
                        borderColor: COLORS.green,
                      },
                    ]}
                    onPress={sendRequest}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      Send Request
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          )}
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
    height: 250,
    width: "100%",
  },
  image: {
    marginHorizontal: 0,
    height: 200,
    width: "100%",
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
