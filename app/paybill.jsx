import React, { useState } from "react";
import { Modal, SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import { Paystack } from "react-native-paystack-webview";

const publicKey = "pk_test_6633ec1991d6ba92490835f6cbc1b7934876a55f"; 

export default function PayBill() {
  const [amount, setAmount] = useState("");
  const [showPaystack, setShowPaystack] = useState(false);

  const email = "test@example.com";
  const name = "John Doe";
  const phonenumber = "254700000000";

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Enter Repayment Amount</Text>
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, marginVertical: 10, width: 200 }}
      />
      <TouchableOpacity
  style={{ backgroundColor: "green", padding: 15 }}
  onPress={() => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount first");
      return;
    }
    setShowPaystack(true);
  }}
>
  <Text style={{ color: "white" }}>Proceed to Paystack</Text>
</TouchableOpacity>


      <Modal visible={showPaystack} animationType="slide">
  {showPaystack && Number(amount) > 0 ? (
    <Paystack
      paystackKey={publicKey}
      amount={parseFloat(amount) * 100}
      billingEmail="test@example.com"
      billingName="John Doe"
      billingMobile="254700000000"
      currency="KES"
      onSuccess={(res) => {
        console.log("Payment successful:", res);
        setShowPaystack(false);
      }}
      onCancel={() => {
        console.log("Payment cancelled");
        setShowPaystack(false);
      }}
      autoStart={true}
    />
  ) : null}
</Modal>

    </SafeAreaView>
  );
}
