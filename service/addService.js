import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
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
  Alert,
} from "react-native";
import Constants from "expo-constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { AntDesign,Feather,Ionicons } from '@expo/vector-icons'; 
import { Appbar, Card } from "react-native-paper";
import { Value } from "react-native-reanimated";
import { SIZES, COLORS, icons } from "../../constants";
import Urls from "../../constant";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Note from "./Note";



export default function addService(props) {
  const [Service_type, setStype] = useState("");
  const [picture, setPicture] = useState(
    "https://res.cloudinary.com/hiruna/image/upload/c_fit,w_700/v1624803256/90343213-aquamarine-blue-rounded-arrow-up-in-light-blue-circle-icon-flat-upload-sign-isolated-on-white-point-_tzzhnf.jpg"
  );
  const [Service_name, setSname] = useState("");
  // const [quantity, setQuantity] = useState("");
  const [Description, setDescription] = useState("");
  // const [product_category, setPCategory] = useState("");
  const br_number = props.route.params.br;
  // const name = props.route.params.name;
  // const email = props.route.params.email;
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
    fetch(Urls.cn + "/service/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Service_name,
        Service_type,
        picture,
        // unitprice,
        // quantity,
        Description,
        br_number,
      }),
    })
      .then((res) => res.json())
      .then((item) => {
        Alert.alert(Service_name+"is successfuly added");
        props.navigation.navigate("packageCard",{item});
      });
    console.log(br_number+"ggfffg");
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
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                top: -5,
                left: 0,
                padding: 10,
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
            <Text style={{ color: COLORS.white, marginLeft: 10, fontSize: 25 }}>
              Add Service
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
      <Card style={styles.card} onPress={pickImage}>
        <Card.Cover style={styles.image} source={{ uri: picture }} />
      </Card>
    </View>


      <View style={styles.inputContainer}>
        <TextInput
          style={{ paddingHorizontal: 10, color: COLORS.yellow, fontSize: 20 }}
          placeholder="Service Type"
          placeholderTextColor={COLORS.primary}
          value={Service_type}
          onChangeText={(text) => setStype(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ paddingHorizontal: 10, color: COLORS.yellow, fontSize: 20 }}
          placeholder="Service Name"
          placeholderTextColor={COLORS.primary}
          value={Service_name}
          onChangeText={(text) => setSname(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ paddingHorizontal: 10, color: COLORS.yellow, fontSize: 20 }}
          placeholder="Description"
          placeholderTextColor={COLORS.primary}
          value={Description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>
      
    

      {/* <View style={styles.inputContainer}>
        <TextInput
          style={{ paddingHorizontal: 10, color: COLORS.yellow, fontSize: 20 }}
          placeholder="Features plan"
          placeholderTextColor={COLORS.primary}
          //value={Description}
          //onChangeText={(text) => setDescription(text)}
        />
      </View> */}
      
      <TouchableOpacity style={[styles.inputContainer, styles.btn]}
        onPress={submitData}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold",textShadowOffset: {width: 1, height: 1},textShadowRadius: 1,textShadowColor: 'black',}}>
         Add Service
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
    borderWidth: 2,
    marginTop: 24,
    left: 40,
    paddingHorizontal: 10,
    borderColor: COLORS.lightGreen,
    borderRadius: 23,
    paddingVertical: 2,
    height: 45,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 24,
    borderRadius: 23,
    height: 200,
    width: 300,
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
    backgroundColor: COLORS.darkGreen,
    justifyContent: "flex-start",
    paddingLeft: 20,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 4,
  },
  // btn1: {
  //   backgroundColor: COLORS.darkGreen,
  //   justifyContent: "flex-start",
  //   paddingLeft: 20,
  //   alignItems: "center",
  //   marginTop: 24,
  //   marginBottom: 4,
  // },
  scrollcontainer: {
    flex: 1,
    marginTop: -22,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    backgroundColor: COLORS.secondary,
  },
});
