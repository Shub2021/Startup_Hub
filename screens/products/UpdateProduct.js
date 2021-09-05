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
import Input from "../../components/Input";

export default function UpdateProduct(props) {
  const product_id = props.route.params._id;
  const [product_namevalid, setPnamevalid] = useState(true);
  const [product_name, setPname] = useState(props.route.params.product_name);
  const [picture, setPicture] = useState(props.route.params.picture);
  const [unitprice, setUprice] = useState(
    props.route.params.unitprice.toString()
  );
  const [unitpricevalid, setUpricevalid] = useState(true);
  const [quantity, setQuantity] = useState(
    props.route.params.quantity.toString()
  );
  const [quantityvalid, setQuantityvalid] = useState(true);
  const [description, setDescription] = useState(
    props.route.params.description
  );
  const [expence, setExpence] = useState(props.route.params.expence.toString());
  const [expencevalid, setExpencevalid] = useState(true);
  const [product_category, setPCategory] = useState(
    props.route.params.product_category
  );
  const [product_categoryvalid, setPCategoryvalid] = useState(true);

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
    if (
      product_namevalid &&
      product_categoryvalid &&
      unitpricevalid &&
      expencevalid &&
      quantityvalid
    ) {
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
          expence,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          Alert.alert(product_name + " is successfuly added");
          props.navigation.navigate("Products");
        });
    } else {
      Alert.alert("Please fill the required feilds");
    }
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
        </View>
      </SafeAreaView>
      <ScrollView style={styles.scrollcontainer}>
        <View style={styles.imageContainer}>
          <Card style={styles.card} onPress={pickImage}>
            <Card.Cover style={styles.image} source={{ uri: picture }} />
          </Card>
        </View>
        <View style={styles.inputContainer}>
          <Input
            style={{
              paddingHorizontal: 10,
              color: COLORS.green,
              fontSize: 20,
            }}
            placeholder="Product Name"
            placeholderTextColor={COLORS.green}
            pattern={"[^s]"}
            onValidation={(isValid) => setPnamevalid(isValid)}
            value={product_name}
            onChangeText={(text) => setPname(text)}
          />
        </View>
        <View style={{ marginHorizontal: 50, height: 10 }}>
          {!product_namevalid ? (
            <Text style={{ color: COLORS.red }}>Required</Text>
          ) : (
            <Text></Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Input
            style={{
              paddingHorizontal: 10,
              color: COLORS.green,
              fontSize: 20,
            }}
            placeholder="Product Category"
            placeholderTextColor={COLORS.green}
            value={product_category}
            pattern={"[^s]"}
            onValidation={(isValid) => setPCategoryvalid(isValid)}
            onChangeText={(text) => setPCategory(text)}
          />
        </View>
        <View style={{ marginHorizontal: 50, height: 10 }}>
          {!product_categoryvalid ? (
            <Text style={{ color: COLORS.red }}>Required</Text>
          ) : (
            <Text></Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Input
            style={{
              paddingHorizontal: 10,
              color: COLORS.green,
              fontSize: 20,
            }}
            placeholder="Unit Price"
            placeholderTextColor={COLORS.green}
            pattern={"^([1-9]{1,}[0-9]{0,})$"}
            onValidation={(isValid) => setUpricevalid(isValid)}
            keyboardType="number-pad"
            value={unitprice}
            onChangeText={(text) => setUprice(text)}
          />
        </View>
        <View style={{ marginHorizontal: 50, height: 10 }}>
          {unitprice === "" ? (
            <Text style={{ color: COLORS.red }}>Required</Text>
          ) : !unitpricevalid ? (
            <Text style={{ color: COLORS.red }}>Invalid Unit Price</Text>
          ) : (
            <Text style={{ color: COLORS.red }}></Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Input
            style={{
              paddingHorizontal: 10,
              color: COLORS.green,
              fontSize: 20,
            }}
            placeholder="Unit Cost"
            placeholderTextColor={COLORS.green}
            pattern={"^([1-9]{1,}[0-9]{0,})$"}
            onValidation={(isValid) => setExpencevalid(isValid)}
            keyboardType="number-pad"
            value={expence}
            onChangeText={(text) => setExpence(text)}
          />
        </View>
        <View style={{ marginHorizontal: 50, height: 10 }}>
          {expence === "" ? (
            <Text style={{ color: COLORS.red }}>Required</Text>
          ) : !expencevalid || expence >= unitprice ? (
            <Text style={{ color: COLORS.red }}>Invalid Unit Cost</Text>
          ) : (
            <Text style={{ color: COLORS.red }}></Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{
              paddingHorizontal: 10,
              color: COLORS.green,
              fontSize: 20,
            }}
            placeholder="Quantity"
            placeholderTextColor={COLORS.green}
            pattern={"^([1-9]{1,}[0-9]{0,})$"}
            onValidation={(isValid) => setQuantityvalid(isValid)}
            keyboardType="number-pad"
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
          />
        </View>
        <View style={{ marginHorizontal: 50, height: 10 }}>
          {quantity === "" ? (
            <Text style={{ color: COLORS.red }}>Required</Text>
          ) : !quantityvalid ? (
            <Text style={{ color: COLORS.red }}>Invalid Unit Cost</Text>
          ) : (
            <Text style={{ color: COLORS.red }}></Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{
              paddingHorizontal: 10,
              color: COLORS.green,
              fontSize: 20,
            }}
            placeholder="Description"
            placeholderTextColor={COLORS.green}
            value={description}
            onChangeText={(text) => setDescription(text)}
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
