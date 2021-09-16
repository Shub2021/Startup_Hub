import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import Urls from "../constant";

//ADD localhost address of your server
const API_URL = Urls.cn; 

const StripeApp = (props) => {
  const [br_number, setBr] = useState(props.route.params.data.br_number);
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/payment/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      amount: "LKR1000.00",
    };
    //2.Fetch the intent client secret from the backend
    try {
      const amount = "1000";
      const d = new Date();
      const date = d.getDate();
      const month = d.getMonth();
      const year = d.getFullYear();
      const paymentDate = year + "-" + month + "-" + date;
      console.log(paymentDate);
      console.log(year);
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          fetch(Urls.cn + "/annualfee", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              br_number,
              paymentDate,
              amount,
              year,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              alert("Payment Successful");
              console.log("Payment successful ", paymentIntent);
              props.navigation.navigate("Business_Profile");
            });
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

  return (
    <View style={styles.container}>
      {/* <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={(value) => setEmail(value.nativeEvent.text)}
        style={styles.input}
      /> */}
      <Text style={styles.input}>Annual Fee : LKR.1000.00</Text>
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails);
        }}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
  );
};
export default StripeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
