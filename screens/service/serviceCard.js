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
  Keyboard,
  Platform,
  TouchableOpacity,
  Animated,
} from "react-native";

import { Card, FAB, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Urls from "../../constant";
import { SIZES, COLORS, icons } from "../../constants";

export default function serviceCard(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [br, setBr] = useState("");
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  const getData = async () => {
    const email = await AsyncStorage.getItem("email");
    const name = await AsyncStorage.getItem("name");
    const br_number = await AsyncStorage.getItem("br");

    setEmail(email);
    setBr(br_number);

    setName(name);
    setloading(false);
  };

  const fetchData = () => {
    fetch(Urls.cn + "/service/")
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setdata(result);
      });
  };

  useEffect(() => {
    fetchData();
    getData();
    console.log(br);
  }, []);

  const renderList = (item) => {
    return (
      <Card
        style={styles.card}
        onPress={() => props.navigation.navigate("packageCard", { item })}
      >
        <Card.Cover style={styles.image} source={{ uri: item.picture }} />
        <Card.Actions>
          <Card.Title
            titleStyle={{ color: COLORS.green }}
            title={item.service_name}
          />
          <Button
            style={styles.editBtn}
            onPress={() =>
              props.navigation.navigate("serviceDetails", { item })
            }
          >
            <Icons
              name="file-document-edit-outline"
              style={{ padding: SIZES.padding }}
              color="#ffffff"
              size={23}
            ></Icons>
          </Button>
        </Card.Actions>
      </Card>
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
                  <Icons
                    name="menu"
                    color="#ffffff"
                    size={30}
                    onPress={() => props.navigation.openDrawer()}
                  />
                  <Text
                    style={{
                      color: COLORS.white,
                      marginTop: -5,
                      marginLeft: 15,
                      fontSize: 25,
                    }}
                  >
                    Services
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
          <View style={styles.scrollcontainer}>
            <FlatList
              style={{ marginTop: 10, marginBottom: 10 }}
              data={data}
              renderItem={({ item }) => {
                return renderList(item);
              }}
              keyExtractor={(item) => item._id.toString()}
              onRefresh={() => fetchData()}
              refreshing={loading}
            />
          </View>
          {/* <FAB
        style={styles.fab2}
        small={true}
        icon="plus"
        onPress={() => props.navigation.navigate("addService",{br})}
      /> */}
          {/* <FAB
        style={styles.fab1}
        small={false}
        icon="plus"
        onPress={() => props.navigation.navigate("addPackage",{br})} 
      /> */}
          <FAB
            style={styles.fab}
            small={false}
            icon="plus"
            onPress={() => props.navigation.navigate("addService", { br })}
          />
          {/* <TouchableOpacity style={styles.addButton1}
        onPress={() => props.navigation.navigate("addPackage",{br})}
      >
        <Text style={styles.addButtonText1}>Add Package</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton}
        onPress={() => props.navigation.navigate("addService",{br})}
      >
        <Text style={styles.addButtonText}>Add Service</Text>
      </TouchableOpacity> */}
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

  card: {
    borderRadius: 23,
    height: 200,
    width: 300,
    marginHorizontal: 30,
    backgroundColor: COLORS.white,
    marginBottom: 15,
  },
  image: {
    marginHorizontal: 0,
    borderTopStartRadius: 23,
    borderTopEndRadius: 23,
    height: 150,
    width: 300,
  },
  // fab2: {
  //   position: "absolute",
  //   backgroundColor: COLORS.darkGreen,
  //   marginBottom: 145,
  //   marginRight: 28,
  //   right: 0,
  //   bottom: 0,
  // },
  // fab1: {
  //   position: "absolute",
  //   backgroundColor: COLORS.darkGreen,
  //   marginBottom: 90,
  //   marginRight: 20,
  //   right: 0,
  //   bottom: 0,
  // },
  fab: {
    position: "absolute",
    backgroundColor: COLORS.green,
    marginBottom: 20,
    marginRight: 20,
    right: 0,
    bottom: 0,
  },
  editBtn: {
    backgroundColor: COLORS.green,
    marginLeft: -60,
    marginTop: -5,
    height: 30,
    justifyContent: "center",
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
