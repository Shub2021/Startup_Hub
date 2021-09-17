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
  SafeAreaView,
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
import { SIZES, COLORS, icons } from "../../constants";

export default function ProductDetails(props) {
  const product_name = props.route.params.item.product_name;
  const _id = props.route.params.item._id;
  const product_category = props.route.params.item.product_category;
  const picture = props.route.params.item.picture;
  const unitprice = props.route.params.item.unitprice;
  const quantity = props.route.params.item.quantity;
  const description = props.route.params.item.description;
  const expence = props.route.params.item.expence;
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
                    onPress={() => props.navigation.navigate("Products")}
                  >
                    <Image
                      source={icons.leftArrow}
                      resizeMode="contain"
                      style={{ width: 23, height: 23, tintColor: COLORS.white }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: COLORS.white,
                      marginLeft: 10,
                      fontSize: 23,
                    }}
                  >
                    Product Details
                  </Text>
                </View>
              </View>
            </SafeAreaView>
          </KeyboardAvoidingView>
          <ScrollView ScrollView style={styles.scrollcontainer}>
            <View
              style={{
                width: "100%",
                height: 250,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  borderTopLeftRadius: 23,
                  borderTopRightRadius: 23,
                  backgroundColor: COLORS.white,
                }}
              />
              <Image
                source={{ uri: picture }}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  borderRadius: 23,
                  zIndex: 0,
                }}
              />
              {/* back Button */}
            </View>
            <View
              style={{
                flex: 1,
                paddingHorizontal: 15,
                marginTop: SIZES.padding / 2,
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    color: COLORS.green,
                    fontSize: 28,
                    fontWeight: "700",
                  }}
                >
                  {product_name}
                </Text>
                <Text
                  style={{
                    marginTop: SIZES.base,
                    color: COLORS.green,
                    fontSize: 18,
                  }}
                >
                  {description}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: SIZES.base * 2,
                }}
              >
                <Text style={{ color: COLORS.black, fontSize: 20 }}>
                  Category
                </Text>
                <Text style={{ color: COLORS.green, fontSize: 20 }}>
                  {product_category}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: COLORS.black, fontSize: 20 }}>
                  Unit Price
                </Text>
                <Text style={{ color: COLORS.green, fontSize: 20 }}>
                  LKR {unitprice}.00
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: COLORS.black, fontSize: 20 }}>
                  Quantity
                </Text>
                <Text style={{ color: COLORS.green, fontSize: 20 }}>
                  {quantity}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                marginTop: SIZES.padding,
                justifyContent: "space-between",
              }}
            ></View>
            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity
                style={[
                  styles.inputContainer,
                  styles.btn,
                  {
                    backgroundColor: COLORS.green,
                    borderColor: COLORS.green,
                  },
                ]}
                onPress={() =>
                  props.navigation.navigate("UpdateProduct", {
                    product_name,
                    _id,
                    product_category,
                    picture,
                    unitprice,
                    quantity,
                    description,
                    expence,
                  })
                }
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.inputContainer,
                  styles.btn,
                  {
                    backgroundColor: COLORS.red,
                    borderColor: COLORS.red,
                  },
                ]}
                onPress={showAlert}
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      ) : (
        <ActivityIndicator size="large" color={COLORS.primary} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  btn: {
    backgroundColor: "#306bff",
    justifyContent: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    marginTop: 18,
    paddingHorizontal: 20,
    borderColor: "#306bff",
    borderRadius: 15,
    right: 85,
    paddingVertical: 2,
    height: 45,
  },
  scrollcontainer: {
    flex: 1,
    marginTop: -22,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    backgroundColor: COLORS.white,
  },
});
