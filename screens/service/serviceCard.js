import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { Card, FAB } from "react-native-paper";

export default function serviceCard(props) {
  const data = [
    {
      id: '1',
      name: "Construction & Real Estate",
      picture:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=666&q=80",
    },
    {
      id: '2',
      name: "Furniture",

      picture:
        "https://images.unsplash.com/photo-1616464916356-3a777b2b60b1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    },
    {
      id: '3',
      name: "Apparel",

      picture:
        "https://images.unsplash.com/photo-1584609226397-de5612afdfea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80",
    },
    {
      id: '4',
      name: "Tools & Hardware",

      picture:
        "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    },
    {
      id: '5',
      name: "Consumer Electronics",

      picture:
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=777&q=80",
    },
  ];
  const renderList = (item) => {
    return (
      <Card
        style={styles.card}
        onPress={() => props.navigation.navigate("serviceDetails")}
      >
        <Card.Title title={item.name} />
        <Card.Cover source={{ uri: item.picture }} />
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return renderList(item);
        }}
        keyExtractor={(item) => item.id}
      />
      <FAB
        style={styles.fab}
        small={false}
        icon="plus"
        onPress={() => props.navigation.navigate("addService")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    margin: 5,
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#8cecff",
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },

  fab: {
    position: "absolute",
    backgroundColor: "#4636ff",
    marginBottom: 20,
    marginRight: 20,
    right: 0,
    bottom: 0,
  },
});
