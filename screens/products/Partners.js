import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Button,
  Keyboard,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import { SIZES, COLORS, icons } from "../../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Urls from "../../constant";

export default function Home(props) {
  //const data = props.route.params.data;
  const [selected, setSelected] = useState("0");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [br, setBr] = useState("");
  const [cmpcategory, setCategory] = useState("");
  const [data, setdata] = useState([]);
  const [rdata, setrdata] = useState([]);
  const [placed, setPlaced] = useState([]);
  const [processing, setProcessing] = useState([]);
  const [partners, setPartners] = useState([]);
  const [mycmp, setMycmp] = useState("");
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
    fetch(Urls.cn + "/company/category/" + cmp)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setdata(result);
      });
    fetch(Urls.cn + "/prequest/recieved/" + br)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setrdata(result);
      });
    fetch(Urls.cn + "/company/" + br)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result.partners[0]);
        setMycmp(result);
        setPartners(result.partners);
        //console.log(result.partners);
      });
    setloading(false);
  };
  // const fetchData = () => {
  //   if (!loading) {
  //     console.log(cmpcategory);

  //   }
  // };
  const putData = () => {
    var plcd = data.map(function (val) {
      if (val.order_status == "placed") {
        console.log(val);
        return val;
      }
    });
    setPlaced(plcd);
  };
  useEffect(() => {
    getData();
    //fetchData();

    //putData();
  }, []);

  const renderList = (item) => {
    const cmpbr = item.br_number;
    const email = item.email;
    let flag = false;
    let pflag = false;
    for (let i = 0; i < rdata.length; i++) {
      const element = rdata[i];
      if (item.br_number === element.from) {
        flag = true;
      }
    }
    for (let i = 0; i < partners.length; i++) {
      const element = partners[i];
      if (item.br_number === element) {
        pflag = true;
      }
    }
    if (item.br_number !== br && flag !== true && pflag !== true) {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.radius,
            borderRadius: SIZES.radius * 2,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.radius,
            backgroundColor: COLORS.white,
            borderWidth: SIZES.borderWidth,
            borderColor: COLORS.green,
            elevation: SIZES.elevation,
            flexDirection: "row",
          }}
          onPress={() =>
            props.navigation.navigate("Partners_Products", {
              item,
              flag,
              pflag,
            })
          }
        >
          <Image style={styles.image} source={{ uri: item.image }} />
          <View style={{ flexDirection: "column", marginLeft: 10, padding: 8 }}>
            <Text style={{ color: COLORS.green, fontSize: 23 }}>
              {item.company_name}
            </Text>
            <Text style={{ color: COLORS.green, fontSize: 20 }}>
              {item.address}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={{
                  width: 120,
                  borderRadius: 23,
                  paddingLeft: 10,
                  marginTop: 5,
                  backgroundColor: COLORS.green,
                  flexDirection: "row",
                }}
                onPress={() =>
                  props.navigation.navigate("Partners_Business_Profile", {
                    cmpbr,
                    email,
                    flag,
                    pflag,
                  })
                }
              >
                <Icons name="account-outline" color="#ffffff" size={25} />
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 18,
                    padding: 3,
                    marginLeft: 5,
                  }}
                >
                  Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };
  const renderList2 = (item) => {
    const cmpbr = item.br_number;
    const email = item.email;
    let pflag = false;
    let flag = false;
    for (let i = 0; i < rdata.length; i++) {
      const element = rdata[i];
      if (item.br_number === element.from) {
        flag = true;
      }
    }
    for (let i = 0; i < partners.length; i++) {
      const element = partners[i];
      if (item.br_number === element) {
        pflag = true;
      }
    }
    if (item.br_number !== br && flag === true && pflag !== true) {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.radius,
            borderRadius: SIZES.radius * 2,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.radius,
            backgroundColor: COLORS.white,
            borderWidth: SIZES.borderWidth,
            borderColor: COLORS.green,
            elevation: SIZES.elevation,
            flexDirection: "row",
          }}
          onPress={() =>
            props.navigation.navigate("Partners_Products", {
              item,
              flag,
              pflag,
            })
          }
        >
          <Image style={styles.image} source={{ uri: item.image }} />
          <View style={{ flexDirection: "column", marginLeft: 10, padding: 8 }}>
            <Text style={{ color: COLORS.green, fontSize: 23 }}>
              {item.company_name}
            </Text>
            <Text style={{ color: COLORS.green, fontSize: 20 }}>
              {item.address}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={{
                  width: 120,
                  borderRadius: 23,
                  paddingLeft: 10,
                  marginTop: 5,
                  backgroundColor: COLORS.green,
                  flexDirection: "row",
                }}
                onPress={() =>
                  props.navigation.navigate("Partners_Business_Profile", {
                    cmpbr,
                    email,
                    flag,
                    pflag,
                  })
                }
              >
                <Icons name="account-outline" color="#ffffff" size={25} />
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 18,
                    padding: 3,
                    marginLeft: 5,
                  }}
                >
                  Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };
  const renderList3 = (item) => {
    const cmpbr = item.br_number;
    const email = item.email;
    let pflag = false;
    let flag = false;
    for (let i = 0; i < rdata.length; i++) {
      const element = rdata[i];
      if (item.br_number === element.from) {
        flag = true;
      }
    }
    for (let i = 0; i < partners.length; i++) {
      const element = partners[i];
      if (item.br_number === element) {
        pflag = true;
      }
    }
    if (item.br_number !== br && pflag === true) {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.radius,
            borderRadius: SIZES.radius * 2,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.radius,
            backgroundColor: COLORS.white,
            borderWidth: SIZES.borderWidth,
            borderColor: COLORS.green,
            elevation: SIZES.elevation,
            flexDirection: "row",
          }}
          onPress={() =>
            props.navigation.navigate("Partners_Products", {
              item,
              flag,
              pflag,
            })
          }
        >
          <Image style={styles.image} source={{ uri: item.image }} />
          <View style={{ flexDirection: "column", marginLeft: 10, padding: 8 }}>
            <Text style={{ color: COLORS.green, fontSize: 23 }}>
              {item.company_name}
            </Text>
            <Text style={{ color: COLORS.green, fontSize: 20 }}>
              {item.address}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={{
                  width: 120,
                  borderRadius: 23,
                  paddingLeft: 10,
                  marginTop: 5,
                  backgroundColor: COLORS.green,
                  flexDirection: "row",
                }}
                onPress={() =>
                  props.navigation.navigate("Partners_Business_Profile", {
                    cmpbr,
                    email,
                    flag,
                    pflag,
                  })
                }
              >
                <Icons name="account-outline" color="#ffffff" size={25} />
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 18,
                    padding: 3,
                    marginLeft: 5,
                  }}
                >
                  Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
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
                  Partners
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
                    Partners
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
                    paddingHorizontal: SIZES.radius,
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
                    paddingHorizontal: SIZES.radius,
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
                    paddingHorizontal: SIZES.radius,
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
  scrollcontainer: {
    flex: 1,
    marginTop: -22,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    backgroundColor: COLORS.white,
  },
  image: {
    marginHorizontal: 0,
    borderRadius: SIZES.radius,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    height: 100,
    width: 120,
  },
});
