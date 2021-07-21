import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Button,
  Keyboard,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SIZES, COLORS, icons } from "../../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Urls from "../../constant";

export default function Jobs(props) {
  //const data = props.route.params.data;
  const [selected, setSelected] = useState("0");
  return (
    <View
      behavior={Platform.OS === "ios" ? "padding" : "position"}
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
            <Icons
              name="menu"
              color="#ffffff"
              size={30}
              onPress={() => props.navigation.openDrawer()}
            />
            <Text style={{ color: COLORS.white, marginLeft: 10, fontSize: 25 }}>
              Jobs
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
        <View
          style={{
            flexDirection: "row",
            height: 50,
            marginTop: SIZES.radius,
            justifyContent: "center",
            paddingHorizontal: SIZES.padding * 1.7,
          }}
        >
          {/* tab buttons */}
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
              style={{ alignItems: "center", width: 80 }}
              onPress={() => setSelected("0")}
            >
              <Text
                style={{
                  color: selected === "0" ? COLORS.primary : COLORS.green,
                  fontSize: 18,
                }}
              >
                Received
              </Text>
              <View
                style={{
                  marginTop: selected === "0" ? 3 : 4,
                  height: selected === "0" ? 4 : 2,
                  width: "100%",
                  backgroundColor:
                    selected === "0" ? COLORS.primary : COLORS.green,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: "center", width: 100 }}
              onPress={() => setSelected("1")}
            >
              <Text
                style={{
                  color: selected === "1" ? COLORS.primary : COLORS.gray,
                  fontSize: 18,
                }}
              >
                Processing
              </Text>
              <View
                style={{
                  marginTop: selected === "1" ? 3 : 4,
                  height: selected === "1" ? 4 : 2,
                  width: "100%",
                  backgroundColor:
                    selected === "1" ? COLORS.primary : COLORS.gray,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: "center", width: 100 }}
              onPress={() => setSelected("2")}
            >
              <Text
                style={{
                  color: selected === "2" ? COLORS.primary : COLORS.gray,
                  fontSize: 18,
                }}
              >
                Completed
              </Text>
              <View
                style={{
                  marginTop: selected === "2" ? 3 : 4,
                  height: selected === "2" ? 4 : 2,
                  width: "100%",
                  backgroundColor:
                    selected === "2" ? COLORS.primary : COLORS.gray,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollcontainer: {
    flex: 1,
    marginTop: -22,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    backgroundColor: COLORS.white,
  },
});
