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

export default function Members(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [br, setBr] = useState("");
  const [cmpcategory, setCategory] = useState("");
  const [data, setdata] = useState([]);
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
    fetch(Urls.cn + "/users/br/" + br)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setdata(result);
      });
    setloading(false);
  };
  const fetchData = () => {};
  useEffect(() => {
    getData();
    //fetchData();
  }, []);
  const deleteMember = (id) => {
    fetch(Urls.cn + "/users/" + id, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("Member is successfuly deleted");
      });
  };
  const showAlert = (id) =>
    Alert.alert(
      "Warning",
      "Are you sure to delete Member",
      [
        {
          text: "Yes",
          onPress: () => deleteMember(id),
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
  const renderList = (item) => {
    if (item.email !== email) {
      return (
        <Card
          style={styles.card}
          //onPress={() => showAlert(item._id)}
        >
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Image
              style={styles.img}
              source={{
                uri: item.img,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 250,
              }}
            >
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.title}>{item.email}</Text>
              </View>
              <Icons
                name="delete"
                color={COLORS.green}
                style={{ marginTop: 10 }}
                size={30}
                onPress={() => showAlert(item._id)}
              />
            </View>
          </View>
        </Card>
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
                    Members
                  </Text>
                </View>
              </View>
            </SafeAreaView>
          </KeyboardAvoidingView>
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
          </View>
          <FAB
            style={styles.fab}
            small={false}
            icon="plus"
            onPress={() =>
              props.navigation.navigate("AddMembers", {
                br,
                email,
                name,
                cmpcategory,
              })
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
