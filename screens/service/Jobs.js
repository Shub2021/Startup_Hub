import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  FlatList,
  Keyboard,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SIZES, COLORS, icons } from "../../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Urls from "../../constant";

export default function Jobs(props) {
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
    fetch(Urls.cn + "/Jobs/" + br)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setdata(result);
      });
    setEmail(email);
    setBr(br);
    setCategory(cmp);
    setName(name);
    setloading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const startJob = (item, flag1) => {
    props.navigation.navigate("JobTask", {item, flag1});
   };
 const showAlert1 = (item, flag1) =>
     Alert.alert(
       "Alert",
         "Are you sure to start job?",
       [
         {
           text: "Yes",
           onPress: () => startJob(item, flag1),
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
    const flag1 = true; 
    const id = item._id.slice(18, 23);
    if (item.job_status === "placed") {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.radius,
            borderRadius: SIZES.radius * 2,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.radius,
            backgroundColor: COLORS.gray3,
          }}
          onPress={() => showAlert1(item, flag1)}
        >
          <Text style={{ color: COLORS.lightYellow, fontSize: 24 }}>
            Job #{id}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.description}
            </Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.job_status}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const renderList2 = (item) => {
    const flag1 = false;
    const id = item._id.slice(18, 23);
    if (item.job_status === "Processing") {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.radius,
            borderRadius: SIZES.radius * 2,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.radius,
            backgroundColor: COLORS.gray3,
          }}
          onPress={() => showAlert1(item, flag1)}
        >
          <Text style={{ color: COLORS.lightYellow, fontSize: 24 }}>
            Job #{id}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.description}
            </Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.job_status}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const renderList3 = (item) => {
    const id = item._id.slice(18, 23);
    if (item.job_status === "Completed") {
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
            Job #{id}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.description}
            </Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.job_status}
            </Text>
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
            <Text style={{ color: COLORS.white, marginLeft: 10, fontSize: 25 }}>
              Jobs
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
                  color: selected === "0" ? COLORS.primary : COLORS.green,
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
                    selected === "0" ? COLORS.primary : COLORS.green,
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
                    return renderList1(item);
                  }}
                  keyExtractor={(item) => item._id.toString()}
                  onRefresh={() => getData()}
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
                    return renderList2(item);
                  }}
                  keyExtractor={(item) => item._id.toString()}
                  onRefresh={() => getData()}
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
                    return renderList3(item);
                  }}
                  keyExtractor={(item) => item._id.toString()}
                  onRefresh={() => getData()}
                  refreshing={loading}
                />
              </View>
            )}
      </View>
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
});
