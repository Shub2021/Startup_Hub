import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Title, Caption, Drawer } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, icons, SIZES } from "../constants";

export function DrawerContent(props) {
  //const data = props.route.params.data;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [br, setBr] = useState("");
  const [type, setType] = useState("");
  const [loading, setloading] = useState(true);
  const getData = async () => {
    // const { br, name, email, loading } = useSelector((state) => {
    //   return state;
    // });
    const email = await AsyncStorage.getItem("email");
    const name = await AsyncStorage.getItem("name");
    const br = await AsyncStorage.getItem("br");
    const type = await AsyncStorage.getItem("type");
    setEmail(email);
    setBr(br);
    setName(name);
    setType(type);
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
      await AsyncStorage.removeItem("type");
      await AsyncStorage.removeItem("category");
      props.navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    }

    console.log("Done.");
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.secondary }}>
      {!loading ? (
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 15,
                }}
              >
                <Avatar.Image
                  source={require("../assets/PngItem_4212266.png")}
                  size={50}
                  style={{ marginLeft: 10 }}
                />
                <View style={{ marginLeft: 15, flexDirection: "column" }}>
                  <Title style={styles.title}>{name}</Title>
                  <Caption style={styles.caption}>{email}</Caption>
                </View>
              </View>

              <Icon
                name="close"
                color="#000000"
                style={{ marginTop: 10, marginRight: 5, color: COLORS.white }}
                size={28}
                onPress={() => props.navigation.closeDrawer()}
              />
            </View>
            <Drawer.Section style={styles.drawerSection}>
              {type === "product" ? (
                <>
                  <DrawerItem
                    icon={() => (
                      <Icon
                        name="home-outline"
                        color={COLORS.white}
                        size={28}
                      />
                    )}
                    pressColor={COLORS.yellow}
                    label="Home"
                    labelStyle={{ color: COLORS.white, fontSize: SIZES.h3 }}
                    onPress={() => {
                      props.navigation.navigate("Home");
                    }}
                  />
                  <DrawerItem
                    icon={() => (
                      <Icon
                        name="gift-outline"
                        color={COLORS.white}
                        size={28}
                      />
                    )}
                    pressColor={COLORS.yellow}
                    label="Products"
                    labelStyle={{ color: COLORS.white, fontSize: SIZES.h3 }}
                    onPress={() => {
                      props.navigation.navigate("Products");
                    }}
                  />
                  <DrawerItem
                    icon={() => (
                      <Icon
                        name="truck-outline"
                        color={COLORS.white}
                        size={28}
                      />
                    )}
                    pressColor={COLORS.yellow}
                    label="Orders"
                    labelStyle={{ color: COLORS.white, fontSize: SIZES.h3 }}
                    onPress={() => {
                      props.navigation.navigate("Orders");
                    }}
                  />
                </>
              ) : (
                <>
                  <DrawerItem
                    icon={() => (
                      <Icon
                        name="home-outline"
                        color={COLORS.white}
                        size={28}
                      />
                    )}
                    label="SHome"
                    pressColor={COLORS.yellow}
                    labelStyle={{ color: COLORS.white, fontSize: SIZES.h3 }}
                    onPress={() => {
                      props.navigation.navigate("ServiceHome");
                    }}
                  />
                  <DrawerItem
                    icon={() => (
                      <Icon
                        name="account-outline"
                        color={COLORS.white}
                        size={28}
                      />
                    )}
                    label="Services"
                    pressColor={COLORS.yellow}
                    labelStyle={{ color: COLORS.white, fontSize: SIZES.h3 }}
                    onPress={() => {
                      props.navigation.navigate("Services");
                    }}
                  />
                </>
              )}

              <DrawerItem
                icon={() => (
                  <Icon name="cog-outline" color={COLORS.white} size={28} />
                )}
                label="Settings"
                pressColor={COLORS.yellow}
                labelStyle={{ color: COLORS.white, fontSize: SIZES.h3 }}
                onPress={() => {
                  props.navigation.push("Settings");
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
          icon={() => (
            <Icon name="exit-to-app" color={COLORS.white} size={28} />
          )}
          label="Sign Out"
          pressColor={COLORS.yellow}
          labelStyle={{ color: COLORS.white, fontSize: SIZES.h3 }}
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
    fontWeight: "normal",
    color: COLORS.white,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: COLORS.white,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
  },
});
