import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, FAB } from "react-native-paper";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Urls from "../../constant";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";

export default function Home(props) {
  const chartConfig = {
    backgroundGradientFrom: COLORS.green,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: COLORS.green,
    backgroundGradientToOpacity: 0.7,
    color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 1,
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
  const [income, setincome] = useState([]);
  const [name, setName] = useState("");
  const [ordercount, setOcount] = useState("0");
  const [total, setTotal] = useState("0");
  const [expence, setExpence] = useState("0");
  const [profit, setProfit] = useState("0");
  const [br, setBr] = useState("");
  const [cmpcategory, setCategory] = useState("");
  const [complaints, setComplaints] = useState("");
  const [admincomplaints, setadminComplaints] = useState("");
  const [partners, setPartners] = useState("");
  const [investor, setinvestor] = useState("");
  const [orderdata, setorderdata] = useState([]);
  const [productdata, setproductdata] = useState([]);
  const [loading, setloading] = useState(true);
  const data = {
    labels: barlables,
    datasets: [
      {
        data: bardata,
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
    fetch(Urls.cn + "/product/br/" + brr)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        ll = result.length;

        for (let i = 0; i < result.length; i++) {
          //console.log(data[i].product_name);
          lables.push(result[i].product_name);
        }
        setbarlables(lables);

        fetch(Urls.cn + "/order/" + brr)
          .then((res) => res.json())
          .then((result) => {
            //console.log(result);
            let l = result.length;
            let c = 0;
            let dat = [];
            let totalinc = 0;
            let totalexp = 0;
            let incm = [0, 0, 0, 0];

            for (let i = 0; i < ll; i++) {
              dat[i] = 0;
            }
            for (let i = 0; i < l; i++) {
              let indx = lables.indexOf(result[i].product_name);
              dat[indx] = dat[indx] + result[i].quantity;
              if (result[i].order_status === "placed") {
                c = c + 1;
              }
              if (result[i].order_status === "completed") {
                let d = result[i].req_date;
                totalinc = totalinc + result[i].total;
                totalexp = totalexp + result[i].expence * result[i].quantity;
                let m = d.slice(5, 6);
                //console.log(m);
                if (m === "6") {
                  incm[0] = incm[0] + result[i].total;
                } else if (m === "7") {
                  incm[1] = incm[1] + result[i].total;
                } else if (m === "8") {
                  incm[2] = incm[2] + result[i].total;
                } else if (m === "9") {
                  incm[3] = incm[3] + result[i].total;
                }
              }
            }
            let totalpro = totalinc - totalexp;
            setProfit(totalpro);
            setExpence(totalexp);
            setTotal(totalinc);
            setincome(incm);
            setOcount(c);
            setbardata(dat);
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
          });
        fetch(Urls.cn + "/admincomplaint/br/" + brr)
          .then((res) => res.json())
          .then((result) => {
            setadminComplaints(result.length);
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
      {!loading ? (
        <>
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
                  style={{ color: COLORS.white, marginLeft: 10, fontSize: 25 }}
                >
                  Home
                </Text>
              </View>
              {/* <View>
                <Icons
                  name="bell-outline"
                  style={{ padding: SIZES.padding }}
                  color="#ffffff"
                  size={30}
                />
              </View> */}
            </View>
          </SafeAreaView>
          <ScrollView style={styles.scrollcontainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Card
                style={[styles.card, { backgroundColor: COLORS.lightYellow }]}
                onPress={() => props.navigation.navigate("Orders")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                    paddingVertical: 20,
                  }}
                >
                  <Text style={{ fontSize: 20 }}>Orders</Text>
                  <Text style={{ fontSize: 20 }}>{ordercount}</Text>
                </View>
              </Card>
              <Card
                style={[styles.card, { backgroundColor: COLORS.lightGreen }]}
                onPress={() => props.navigation.navigate("Partners")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                    paddingVertical: 20,
                  }}
                >
                  <Text style={{ fontSize: 16, bottom: 6 }}>
                    {"Partner \nNotifications"}
                  </Text>
                  <Text style={{ fontSize: 20 }}>{partners}</Text>
                </View>
              </Card>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Card
                style={[styles.card, { backgroundColor: COLORS.lightPurple }]}
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
                  <Text
                    style={{ fontSize: 16, bottom: 6, color: COLORS.white }}
                  >
                    {"Investor\nNotifications"}
                  </Text>
                  <Text style={{ fontSize: 20, color: COLORS.white }}>
                    {investor}
                  </Text>
                </View>
              </Card>
              <Card
                style={[styles.card, { backgroundColor: COLORS.lightGreen3 }]}
                onPress={() => props.navigation.navigate("Complaints", br)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                    paddingVertical: 20,
                  }}
                >
                  <Text style={{ fontSize: 16, bottom: 6 }}>
                    {"Client\nNotifications"}
                  </Text>
                  <Text style={{ fontSize: 20 }}>{complaints}</Text>
                </View>
              </Card>
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card
                style={styles.card}
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
                  <Text style={{ fontSize: 16, bottom: 6 }}>
                    {"Admin\nNotifications"}
                  </Text>
                  <Text style={{ fontSize: 20 }}>{admincomplaints}</Text>
                </View>
              </Card>
            </View>
            <View style={{ marginBottom: 10, marginTop: 10 }}>
              <Text
                style={{ fontSize: 20, marginBottom: 5, alignSelf: "center" }}
              >
                Most Selling Products
              </Text>
              <BarChart
                style={styles.card4}
                data={data}
                width={330}
                withInnerLines={true}
                segments={3}
                height={350}
                yAxisLabel=""
                chartConfig={chartConfig}
                verticalLabelRotation={30}
              />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Card style={[styles.card3, { backgroundColor: COLORS.orange }]}>
                <View
                  style={{
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                  }}
                >
                  <Text style={{ fontSize: 20 }}>Income</Text>
                  <Text style={{ fontSize: 15 }}>LKR {total}.00</Text>
                </View>
              </Card>
              <Card style={[styles.card3, { backgroundColor: COLORS.purple }]}>
                <View
                  style={{
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                  }}
                >
                  <Text style={{ fontSize: 20, color: COLORS.white }}>
                    Expence
                  </Text>
                  <Text style={{ fontSize: 15, color: COLORS.white }}>
                    LKR {expence}.00
                  </Text>
                </View>
              </Card>
              <Card
                style={[styles.card3, { backgroundColor: COLORS.lightGreen2 }]}
              >
                <View
                  style={{
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                  }}
                >
                  <Text style={{ fontSize: 20 }}>Profit</Text>
                  <Text style={{ fontSize: 15 }}>LKR {profit}.00</Text>
                </View>
              </Card>
            </View>
            <Text
              style={{ fontSize: 20, marginBottom: 5, alignSelf: "center" }}
            >
              Monthly Income Destribution
            </Text>
            <View style={{ marginBottom: 10 }}>
              <LineChart
                style={styles.card2}
                data={data2}
                width={330}
                height={350}
                yAxisLabel=""
                chartConfig={chartConfig2}
                verticalLabelRotation={30}
                bezier
              />
            </View>
          </ScrollView>
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
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
  card3: {
    borderRadius: 23,
    height: 80,
    width: 110,
    marginHorizontal: 5,
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
  card4: {
    borderRadius: 23,
    height: 350,
    width: 330,
    marginHorizontal: 15,
    backgroundColor: COLORS.white,
    marginVertical: 0,
    paddingHorizontal: 0,
    paddingRight: 30,
  },
});
