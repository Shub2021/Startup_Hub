import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Header,
  KeyboardAvoidingView,
  Button,
  Keyboard,
  Platform,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import Constants from "expo-constants";
import Icons from "@expo/vector-icons/AntDesign";
import { AntDesign,Feather } from '@expo/vector-icons'; 
import { Appbar } from "react-native-paper";
import { Value } from "react-native-reanimated";




const CONTENT = [
    {
        isExpanded: false,
        category_name: 'Category',
        subcategory: [
            {id: 1, val: 'sub 1'},
            {id: 2, val: 'sub 2'},
            {id: 3, val: 'sub 3'},
            {id: 4, val: 'sub 4'},
            {id: 5, val: 'sub 5'},
        ]
    }
];

const ExpandableComponent = ({item,onClickFunction}) => {
    const [layoutHeight, setlayoutHeight] = useState(0);

    useEffect(() => {
        if(item.isExpanded) {
            setlayoutHeight(null);
        } else {
            setlayoutHeight(0);
        }
    }, [item.isExpanded])

    return (
        <View>
            <TouchableOpacity
                onPress={onClickFunction}
                style={styles.droplist}
            >
            <Text
                style={{color: "black", fontSize: 18, fontWeight: "bold" }}
            >
                {item.category_name}
            </Text>
            <View>
            <AntDesign style={{marginLeft:160}} name="caretdown" size={18} color="black" />
            </View>
            </TouchableOpacity>
            <View style={{height: layoutHeight,overflow: 'hidden',alignItems:"center"}}>
                {
                    item.subcategory.map((item, key) => (
                        <TouchableOpacity style={styles.droplistitems} key={key}>
                            <Text>
                                {key}.{item.val}
                            </Text>
                            <View />
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    )
}

export default function addService(props) {
    const [listDataSource, setlistDataSource] = useState(CONTENT  )
    const updateLayout = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...listDataSource];
       
          //  array[index]['isExpanded'] = !array[index]['isExpanded'];
        array.map((Value,placeindex) =>
            placeindex === index
            ? (array[placeindex]['isExpanded']) = !array[placeindex]['isExpanded']
            : (array[placeindex]['isExpanded']) = false
        );
        setlistDataSource(array)
    }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
    <ScrollView>
        <View>
            <ScrollView>
                {
                    listDataSource.map((item,key) =>(
                        <ExpandableComponent 
                            key={item.category_name}
                            item={item}
                            onClickFunction={() => {
                                updateLayout(key)
                            }}
                        />
                    ))
                }
            </ScrollView>
        </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
          placeholder="Service "
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
          placeholder="Email"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
          placeholder="Contact Number"
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
          placeholder="Username"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
          placeholder="Password"
        />
      </View>
      <TouchableOpacity style={[styles.inputContainer, styles.btn]}
        onPress={() => props.navigation.navigate("serviceCard")}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold"}}>
         Add Service
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
  header: {
    height: Keyboard.height,
    width: "100%",
    borderBottomRightRadius: 70,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  welcome: {
    fontSize: 25,
    marginBottom: 15,
    fontWeight: "bold",
    color: "white",
  },
  welcomeContainer: {
    justifyContent: "center",
    height: 250,
    width: "100%",
    marginLeft: 10,
  },
  logintxt: {
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 28,
    color: "#1255ff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 35,
    borderWidth: 2,
    marginTop: 24,
    paddingHorizontal: 10,
    borderColor: "#306bff",
    borderRadius: 23,
    paddingVertical: 2,
    height: 45,
  },
  droplist: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 35,
    borderWidth: 2,
    marginTop: 24,
    paddingHorizontal: 10,
    borderColor: "#306bff",
    borderRadius: 23,
    paddingVertical: 2,
    height: 45,
  },
  droplistitems: {
    width: 200,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 35,
    borderWidth: 2,
    marginTop: 10,
    paddingHorizontal: 10,
    borderColor: "#306bff",
    borderRadius: 23,
    paddingVertical: 2,
    height: 30,
  },
  btn: {
    backgroundColor: "#306bff",
    justifyContent: "center",
    marginTop: 40,
    marginBottom:30,
  },
  registerbtn: {
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  apbar: {
    height: 40,
  },
});
