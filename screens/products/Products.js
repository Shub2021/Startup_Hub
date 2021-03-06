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
  Keyboard,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Card, FAB } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Urls from "../../constant";
import { SIZES, COLORS, icons } from "../../constants";

export default function Products(props) {
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
    fetch(Urls.cn + "/product/br/" + br)
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
  const renderList = (item) => {
    return (
      <Card
        style={styles.card}
        onPress={() => props.navigation.navigate("ProductDetails", { item })}
      >
        <Card.Cover style={styles.image} source={{ uri: item.picture }} />
        <Card.Title
          title={item.product_name}
          titleStyle={{ color: COLORS.green }}
        />
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
                      marginLeft: 10,
                      fontSize: 25,
                    }}
                  >
                    Products
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
              props.navigation.navigate("Add Product", {
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

  card: {
    borderRadius: 23,
    height: 200,
    width: 300,
    marginHorizontal: 30,
    backgroundColor: COLORS.white,
    marginBottom: 15,
    elevation: 4,
  },
  image: {
    marginHorizontal: 0,

    borderTopStartRadius: 23,
    borderTopEndRadius: 23,
    height: 150,
    width: 300,
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
