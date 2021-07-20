import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import Home from "./screens/products/Home";
import Products from "./screens/products/Products";
import AddProducts from "./screens/products/AddProduct";
import ProductDetails from "./screens/products/ProductDetails";
import Login from "./screens/Login";
import Register from "./screens/Register";
import addService from "./screens/service/addService";
import serviceCard from "./screens/service/serviceCard";
import serviceDetails from "./screens/service/serviceDetails";
import serviveHome from "./screens/service/serviveHome";
import updateService from "./screens/service/updateService";
import addPackage from "./screens/service/addPackage";
import packageCard from "./screens/service/packageCard";
import {NavigationContainer, DefaultTheme, DarkTheme, useTheme} from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerContent } from "./screens/DrawerContent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "./constants";
// import { createStore } from "redux";
// import { Provider } from "react-redux";
// import { reducer } from "./reducers/reducer";
//import { useSelector, useDispatch } from "react-redux";

//const store = createStore(reducer);

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const productStack = createStackNavigator();
const serviceStack = createStackNavigator();

const customDarkTheme={
  ...DarkTheme,
  colors:{
    ...DarkTheme.colors,
    headerColor:"#404040",
    iconColor:"white",
    tabIcon:"white",
  }
}
const customDefaultTheme={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    headerColor:"white",
    iconColor:"black",
    tabIcon:"green",
  }
}

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
      <productStack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ ...navoption, title: "ProductDetails", headerShown: false }}
      />
    </productStack.Navigator>
  );
}
function ServicetRoutes() {
  return (
    <serviceStack.Navigator>
      <serviceStack.Screen
        name="ServiceCard"
        component={serviceCard}
        options={{ ...navoption, title: "ServiceCard", headerShown: false }}
      />
      <serviceStack.Screen
        name="addService"
        component={addService}
        options={{ ...navoption, title: "Service", headerShown: false }}
      />
      <serviceStack.Screen
        name="serviceDetails"
        component={serviceDetails}
        options={{ ...navoption, title: "serviceDetails", headerShown: false }}
      />
      <serviceStack.Screen
        name="updateService"
        component={updateService}
        options={{ ...navoption, title: "updateService", headerShown: false }}
      />
      <serviceStack.Screen
        name="addPackage"
        component={addPackage}
        options={{ ...navoption, title: "addPackage", headerShown: false }}
      />
       <serviceStack.Screen
        name="packageCard"
        component={packageCard}
        options={{ ...navoption, title: "PackageCard", headerShown: false }}
      />
    </serviceStack.Navigator>
  );
}

function PDrawerRoutes() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Products" component={ProductRoutes} />
    </Drawer.Navigator>
  );
}
function SDrawerRoutes() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="ServiceHome" component={serviveHome} />
      <Drawer.Screen name="Services" component={ServicetRoutes} />
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
  //const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const [islogged, setLogged] = useState(false);
  const [data, setData] = useState("");
  const [type, setType] = useState("");
  const getData = async () => {
    try {
      var jsonValue = "";
      jsonValue = await AsyncStorage.getItem("token");
      //console.log(jsonValue);
      const email = await AsyncStorage.getItem("email");
      const name = await AsyncStorage.getItem("name");
      const br = await AsyncStorage.getItem("br");
      const type = await AsyncStorage.getItem("type");
      // dispatch({ type: "br", payload: br });
      // dispatch({ type: "email", payload: email });
      // dispatch({ type: "name", payload: name });
      // dispatch({ type: "set_loading", payload: false });
      setType(type);
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
                {type === "product" ? (
                  <Stack.Screen
                    name="PDrawer"
                    component={PDrawerRoutes}
                    options={{
                      ...navoption,
                      title: "Drawer",
                      headerShown: false,
                    }}
                  />
                ) : (
                  <Stack.Screen
                    name="SDrawer"
                    component={SDrawerRoutes}
                    options={{
                      ...navoption,
                      title: "Drawer",
                      headerShown: false,
                    }}
                  />
                )}

                <Stack.Screen
                  name="Products"
                  component={ProductRoutes}
                  options={{
                    ...navoption,
                    title: "Products",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Services"
                  component={ServicetRoutes}
                  options={{
                    ...navoption,
                    title: "Services",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{
                    ...navoption,
                    title: "Login",
                    headerShown: false,
                  }}
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
                  options={{
                    ...navoption,
                    title: "Login",
                    headerShown: false,
                  }}
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
                  component={PDrawerRoutes}
                  options={{
                    ...navoption,
                    title: "Drawer",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Products"
                  component={ProductRoutes}
                  options={{
                    ...navoption,
                    title: "Products",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Services"
                  component={ServicetRoutes}
                  options={{
                    ...navoption,
                    title: "Services",
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
    backgroundColor: "white",
    marginTop: Constants.statusBarHeight,
  },
});
