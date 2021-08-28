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
import Urls from "../../constant";
import { SIZES, COLORS, icons } from "../../constants";

export default function Partners_Products(props) {
  const [email, setEmail] = useState("");
  const [company_name, setName] = useState("");
  const [br, setBr] = useState("");
  const [cmpcategory, setCategory] = useState("");
  const [cmpbr, setCBr] = useState("");
  const [flag, setflag] = useState("");
  const [pflag, setpflag] = useState("");
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const getData = async () => {
    const email = props.route.params.item.email;
    const company_name = props.route.params.item.company_name;
    const company_br = props.route.params.item.br_number;
    const br = await AsyncStorage.getItem("br");
    const rflag = props.route.params.flag;
    const pflag = props.route.params.pflag;
    const cmp = await AsyncStorage.getItem("category");
    setEmail(email);
    setflag(rflag);
    setpflag(pflag);
    setBr(br);
    setCategory(cmp);
    setCBr(company_br);
    setName(company_name);
    fetch(Urls.cn + "/product/br/" + company_br)
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
                    style={{
                      color: COLORS.white,
                      marginLeft: 10,
                      fontSize: 25,
                    }}
                  >
                    Products
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
              onRefresh={() => getData()}
              refreshing={loading}
            />
          </View>
          <FAB
            style={styles.fab}
            small={false}
            icon="account-outline"
            onPress={() =>
              props.navigation.navigate("Partners_Business_Profile", {
                cmpbr,
                email,
                flag,
                pflag,
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
