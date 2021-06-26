import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import Home from "./screens/Home";
import Products from "./screens/Products";
import AddProducts from "./screens/AddProduct";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerContent } from "./screens/DrawerContent";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const productStack = createStackNavigator();

function ProductRoutes() {
  return (
    <productStack.Navigator>
      <productStack.Screen
        name="Products"
        component={Products}
        options={{ ...navoption, title: "Products", headerShown: false }}
      />
      <productStack.Screen
        name="Add Product"
        component={AddProducts}
        options={{ ...navoption, title: "AddProducts", headerShown: false }}
      />
    </productStack.Navigator>
  );
}

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Products" component={ProductRoutes} />
    </Drawer.Navigator>
  );
}

const navoption = {
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#4636ff",
  },
};

export default function App() {
  const [loading, setloading] = useState(true);
  const [islogged, setLogged] = useState(false);
  const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [br, setBr] = useState("");
  const getData = async () => {
    try {
      var jsonValue = "";
      jsonValue = await AsyncStorage.getItem("token");
      //console.log(jsonValue);
      // const email = await AsyncStorage.getItem("email");
      // const name = await AsyncStorage.getItem("name");
      // const br = await AsyncStorage.getItem("br");
      // setEmail(email);
      // setBr(br);
      // setName(name);
      setData(jsonValue);
      if (jsonValue) {
        setLogged(true);
        //console.log("done");
      } else {
        setLogged(false);
        //console.log("hmm");
      }
      setloading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  });
  return (
    <NavigationContainer>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Stack.Navigator>
            {islogged ? (
              <>
                <Stack.Screen
                  name="Drawer"
                  component={DrawerRoutes}
                  options={{
                    ...navoption,
                    title: "Drawer",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Add Product"
                  component={AddProducts}
                  options={{
                    ...navoption,
                    title: "AddProducts",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ ...navoption, title: "Login", headerShown: false }}
                />
                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={{
                    ...navoption,
                    title: "Register",
                    headerShown: false,
                  }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ ...navoption, title: "Login", headerShown: false }}
                />
                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={{
                    ...navoption,
                    title: "Register",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Drawer"
                  component={DrawerRoutes}
                  options={{
                    ...navoption,
                    title: "Drawer",
                    headerShown: false,
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        )}
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
  },
});
