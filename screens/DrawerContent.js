import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  Switch,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { color } from "react-native-elements/dist/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function DrawerContent(props) {
  //const data = props.route.params.data;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [br, setBr] = useState("");
  const [loading, setloading] = useState(true);
  const getData = async () => {
    const email = await AsyncStorage.getItem("email");
    const name = await AsyncStorage.getItem("name");
    const br = await AsyncStorage.getItem("br");
    setEmail(email);
    setBr(br);
    setName(name);
    setloading(false);
  };
  useEffect(() => {
    getData();
  });
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("br");
      await AsyncStorage.removeItem("name");
      await AsyncStorage.removeItem("email");
      props.navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    }

    console.log("Done.");
  };
  return (
    <View style={{ flex: 1 }}>
      {!loading ? (
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={require("../assets/PngItem_4212266.png")}
                size={50}
                style={{ marginLeft: 10 }}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>{name}</Title>
                <Caption style={styles.caption}>{email}</Caption>
              </View>
              <Icon
                name="close"
                color="#000000"
                size={28}
                style={{ marginLeft: 100 }}
                onPress={() => props.navigation.closeDrawer()}
              />
            </View>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="home-outline" color={color} size={size} />
                )}
                label="Home"
                onPress={() => {
                  props.navigation.navigate("Home", { br, name, email });
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="account-outline" color={color} size={size} />
                )}
                label="Products"
                onPress={() => {
                  props.navigation.navigate("Products", { br, name, email });
                }}
              />

              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="cog-outline" color={color} size={size} />
                )}
                label="Settings"
                onPress={() => {
                  props.navigation.push("Settings", { br, name, email });
                }}
              />
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => logout()}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});