import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Picker,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, COLORS, icons } from "../constants";
import { Card } from "react-native-paper";
import Urls from "../constant";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default function AddMember(props) {
  const [member_name, setMname] = useState("");
  const [nic, setNIC] = useState("");
  const [picture, setPicture] = useState(
    "https://res.cloudinary.com/hiruna/image/upload/v1625729331/startupHub/PngItem_4212266_rd09ab.png"
  );
  const [memail, setMemail] = useState("");
  const br_number = props.route.params.br;
  const company_category = props.route.params.cmpcategory;
  const email = props.route.params.email;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  const pickImage = async () => {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
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
  function randnum () {
      const max = 99999;
      const min = 10000;
    return Math.floor(Math.random() * (max - min)) + min;
  }
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
  const submitData = () => {
    var password = randnum().toString();
    var acctype = "member";
    console.log(password);
    fetch(Urls.cn + "/users/signup", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          br_number,
          email: memail,
          name: member_name,
          password,
          accountType : acctype,

        }),
      }).then((res) => res.json())
      .then((data) => {
        Alert.alert("Created Successfully");
        props.navigation.navigate("Members");
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
              onPress={() => props.navigation.navigate("Members")}
            >
              <Image
                source={icons.leftArrow}
                resizeMode="contain"
                style={{ width: 25, height: 25, tintColor: COLORS.white }}
              />
            </TouchableOpacity>
            <Text style={{ color: COLORS.white, marginLeft: 10, fontSize: 25 }}>
              Add Product
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
        
        <View style={styles.inputContainer}>
          <TextInput
            style={{
              paddingHorizontal: 10,
              color: COLORS.green,
              fontSize: 20,
            }}
            placeholder="Member Name"
            placeholderTextColor={COLORS.primary}
            value={member_name}
            onChangeText={(text) => setMname(text)}
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
            placeholderTextColor={COLORS.primary}
            value={memail}
            onChangeText={(text) => setMemail(text)}
          />
        </View>
       
        <TouchableOpacity
          style={[
            styles.inputContainer,
            styles.btn,
            { borderColor: COLORS.green },
          ]}
          onPress={submitData}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Create Account
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    borderRadius: 23,
    height: 200,
    width: "100%",
  },
  card: {
    borderRadius: 23,
    height: 200,
    width: 300,
  },
  image: {
    marginHorizontal: 0,
    borderRadius: 23,
    height: 200,
    width: 300,
    resizeMode: "contain",
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
