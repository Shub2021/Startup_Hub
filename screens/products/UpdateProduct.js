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
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import Urls from "../../constant";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default function UpdateProduct(props) {
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
    fetch(Urls.cn + "/product/", {
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
      <ImageBackground
        source={require("../../assets/img1.png")}
        style={styles.header}
        imageStyle={{ borderBottomRightRadius: 30 }}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <Ionicons
              name="arrow-back"
              size={28}
              color="white"
              onPress={() => props.navigation.navigate("ProductDetails")}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Update Product</Text>
        </View>
      </ImageBackground>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Card style={styles.card} onPress={pickImage}>
            <Card.Cover style={styles.image} source={{ uri: picture }} />
          </Card>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Product Name"
            value={product_name}
            onChangeText={(text) => setPname(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Product Category"
            value={product_category}
            onChangeText={(text) => setPCategory(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Unit Price"
            value={unitprice}
            onChangeText={(text) => setUprice(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Quantity"
            keyboardType="number-pad"
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>

        <TouchableOpacity
          style={[styles.inputContainer, styles.btn]}
          onPress={submitData}
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
  header: {
    height: 70,
    width: "100%",
    borderBottomRightRadius: 70,
    borderBottomLeftRadius: 70,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  headerContainer: {
    height: 70,
    width: "100%",
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 35,
    borderWidth: 2,
    marginTop: 24,
    paddingHorizontal: 10,
    borderColor: "#306bff",
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
    backgroundColor: "#306bff",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  registerbtn: {
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
