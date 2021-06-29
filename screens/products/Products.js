import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
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

export default function Products(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [br, setBr] = useState("");
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const getData = async () => {
    const email = await AsyncStorage.getItem("email");
    const name = await AsyncStorage.getItem("name");
    const br = await AsyncStorage.getItem("br");
    setEmail(email);
    setBr(br);
    setName(name);
    setloading(false);
  };
  const fetchData = () => {
    fetch(Urls.cn + "/product/")
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setdata(result);
      });
  };
  useEffect(() => {
    fetchData();
    getData();
  }, []);
  const renderList = (item) => {
    return (
      <Card
        style={styles.card}
        onPress={() => props.navigation.navigate("ProductDetails", { item })}
      >
        <Card.Cover style={styles.image} source={{ uri: item.picture }} />
        <Card.Title title={item.product_name} />
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
            <ImageBackground
              source={require("../../assets/img1.png")}
              style={styles.header}
            >
              <View style={styles.welcomeContainer}>
                <Icons
                  name="menu"
                  color="#ffffff"
                  size={30}
                  onPress={() => props.navigation.openDrawer()}
                />
                <Text style={styles.welcome}>Products</Text>
                <Icons
                  name="bell-outline"
                  style={{ marginLeft: 110 }}
                  color="#ffffff"
                  size={30}
                />
              </View>
            </ImageBackground>
          </KeyboardAvoidingView>
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
          <FAB
            style={styles.fab}
            small={false}
            icon="plus"
            onPress={() =>
              props.navigation.navigate("Add Product", { br, email, name })
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
    marginBottom: 15,
  },
  image: {
    marginHorizontal: 0,
    borderRadius: 23,
    borderTopStartRadius: 23,
    borderTopEndRadius: 23,
    height: 150,
    width: 300,
  },
  fab: {
    position: "absolute",
    backgroundColor: "#4800ff",
    marginBottom: 20,
    marginRight: 20,
    right: 0,
    bottom: 0,
  },
});
