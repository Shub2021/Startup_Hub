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
import { SIZES, COLORS, icons } from "../../constants";

export default function serviceDetails(props) {
  const Description = props.route.params.item.Description;
  const _id = props.route.params.item._id;
  const service_type = props.route.params.item.service_type;
  const picture = props.route.params.item.picture;
  // const unitprice = props.route.params.item.unitprice;
  // const quantity = props.route.params.item.quantity;
  const service_name = props.route.params.item.service_name;
  const loading = false;
  // console.log(dis);

  const deleteservice = () => {
    fetch(Urls.cn + "/service/" + _id, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(service_name + " is successfuly deleted");
        props.navigation.navigate("ServiceCard");
      });
  };

  const showAlert = () =>
    Alert.alert(
      "Warning",
      "Are you sure to delete " + service_name,
      [
        {
          text: "Yes",
          onPress: () => deleteservice(),
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
        <ScrollView >
        
          <View
            style={{
              width: "100%",
              height: 280,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                position: "absolute",
                top: 0,
                // width:320,
                bottom: 0,
                right: 0,
                left: 40,
                borderBottomLeftRadius: 100,
                backgroundColor: COLORS.primary,
              }}
            />
            <Image
              source={{ uri: picture }}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                left: 40,
                borderBottomLeftRadius: 100,
              }}
            />
            {/* back Button */}
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: 25,
                left: 20,
                padding: 10,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.black,
              }}
              onPress={() => props.navigation.navigate("ServiceCard")}
            >
              <Image
                source={icons.leftArrow}
                resizeMode="contain"
                style={{ width: 25, height: 25, tintColor: COLORS.white }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 15,
              marginTop: SIZES.padding,
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ 
                color: COLORS.lightYellow,
                 fontSize: 28 }}>
                {service_name}
              </Text>
              <Text
                style={{
                  marginTop: SIZES.base,
                  color: COLORS.white,
                  fontSize: 18,
                }}
              >
                {Description}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: SIZES.base * 2,
              }}
            >
              <Text style={{ color: COLORS.yellow, fontSize: 23 }}>
                Category
              </Text>
              <Text style={{ color: COLORS.primary, fontSize: 23 }}>
                {service_type}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: COLORS.yellow, fontSize: 23 }}>
                Rating
              </Text>
              <Text style={{ color: COLORS.primary, fontSize: 23 }}>
                {/* {trating} */}
                STARS 5
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              marginTop: SIZES.padding * 2,
              justifyContent: "space-between",
            }}
          ></View>
        </ScrollView>
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity
            style={[
              styles.inputContainer,
              styles.btn,
              {
                backgroundColor: COLORS.darkGreen,
                borderColor: COLORS.darkGreen,
              },
            ]}
            onPress={() =>
              props.navigation.navigate("updateService", {
                service_name,
                _id,
                service_type,
                picture,
                // unitprice,
                // quantity,
                Description,
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
  backgroundColor: COLORS.secondary,
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
  borderRadius: 23,
  right: 85,
  paddingVertical: 2,
  height: 45,
},
});