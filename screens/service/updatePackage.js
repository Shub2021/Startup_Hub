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
import Constants from "expo-constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { Appbar, Card } from "react-native-paper";
import { Value } from "react-native-reanimated";
import Urls from "../../constant";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { SIZES, COLORS, icons } from "../../constants";
import Input from "../../components/Input";

export default function updatePackage(props) {
  const service_id = props.route.params.id;
  const package_id = props.route.params.item._id;
  const [data, setdata] = useState(props.route.params.data);
  const [price, setPrice] = useState(props.route.params.item.price.toString());
  const [priceValid, setPriceValid] = useState(true);
  const [pk_type, setType] = useState(props.route.params.item.Package_type);
  const [pk_typeValid, setTypeValid] = useState(true);
  const [Description, setDescription] = useState(props.route.params.item.pk_discription);
  const [DescriptionValid, setDescriptionValid] = useState(true);
  const package1 = [{_id:package_id,Package_type:pk_type,price:price,pk_discription:Description}];
  const br_number = props.route.params.br;



  const updateData = () => {
    if(
      priceValid &&
      pk_typeValid &&
      DescriptionValid 
    ){
    let arr=[];
        for(let i=0;i<data.length;i++){ 
            if(data[i]._id !== package_id){
                arr=arr.concat(data[i]);
            }
            if(data[i]._id === package_id){
                arr=arr.concat(package1);
            }
            
        }
        console.log(arr);


        fetch(Urls.cn + "/service/package/"+service_id, {
          method: "patch",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            package:arr,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            Alert.alert("updated");
            props.navigation.navigate("packageCard");
          });
    }else{
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
              onPress={() => props.navigation.navigate("packageCard")}
            >
              <Image
                source={icons.leftArrow}
                resizeMode="contain"
                style={{ width: 25, height: 23, tintColor: COLORS.white }}
              />
            </TouchableOpacity>
            <Text style={{ color: COLORS.white, marginLeft: 10, fontSize: 23 }}>
              Update Package
            </Text>
          </View>
          
        </View>
      </SafeAreaView>
      <ScrollView style={styles.scrollcontainer}>
        <View style={styles.inputContainer}>
          <Input
            style={{
              paddingHorizontal: 10,
              color: COLORS.green,
              fontSize: 20,
            }}
            placeholder="Price"
            placeholderTextColor={COLORS.gray}
            value={price}
            pattern={"^([1-9]{1,}[0-9]{0,})$"}
            onValidation={(isValid) => setPriceValid(isValid)}
            onChangeText={(text) => setPrice(text)}
          />
        </View>
        <View style={{ marginHorizontal: 50, height: 10 }}>
          {price === "" ? (
            <Text style={{ color: COLORS.red }}>Required</Text>
          ) : !priceValid ? (
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
            value={pk_type}
            pattern={"[^s]"}
            onValidation={(isValid) => setTypeValid(isValid)}
            placeholder="Package Type"
            placeholderTextColor={COLORS.gray}
            
            onChangeText={(text) => setType(text)}
          />
        </View>
        <View style={{ marginHorizontal: 50, height: 10 }}>
          {!pk_typeValid ? (
            <Text style={{ color: COLORS.red }}>Required</Text>
          ) : (
            <Text></Text>
          )}
        </View>

        <View style={styles.inputContainer_des}>
          <Input
            style={{
              paddingHorizontal: 10,
              color: COLORS.green,
              fontSize: 20,
            }}
            multiline={true}
            numberOfLines={8}
            placeholder="Description"
            placeholderTextColor={COLORS.gray}
            value={Description}
            pattern={"[^s]"}
            onValidation={(isValid) => setDescriptionValid(isValid)}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <View style={{ marginHorizontal: 50, height: 10 }}>
          {!DescriptionValid ? (
            <Text style={{ color: COLORS.red }}>Required</Text>
          ) : (
            <Text></Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.inputContainer2,
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
    marginLeft: 20,
    marginRight: 20,
    paddingHorizontal: 10,
    borderColor: COLORS.green,
    borderRadius: 15,
    paddingVertical: 2,
    height: 45,
  },
  inputContainer2: {
    alignItems: "center",
    borderWidth: 1,
    width: "50%",
    marginTop: 24,
    padding: 10,
    borderColor: COLORS.green,
    borderRadius: 15,
    height: 45,
  },
  inputContainer_des: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    marginTop: 24,
    marginLeft: 20,
    marginRight: 20,
    paddingHorizontal: 10,
    borderColor: COLORS.green,
    borderRadius: 23,
    paddingVertical: 2,
    height: 200,
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
    marginRight: "auto",
    marginLeft: "auto",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10,
    padding: 10,
  },
  scrollcontainer: {
    flex: 1,
    marginTop: -22,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    backgroundColor: COLORS.white,
  },
});
