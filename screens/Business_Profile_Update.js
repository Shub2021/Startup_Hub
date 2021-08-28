import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { SIZES, COLORS, icons } from "../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import Urls from "../constant";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default function UpdateProduct(props) {
  const company_id = props.route.params.data._id;
  const [company_name, setCname] = useState(props.route.params.data.company_name);
  const [image, setPicture] = useState(props.route.params.data.image);
  const [email, setEmail] = useState(props.route.params.data.email);
  const [address, setAddress] = useState(props.route.params.data.address);
  const [location, setLocation] = useState(props.route.params.data.location);
  const [contact, setMobile] = useState(props.route.params.data.contact);

  //   const name = props.route.params.name;
  //   const email = props.route.params.email;

  useEffect(() => {
    async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    };
    //let pname = props.route.params.product_name;
    //setPname(pname);
  }, []);
  const pickImage = async () => {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 1,
    });

    //console.log(data);

    if (!data.cancelled) {
      let newfile = {
        uri: data.uri,
        type: `test/${data.uri.split(".")[1]}`,
        name: `test/${data.uri.split(".")[1]}`,
      };
      handleUpload(newfile);
    }
  };
  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "StartupHub");
    data.append("cloud_name", "hiruna");

    fetch("https://api.cloudinary.com/v1_1/hiruna/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setPicture(data.url);
      });
  };
  const updateData = () => {
    fetch(Urls.cn + "/company/" + company_id, {
      method: "patch",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company_name,
        contact,
        address,
        image,
        location,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("Updated Successfully");
        props.navigation.navigate("Business_Profile");
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
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
              onPress={() => props.navigation.navigate("Business_Profile")}
            >
              <Image
                source={icons.leftArrow}
                resizeMode="contain"
                style={{ width: 25, height: 25, tintColor: COLORS.white }}
              />
            </TouchableOpacity>
            <Text style={{ color: COLORS.white, marginLeft: 10, fontSize: 25 }}>
              Edit Business Profile
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
      <ScrollView style={styles.scrollcontainer}>
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.image} onPress={pickImage}>
            <Image style={styles.image} source={{ uri: image }} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{
              paddingHorizontal: 10,
              color: COLORS.green,
              fontSize: 20,
            }}
            placeholder="Company Name"
            placeholderTextColor={COLORS.green}
            value={company_name}
            onChangeText={(text) => setCname(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{
              paddingHorizontal: 10,
              color: COLORS.green,
              fontSize: 20,
            }}
            placeholder="Email"
            placeholderTextColor={COLORS.green}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{
              paddingHorizontal: 10,
              color: COLORS.green,
              fontSize: 20,
            }}
            placeholder="Contact"
            keyboardType="number-pad"
            placeholderTextColor={COLORS.green}
            value={contact}
            onChangeText={(text) => setMobile(text)}
          />
        </View>
        {/* <View style={styles.inputContainer}>
          <TextInput
            style={{
              paddingHorizontal: 10,
              color: COLORS.green,
              fontSize: 20,
            }}
            placeholder="Phone Number"
            placeholderTextColor={COLORS.green}
            keyboardType="number-pad"
            value={mobile}
            onChangeText={(text) => setMobile(text)}
          />
        </View> */}
        <View style={styles.inputContainer}>
          <TextInput
            style={{
              paddingHorizontal: 10,
              color: COLORS.green,
              fontSize: 20,
            }}
            placeholder="Address"
            placeholderTextColor={COLORS.green}
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.inputContainer,
            styles.btn,
            { borderColor: COLORS.green },
          ]}
          onPress={updateData}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Save
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    marginTop: 24,
    left: 40,
    paddingHorizontal: 10,
    borderColor: COLORS.green,
    borderRadius: 15,
    paddingVertical: 2,
    height: 45,
  },
  imageContainer: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 23,
    height: 250,
    width: "100%",
  },
  image: {
    marginHorizontal: 0,
    height: 200,
    width: "100%",
    borderBottomLeftRadius: 23,
    borderBottomRightRadius: 23,
  },
  card: {
    borderRadius: 200,
    height: 200,
    width: 200,
  },
  btn: {
    backgroundColor: COLORS.green,
    justifyContent: "flex-start",
    paddingLeft: 20,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  scrollcontainer: {
    flex: 1,
    marginTop: -22,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    backgroundColor: COLORS.white,
  },
});
