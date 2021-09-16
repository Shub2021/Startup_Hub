import MapView, { Callout, Marker } from "react-native-maps";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import Urls from "../constant";

export default function Map(props) {
  const [latitude, setLatitude] = useState(7.009852);
  const [longitude, setLongitude] = useState(79.972392);
  const company_id = props.route.params.data._id;
  const [company_name, setCname] = useState(
    props.route.params.data.company_name
  );
  const [image, setPicture] = useState(props.route.params.data.image);
  const [email, setEmail] = useState(props.route.params.data.email);
  const [address, setAddress] = useState(props.route.params.data.address);
  const [contact, setMobile] = useState(props.route.params.data.contact);
  const saveLocation = () => {
    console.log(latitude);
    console.log(longitude);
    const location = { lat: latitude, long: longitude };
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
  //   useEffect(() => {
  //     getData();
  //   }, []);
  return (
    <View style={{ marginBottom: 100, flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 7.009852,
          longitude: 79.972392,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          draggable={true}
          onDragEnd={(e) => {
            setLatitude(e.nativeEvent.coordinate.latitude);
            setLongitude(e.nativeEvent.coordinate.longitude);
          }}
        >
          <Callout>
            <Text>I'm here</Text>
          </Callout>
        </Marker>
      </MapView>
      <View
        style={{
          flex: 0,
          bottom: 50,
          width: "100%",
          zIndex: 1,
          height: 150,
          backgroundColor: "#efefefef",
        }}
      >
        <TouchableOpacity
          style={[styles.inputContainer2, styles.btn]}
          onPress={saveLocation}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Set Location
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  inputContainer2: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 35,
    borderWidth: 2,
    marginTop: 24,
    paddingHorizontal: 10,
    borderColor: "green",
    borderRadius: 15,
    paddingVertical: 2,
    height: 45,
  },
  btn: {
    backgroundColor: "green",
    justifyContent: "center",
    marginTop: 20,
  },
});
