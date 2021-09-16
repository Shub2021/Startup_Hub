import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Button,
  Keyboard,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// import { TouchableRipple } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, FAB } from "react-native-paper";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";

// import Constants from "expo-constants";
import { SIZES, COLORS, icons } from "../../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Urls from "../../constant";

export default function serviceHome(props) {
  //const data = props.route.params.data;
  const chartConfig = {
    backgroundGradientFrom: COLORS.green,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: COLORS.green,
    backgroundGradientToOpacity: 0.7,
    color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.8,
    useShadowColorFromDataset: false, // optional
  };
  const chartConfig2 = {
    backgroundGradientFrom: "#00bd2c",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#00bd2c",
    backgroundGradientToOpacity: 0.7,
    color: (opacity = 0.5) => `rgba(213, 239, 240, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.8,
    useShadowColorFromDataset: false, // optional
  };
  const [email, setEmail] = useState("");
  const [barlables, setbarlables] = useState([]);
  const [bardata, setbardata] = useState([]);
  const [bardata2, setbardata2] = useState([]);
  const [income, setincome] = useState([]);
  const [name, setName] = useState("");
  const [jobcount, setOcount] = useState("0");
  const [total, setTotal] = useState("0");
  const [profit, setProfit] = useState("0");
  const [br, setBr] = useState("");
  const [cmpcategory, setCategory] = useState("");
  const [complaints, setComplaints] = useState("");
  const [partners, setPartners] = useState("");
  const [admincomplaints, setadmincomplaints] = useState("");
  const [investor, setinvestor] = useState("");
  const [loading, setloading] = useState(true);
  const data = {
    labels: barlables,
    datasets: [
      {
        data: bardata,
      },
    ],
  };
  const data3 = {
    labels: barlables,
    datasets: [
      {
        data: bardata2,
      },
    ],
  };
  const data2 = {
    labels: ["June", "July", "August", "September"],
    datasets: [
      {
        data: income,
      },
    ],
  };
  const getData = async () => {
    const email = await AsyncStorage.getItem("email");
    const name = await AsyncStorage.getItem("name");
    const brr = await AsyncStorage.getItem("br");
    const cmp = await AsyncStorage.getItem("category");
    let ll = 0;
    let lables = [];
    setEmail(email);
    setBr(brr);
    setCategory(cmp);
    setName(name);
    fetch(Urls.cn + "/service/br/" + brr)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        ll = result.length;

        for (let i = 0; i < result.length; i++) {
          //console.log(result[i].service_name);
          lables.push(result[i].service_name);
        }
        console.log(lables);
        setbarlables(lables);

        fetch(Urls.cn + "/Jobs/" + brr)
          .then((res) => res.json())
          .then((result) => {
            //console.log(result);
            let l = result.length;
            let c = 0;

            let dat = [];
            let dat2 = [];
            let totalinc = 0;
            let incm = [0, 0, 0, 0];
            for (let i = 0; i < ll; i++) {
              dat[i] = 0;
              dat2[i] = 0;
            }
            for (let i = 0; i < l; i++) {
              let indx = lables.indexOf(result[i].service_name);
              dat[indx] = dat[indx] + 1;
              if (result[i].job_status === "placed") {
                c = c + 1;
              }
              if (result[i].job_status === "Completed") {
                let d = result[i].date;
                totalinc = totalinc + result[i].price;
                let m = d.slice(5, 7);
                console.log(m);
                if (m === "06") {
                  incm[0] = incm[0] + result[i].price;
                } else if (m === "07") {
                  incm[1] = incm[1] + result[i].price;
                } else if (m === "08") {
                  incm[2] = incm[2] + result[i].price;
                } else if (m === "09") {
                  incm[3] = incm[3] + result[i].price;
                }
              } else {
                dat2[indx] = dat2[indx] + 1;
              }
            }
            setTotal(totalinc);
            setincome(incm);
            setTotal(totalinc);
            setOcount(c);
            setbardata(dat);
            setbardata2(dat2);
          });
        fetch(Urls.cn + "/prequest/recieved/" + brr)
          .then((res) => res.json())
          .then((result) => {
            setPartners(result.length);
            //console.log(result.length);
          });
        fetch(Urls.cn + "/investorrequest/recieved/" + brr)
          .then((res) => res.json())
          .then((result) => {
            setinvestor(result.length);
            //console.log(result.length);
          });
        fetch(Urls.cn + "/complaint/br/" + brr)
          .then((res) => res.json())
          .then((result) => {
            setComplaints(result.length);
            //console.log(result.length);
            setloading(false);
          });
      });
  };
  useEffect(() => {
    getData();
    //fetchData();
  }, []);
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
            <Text
              style={{
                color: COLORS.white,
                marginLeft: 20,
                marginTop: -2,
                fontSize: 23,
              }}
            >
              Home
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
        {/* <View>
          <ImageBackground
            source={require("../../assets/logo.png")}
            style={{
              height: 200,
              flex: 1,
              justifyContent: "center",
              opacity: 0.4,
              alignContent: "center",
              width: 350,
              marginLeft: 10,
              marginTop: 190,
            }}
            // imageStyle={{ borderBottomRightRadius: 65 }}
          ></ImageBackground>
        </View> */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Card
            style={[styles.card, { backgroundColor: COLORS.lightYellow }]}
            onPress={() => props.navigation.navigate("Jobs")}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 15,
                paddingVertical: 20,
              }}
            >
              <Text style={{ fontSize: 20 }}>Jobs</Text>
              <Text style={{ fontSize: 20 }}>{jobcount}</Text>
            </View>
          </Card>
          <Card
            style={[styles.card, { backgroundColor: COLORS.lightGreen }]}
            onPress={() => props.navigation.navigate("Investors")}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 15,
                paddingVertical: 20,
              }}
            >
              <Text style={{ fontSize: 20 }}>Investors</Text>
              <Text style={{ fontSize: 20 }}>{investor}</Text>
            </View>
          </Card>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Card
            style={[styles.card, { backgroundColor: COLORS.lightPurple }]}
            onPress={() => props.navigation.navigate("Complaints")}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 15,
                paddingVertical: 20,
              }}
            >
              <Text style={{ fontSize: 20, color: COLORS.white }}>Client</Text>
              <Text style={{ fontSize: 20, color: COLORS.white }}>
                {complaints}
              </Text>
            </View>
          </Card>
          <Card
            style={[styles.card, { backgroundColor: COLORS.lightGreen3 }]}
            onPress={() => props.navigation.navigate("AdminComplaints")}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 15,
                paddingVertical: 20,
              }}
            >
              <Text style={{ fontSize: 20 }}>Admin</Text>
              <Text style={{ fontSize: 20 }}>0</Text>
            </View>
          </Card>
        </View>
        <View style={{ marginBottom: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 20, marginBottom: 5, alignSelf: "center" }}>
            Most Requested Services
          </Text>
          <BarChart
            style={styles.card2}
            data={data}
            width={330}
            height={350}
            yAxisLabel=""
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
        </View>
        <View style={{ marginBottom: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 20, marginBottom: 5, alignSelf: "center" }}>
            Pending Jobs
          </Text>
          <View style={{ marginBottom: 10 }}>
            <BarChart
              style={styles.card2}
              data={data3}
              width={330}
              height={350}
              yAxisLabel=""
              chartConfig={chartConfig2}
              verticalLabelRotation={30}
            />
            {/* <LineChart
              style={styles.card2}
              data={data2}
              width={330}
              height={350}
              yAxisLabel=""
              chartConfig={chartConfig2}
              verticalLabelRotation={30}
              bezier
            /> */}
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
  card: {
    borderRadius: 23,
    height: 70,
    width: 150,
    marginHorizontal: 15,
    backgroundColor: COLORS.white,
    marginVertical: 10,
  },
  card2: {
    borderRadius: 23,
    height: 350,
    width: 330,
    marginHorizontal: 15,
    backgroundColor: COLORS.white,
    marginVertical: 0,
    paddingHorizontal: 0,
  },
});