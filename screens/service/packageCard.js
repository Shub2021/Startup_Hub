import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  FlatList,
  ImageBackground,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  Button,
  Image,
  Keyboard,
  Platform,
  TouchableOpacity,
  Animated,
} from "react-native";

import { Card, FAB } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Urls from "../../constant";
import { SIZES, COLORS, icons } from "../../constants";

export default function packageCard(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [br, setBr] = useState("");
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  const service_name = props.route.params.item.service_name;
  const picture = props.route.params.item.picture;
  const id = props.route.params.item._id;

  const getData = async () => {
    const email = await AsyncStorage.getItem("email");
    const name = await AsyncStorage.getItem("name");
    const br_number = await AsyncStorage.getItem("br");
    fetch(Urls.cn + "/service/" + id)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setdata(result.package);
      });
    setEmail(email);
    setBr(br_number);

    setName(name);
    setloading(false);
  };

  useEffect(() => {
    getData();
    console.log(br);
  }, []);

  const showAlert = (ID, pk) =>
    Alert.alert(
      "Warning",
      "Are you sure to delete " + service_name + pk,
      [
        {
          text: "Yes",
          onPress: () => deletepackage(ID, pk),
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
  const desAlert = (des) =>
    Alert.alert(
      "Discription",
      des,
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

  const deletepackage = (Id, pk) => {
    console.log(id);
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i]._id !== Id) {
        arr = arr.concat(data[i]);
      }
    }
    console.log(arr);

    fetch(Urls.cn + "/service/package/" + id, {
      method: "patch",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        package: arr,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("deleted");
        // props.navigation.navigate("packageCard");
      });
  };

  const renderList = (item) => {
    const pkid = item._id;
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          margin: 20,
          marginBottom: SIZES.radius,
          borderRadius: SIZES.radius * 2,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.radius,
          backgroundColor: COLORS.green,
        }}
      >
        {/* <Text style={{ color: COLORS.lightYellow, fontSize: 24 }}>
          {service_name}
        </Text> */}
        <TouchableOpacity>
          <Card
            style={styles.card}
            onPress={() => desAlert(item.pk_discription)}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginLeft: 15,
                marginRight: 15,
                marginTop: 15,
              }}
            >
              <Text style={{ color: COLORS.black, fontSize: 18 }}>
                {service_name}
              </Text>
              <Text style={{ color: COLORS.black, fontSize: 18 }}>
                {item.Package_type}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",

                marginLeft: 15,
                marginRight: 15,
              }}
            >
              <Text style={{ color: COLORS.black, fontSize: 18 }}>Price</Text>
              <Text style={{ color: COLORS.black, fontSize: 18 }}>
                LKR{item.price}.00
              </Text>
            </View>
          </Card>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", marginRight: 240, width: 80 }}>
          <TouchableOpacity style={styles.editBtn}>
            <Icons
              name="file-document-edit-outline"
              style={{ color: COLORS.green }}
              onPress={() =>
                props.navigation.navigate("updatePackage", { item, data, id })
              }
              color="#ffffff"
              size={23}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editBtn}>
            <Icons
              name="delete"
              style={{ color: COLORS.red }}
              onPress={() => showAlert(item._id, item.Package_type)}
              color="#ffffff"
              size={23}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
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
                  <TouchableOpacity
                    style={{
                      // alignItems: "center",
                      //justifyContent: "center",
                      position: "relative",
                      top: 8,
                      left: 0,
                      paddingRight: 5,
                      borderRadius: SIZES.radius,
                      backgroundColor: COLORS.green,
                    }}
                    onPress={() => props.navigation.navigate("ServiceCard")}
                  >
                    <Image
                      source={icons.leftArrow}
                      resizeMode="contain"
                      style={{ width: 25, height: 25, tintColor: COLORS.white }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: COLORS.white,
                      marginLeft: 10,
                      fontSize: 25,
                    }}
                  >
                    {service_name}
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
          </KeyboardAvoidingView>
          <View style={styles.background}>
            <View style={styles.imageView}>
              <Image style={styles.image} source={{ uri: picture }} />
            </View>
          </View>
          <View style={styles.scrollcontainer}>
            <FlatList
              style={{ marginTop: 10, marginBottom: 10 }}
              data={data}
              renderItem={({ item }) => {
                return renderList(item);
              }}
              keyExtractor={(item) => item._id.toString()}
              onRefresh={() => getData()}
              refreshing={loading}
            />

            {/* </View> */}
          </View>
          <FAB
            style={styles.fab}
            small={false}
            icon="plus"
            onPress={() =>
              props.navigation.navigate("addPackage", { br, data, id })
            }
          />
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
  background: {
    height: 255,
    marginTop: -20,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
  },
  card: {
    borderRadius: 23,
    height: 70,
    width: 300,
    marginHorizontal: 30,
    backgroundColor: COLORS.white,
    marginBottom: 15,
  },
  editBtn: {
    backgroundColor: "white",
    borderRadius: 5,
    color: COLORS.green,
    marginLeft: 15,
    marginTop: -5,
    height: 30,
    paddingTop: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 23,
    marginTop: 35,
    marginBottom: 40,
    height: 200,
    width: 300,
    borderColor: COLORS.darkGreen,
    borderWidth: 2,
  },
  imageView: {
    justifyContent: "center",
    alignItems: "center",
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
  addButton: {
    position: "absolute",
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: COLORS.yellow,
    width: 60,
    height: 60,
    marginBottom: -70,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  addButtonText: {
    textAlign: "center",
    color: COLORS.black,
    fontSize: 12,
    fontWeight: "bold",
  },
  addButton1: {
    position: "absolute",
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: COLORS.darkGreen,
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  addButtonText1: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
  },
});