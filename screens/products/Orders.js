import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ImageBackground,
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
  const [placed, setPlaced] = useState([]);
  const [processing, setProcessing] = useState([]);
  const [completed, setCompleted] = useState([]);
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
    setloading(false);
  };
  const fetchData = () => {
    fetch(Urls.cn + "/order/" + br)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setdata(result);
      });
  };
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
    fetchData();
    getData();
    putData();
  }, []);

  const renderList = (item) => {
    const id = item._id.slice(18, 23);
    return (
      <TouchableOpacity
        style={{
          marginBottom: SIZES.radius,
          borderRadius: SIZES.radius * 2,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.radius,
          backgroundColor: COLORS.gray3,
        }}
      >
        <Text style={{ color: COLORS.lightYellow, fontSize: 24 }}>
          Order #{id}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 5,
          }}
        >
          <Text style={{ color: COLORS.white, fontSize: 18 }}>
            {item.product_name}
          </Text>
          <Text style={{ color: COLORS.white, fontSize: 18 }}>
            {item.quantity}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 5,
          }}
        >
          <Text style={{ color: COLORS.white, fontSize: 18 }}>Total</Text>
          <Text style={{ color: COLORS.white, fontSize: 18 }}>
            LKR {item.total}.00
          </Text>
        </View>
      </TouchableOpacity>
    );
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
                  Orders
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
                      color: selected === "0" ? COLORS.primary : COLORS.gray,
                      fontSize: 18,
                    }}
                  >
                    Received
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
                  style={{ alignItems: "center", width: 100 }}
                  onPress={() => setSelected("1")}
                >
                  <Text
                    style={{
                      color: selected === "1" ? COLORS.primary : COLORS.gray,
                      fontSize: 18,
                    }}
                  >
                    Processing
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
                <TouchableOpacity
                  style={{ alignItems: "center", width: 100 }}
                  onPress={() => setSelected("2")}
                >
                  <Text
                    style={{
                      color: selected === "2" ? COLORS.primary : COLORS.gray,
                      fontSize: 18,
                    }}
                  >
                    Completed
                  </Text>
                  <View
                    style={{
                      marginTop: selected === "2" ? 3 : 4,
                      height: selected === "2" ? 4 : 2,
                      width: "100%",
                      backgroundColor:
                        selected === "2" ? COLORS.primary : COLORS.gray,
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
                    paddingHorizontal: SIZES.radius,
                  }}
                  data={data}
                  renderItem={({ item }) => {
                    return renderList(item);
                  }}
                  keyExtractor={(item) => item._id.toString()}
                  onRefresh={() => fetchData()}
                  refreshing={loading}
                />
              </View>
            ) : selected === "1" ? (
              <View>
                {/* Processing Orders */}
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
                  onRefresh={() => fetchData()}
                  refreshing={loading}
                />
              </View>
            ) : (
              <View>
                {/* Completed Orders */}
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
                  onRefresh={() => fetchData()}
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
    backgroundColor: COLORS.secondary,
  },
});
