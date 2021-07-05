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
import { SIZES, COLORS, icons } from "../../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import Urls from "../../constant";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default function UpdateProduct(props) {
  const product_id = props.route.params._id;
  const [product_name, setPname] = useState(props.route.params.product_name);
  const [picture, setPicture] = useState(props.route.params.picture);
  const [unitprice, setUprice] = useState(
    props.route.params.unitprice.toString()
  );
  const [quantity, setQuantity] = useState(
    props.route.params.quantity.toString()
  );
  const [description, setDescription] = useState(
    props.route.params.description
  );
  const [product_category, setPCategory] = useState(
    props.route.params.product_category
  );

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
  const updateData = () => {
    fetch(Urls.cn + "/product/" + product_id, {
      method: "patch",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name,
        product_category,
        picture,
        unitprice,
        quantity,
        description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(product_name + " is successfuly added");
        props.navigation.navigate("Products");
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
              onPress={() => props.navigation.navigate("Products")}
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
        <View style={styles.imageContainer}>
          <Card style={styles.card} onPress={pickImage}>
            <Card.Cover style={styles.image} source={{ uri: picture }} />
          </Card>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{
              paddingHorizontal: 10,
              color: COLORS.yellow,
              fontSize: 20,
            }}
            placeholder="Product Name"
            placeholderTextColor={COLORS.primary}
            value={product_name}
            onChangeText={(text) => setPname(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{
              paddingHorizontal: 10,
              color: COLORS.yellow,
              fontSize: 20,
            }}
            placeholder="Product Category"
            placeholderTextColor={COLORS.primary}
            value={product_category}
            onChangeText={(text) => setPCategory(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{
              paddingHorizontal: 10,
              color: COLORS.yellow,
              fontSize: 20,
            }}
            placeholder="Unit Price"
            placeholderTextColor={COLORS.primary}
            keyboardType="number-pad"
            value={unitprice}
            onChangeText={(text) => setUprice(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{
              paddingHorizontal: 10,
              color: COLORS.yellow,
              fontSize: 20,
            }}
            placeholder="Quantity"
            placeholderTextColor={COLORS.primary}
            keyboardType="number-pad"
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{
              paddingHorizontal: 10,
              color: COLORS.yellow,
              fontSize: 20,
            }}
            placeholder="Description"
            placeholderTextColor={COLORS.primary}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.inputContainer,
            styles.btn,
            { borderColor: COLORS.darkGreen },
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
    marginHorizontal: 35,
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
    marginTop: 40,
    marginBottom: 10,
  },
  scrollcontainer: {
    flex: 1,
    marginTop: -22,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    backgroundColor: COLORS.secondary,
  },
});
