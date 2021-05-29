import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const navoption = {
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#4636ff",
  },
};

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ ...navoption, title: "Login", headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ ...navoption, title: "Register", headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ ...navoption, title: "Home" }}
          />
        </Stack.Navigator>
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
