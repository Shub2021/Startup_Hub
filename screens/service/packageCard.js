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
  Animated
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
  const [data, setdata] = useState();
  const [loading, setloading] = useState(true);

  const service_name = props.route.params.item.service_name;
  const picture = props.route.params.item.picture;
  const id = props.route.params.item._id;

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
    fetch(Urls.cn + "/service/"+id)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setdata(result.package);
      });
  };
  
  useEffect(() => {
    fetchData();
    getData();
    console.log(br);
  }, []);
  
  const renderList = (item) => {
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
        {/* <Text style={{ color: COLORS.lightYellow, fontSize: 24 }}>
          {service_name}
        </Text> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 5,
          }}
        >
          <Text style={{ color: COLORS.white, fontSize: 18 }}>
            {service_name}
          </Text>
          <Text style={{ color: COLORS.white, fontSize: 18 }}>
          {item.Package_type}
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
            LKR .00
          </Text>
        </View>
      </TouchableOpacity>
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
                <TouchableOpacity
                  style={{
                   // alignItems: "center",
                    //justifyContent: "center",
                    position: "relative",
                    top: 8,
                    left: 0,
                    paddingRight: 5,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.darkGreen,
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
                  {service_name}Package
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
          <Image
                
               style={styles.image}  source={{ uri:picture}}
            />
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
      
      <FAB
        style={styles.fab}
        small={false}
        icon="plus"
        onPress={() => props.navigation.navigate("addPackage",{br,data})}
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
    backgroundColor: COLORS.gray3,
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
    backgroundColor: COLORS.yellow,
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
    backgroundColor: COLORS.secondary,
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: COLORS.yellow,
    width: 60,
    height: 60,
    marginBottom: -70,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
},
addButtonText: {
    textAlign: "center",
    color: COLORS.black,
    fontSize: 12,
    fontWeight: "bold",
},
addButton1: {
  position: 'absolute',
  zIndex: 11,
  right: 20,
  bottom: 90,
  backgroundColor: COLORS.darkGreen,
  width: 60,
  height: 60,
  borderRadius: 50,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 5,
},
addButtonText1: {
  textAlign: "center",
  color: COLORS.white,
  fontSize: 12,
  fontWeight: "bold",
},
});
