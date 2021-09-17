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
  Platform,
  TouchableOpacity,
} from "react-native";
import { Card, FAB, Title } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Urls from "../constant";
import { SIZES, COLORS, icons } from "../constants";

export default function Agrement(props) {
  const [loading, setloading] = useState(true);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState(props.route.params.item.email);
  const [br, setbr] = useState(props.route.params.br);

  const getData = () => {
    const e = props.route.params.item.email;
    const b = props.route.params.br;
    console.log(br);
    console.log(email);
    fetch(Urls.cn + "/postplan/br/" + b + "/" + e)
      .then((response) => response.json())
      .then((json) => {
        setData(json[0]);
        console.log(json[0]);
        setloading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);
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
                    onPress={() => props.navigation.navigate("Investors")}
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
                    Agreement
                  </Text>
                </View>
              </View>
            </SafeAreaView>
          </KeyboardAvoidingView>
          <View style={styles.scrollcontainer}>
            <Card style={styles.investCard}>
              <Text></Text>
              <Title>01) Investment Amount</Title>
              <Text style={styles.filed}>{data.amount} LKR</Text>

              <Title>02) Investment Period</Title>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text style={styles.filed}>{data.time}</Text>
                </View>
              </View>

              <Title>03) Interest Rate</Title>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text style={styles.title}>Monthly</Text>
                  <Text style={styles.filed}>{data.interestRate} %</Text>
                </View>
              </View>
              <Title>04) Description</Title>
              <Text style={styles.descriptionStyle}>{data.information}</Text>
            </Card>
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

  image: {
    marginHorizontal: 0,

    borderTopStartRadius: 23,
    borderTopEndRadius: 23,
    height: 150,
    width: 300,
  },
  investCard: {
    padding: 15,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    backgroundColor: COLORS.yellow,
    elevation: 4,
  },

  title: {
    marginRight: 150,
    fontWeight: "bold",
  },

  filed: {
    fontSize: 17,
    lineHeight: 25,
    marginBottom: 10,
  },

  descriptionStyle: {
    fontSize: 17,
    lineHeight: 23,
    marginBottom: 15,
  },
  scrollcontainer: {
    flex: 1,
    marginTop: -22,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    backgroundColor: COLORS.white,
  },
});
