import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  FlatList,
  Keyboard,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ListItem } from "react-native-elements";
import { SIZES, COLORS, icons } from "../../constants";
import { FAB } from "react-native-paper";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Urls from "../../constant";
import { Icon } from "react-native-elements/dist/icons/Icon";

export default function JobTask(props) {
  const [textInput, setTextInput] = React.useState("");
  const item = props.route.params.item;
  const flag = props.route.params.flag1;
  const job_id = props.route.params.item._id;
  const [todos, setTodos] = React.useState([]);
  const [completed, setComplete] = React.useState(false);
  const getData = () => {
    if (!flag) {
      fetch(Urls.cn + "/Jobs/byID/" + item._id)
        .then((res) => res.json())
        .then((data) => {
          setTodos(data.taskarray);
        });
    }
  };
  React.useEffect(() => {
    getData();
  }, []);

  const renderList = (item) => {
    return (
      <View style={styles.listItem}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>{item.task}</Text>
        </View>
        {item.completed ? (
          <TouchableOpacity
            style={[styles.actionIcon]}
            onPress={() => markTodoUncomplete(item.id)}
          >
            <Icon name="done" size={20} color="#000000" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.actionIcon]}
            onPress={() => markTodoComplete(item.id)}
          >
            <Icons name="checkbox-blank-outline" size={20} color="#000000" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionIcon]}
          onPress={() => deleteTodo(item.id)}
        >
          <Icon name="delete" size={20} color="#000000" />
        </TouchableOpacity>
      </View>
    );
  };

  const addTodo = () => {
    if (textInput == "") {
      Alert.alert("Error", "please input List");
    } else {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTextInput("");
    }
  };

  const markTodoComplete = (todoId) => {
    const newTodos = todos.map((item) => {
      if (item.id == todoId) {
        return { ...item, completed: true };
      }
      return item;
    });
    setTodos(newTodos);
  };
  const checkComplete = () => {
    let x = true;
    for (let i = 0; i < todos.length; i++) {
      let element = todos[i];
      if (!element.completed) {
        x = false;
      }
    }
    setComplete(x);
  };
  const markTodoUncomplete = (todoId) => {
    const newTodos = todos.map((item) => {
      if (item.id == todoId) {
        return { ...item, completed: false };
      }
      return item;
    });
    setTodos(newTodos);
  };

  const deleteTodo = (todoId) => {
    const newTodos = todos.filter((item) => item.id != todoId);
    setTodos(newTodos);
  };

  const saveTodouser = () => {
    try {
      let x = true;
      let job_status = "Completed";
      for (let i = 0; i < todos.length; i++) {
        let element = todos[i];
        if (!element.completed) {
          x = false;
          job_status = "Processing";
        }
      }
      console.log(x);

      fetch(Urls.cn + "/Jobs/" + job_id, {
        method: "patch",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskarray: todos,
          job_status,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          Alert.alert("Successfuly Saved");
          props.navigation.navigate("Jobs");
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getTodosuser = async () => {
    try {
      const todos = await AsyncStorage.getItem("todos");
      if (todos != null) {
        setTodos(Json.parse(todos));
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              name="arrow-left"
              color="#ffffff"
              size={30}
              onPress={() => props.navigation.navigate("Jobs")}
            />
            <Text style={{ color: COLORS.white, marginLeft: 20, fontSize: 23 }}>
              JobTask
            </Text>
          </View>
          <View>
            <Icons
              name="content-save"
              style={{ padding: SIZES.padding }}
              color="#ffffff"
              size={30}
              onPress={saveTodouser}
            />
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.scrollcontainer}>
        <FlatList
          style={{
            flexDirection: "row",
            padding: SIZES.padding,
            width: "100%",
          }}
          data={todos}
          renderItem={({ item }) => {
            return renderList(item);
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Add Task List"
            value={textInput}
            onChangeText={(text) => setTextInput(text)}
          />
        </View>
        <FAB style={styles.fab} small={false} icon="plus" onPress={addTodo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listItem: {
    padding: 15,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    elevation: 4,
    borderRadius: 12,
    width: 300,
    marginVertical: 6,
  },
  scrollcontainer: {
    flex: 1,
    marginTop: -22,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  actionIcon: {
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    borderRadius: 5,
  },
  fab: {
    backgroundColor: COLORS.green,
    top: 0,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.green,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 20,
    padding: 10,
    paddingLeft: 20,
    backgroundColor: COLORS.white,
  },
  inputContainer2: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 35,
    borderWidth: 2,
    marginTop: 24,
    paddingHorizontal: 10,
    borderColor: COLORS.green,
    borderRadius: 15,
    paddingVertical: 2,
    height: 45,
  },
  btn: {
    backgroundColor: COLORS.green,
    justifyContent: "center",
    marginTop: 40,
  },
});
