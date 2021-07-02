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
  ScrollView,
  Keyboard,
  Platform,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Card, FAB, Button } from "react-native-paper";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Urls from "../../constant";
import { Ionicons } from "@expo/vector-icons";

export default function ProductDetails(props) {
  const product_name = props.route.params.item.product_name;
  const _id = props.route.params.item._id;
  const product_category = props.route.params.item.product_category;
  const picture = props.route.params.item.picture;
  const unitprice = props.route.params.item.unitprice;
  const quantity = props.route.params.item.quantity;
  const description = props.route.params.item.description;
  const ratingarr = props.route.params.item.rating;
  const loading = false;
  var trating = 0;
  for (let i = 0; i < ratingarr.length; i++) {
    trating += ratingarr[i].rate;
  }
  console.log(trating);
  const deleteProduct = () => {
    fetch(Urls.cn + "/product/" + _id, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(product_name + " is successfuly deleted");
        props.navigation.navigate("Products");
      });
  };

  const showAlert = () =>
    Alert.alert(
      "Warning",
      "Are you sure to delete " + product_name,
      [
        {
          text: "Yes",
          onPress: () => deleteProduct(),
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
                <Ionicons
                  name="arrow-back"
                  size={28}
                  color="white"
                  onPress={() => props.navigation.navigate("Products")}
                />

                <Icons
                  name="bell-outline"
                  style={{ marginRight: 30 }}
                  color="#ffffff"
                  size={30}
                />
              </View>
            </ImageBackground>
            <ScrollView>
              <Card
                style={{
                  paddingBottom: 40,
                  borderBottomLeftRadius: 40,
                  borderBottomRightRadius: 40,
                }}
              >
                <View style={styles.imageContainer}>
                  <ImageBackground
                    style={styles.image}
                    source={{ uri: picture }}
                    imageStyle={{
                      borderBottomRightRadius: 40,
                      borderBottomLeftRadius: 40,
                    }}
                  >
                    <View style={styles.child}>
                      <Text style={styles.welcome}>{product_name}</Text>
                    </View>
                  </ImageBackground>
                </View>
                <View>
                  <View style={styles.dtailcont}>
                    <Text style={styles.dtext1}>Product Catrgory : </Text>
                    <Text style={styles.dtext2}>{product_category}</Text>
                  </View>
                  <View style={styles.dtailcont}>
                    <Text style={styles.dtext1}>Unit Price : </Text>
                    <Text style={styles.dtext2}>LKR {unitprice}.00</Text>
                  </View>
                  <View style={styles.dtailcont}>
                    <Text style={styles.dtext1}>Quantity : </Text>
                    <Text style={styles.dtext2}>{quantity}</Text>
                  </View>
                  <View style={styles.dtailcont}>
                    <Text style={styles.dtext1}>Rating : </Text>
                    <Text style={styles.dtext2}>{trating}</Text>
                  </View>
                  <View style={styles.description}>
                    <Text style={styles.dtext1}>Description : </Text>
                    <Text style={styles.dtext2}>{description}</Text>
                  </View>
                </View>
              </Card>
              <TouchableOpacity
                style={[styles.inputContainer, styles.btn]}
                onPress={() =>
                  props.navigation.navigate("UpdateProduct", {
                    product_name,
                    _id,
                    product_category,
                    picture,
                    unitprice,
                    quantity,
                    description,
                  })
                }
              >
                <Icons name="pencil" size={28} color="white" />
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: "bold",
                    paddingHorizontal: 10,
                  }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.inputContainer,
                  styles.btn,
                  { backgroundColor: "#ff0000", borderColor: "#ff0000" },
                ]}
                onPress={showAlert}
              >
                <Icons name="delete" size={28} color="white" />
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: "bold",
                    paddingHorizontal: 10,
                  }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
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
    backgroundColor: "#8cf9ff",
  },
  header: {
    height: 75,
    width: "100%",
    borderBottomRightRadius: 20,
  },
  welcome: {
    fontSize: 30,
    marginTop: 15,
    fontWeight: "bold",
    marginLeft: 15,
    color: "white",
    width: "100%",
  },
  welcomeContainer: {
    flexDirection: "row",
    height: 75,
    width: "100%",
    marginTop: 20,
    marginLeft: 15,
    paddingBottom: 10,
    justifyContent: "space-between",
  },
  image: {
    marginHorizontal: 0,
    height: 200,
    width: "100%",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  imageContainer: {
    marginHorizontal: 0,
    height: 200,
    width: "100%",
  },
  dtailcont: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderBottomWidth: 2,
    height: 35,
    width: "100%",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomColor: "#c7d3ff",
  },
  description: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 10,
    height: 65,
  },
  dtext1: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 10,
  },
  dtext2: {
    fontSize: 20,
    fontWeight: "600",
    justifyContent: "center",
    marginRight: 10,
    marginLeft: 10,
  },
  child: {
    height: 200,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  btn: {
    backgroundColor: "#306bff",
    justifyContent: "center",
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    borderWidth: 2,
    marginTop: 5,
    paddingHorizontal: 10,
    borderColor: "#306bff",
    borderRadius: 23,
    paddingVertical: 2,
    height: 45,
  },
});
