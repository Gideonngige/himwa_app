// app/(tabs)/home.jsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import '../../global.css';

export default function Bills() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bills, setBills] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [totalUnits, setTotalUnits] = useState(0);
  const [lastRecorded, setLastRecorded] = useState("");
  const [memberName, setMemberName] = useState("Gideon Ushindi");

  // get member summary
  useEffect(() => {
      const getSummary = async () => {
        const auth_token = await AsyncStorage.getItem('token');
        const member_id = await AsyncStorage.getItem('member_id');
        const member_name = await AsyncStorage.getItem('member_name');
        axios.get(`http://172.16.88.203:8000/get_water_summary/${member_id}/`, {
            method: 'GET',
            headers: {
              "Authorization": `Bearer ${auth_token}`
            },
          })
          .then((response) => {
            setTotalUnits(response.data.total_units);
            setLastRecorded(response.data.last_recorded.split("T")[0]);
            setMemberName(member_name);;
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      getSummary();
    }, []);

   useEffect(() => {
      const getTransactions = async () => {
        const auth_token = await AsyncStorage.getItem('token');
        const member_id = await AsyncStorage.getItem('member_id');
        axios.get(`http://172.16.88.203:8000/get_member_transactions/${member_id}/`, {
            method: 'GET',
            headers: {
              "Authorization": `Bearer ${auth_token}`
            },
          })
          .then((response) => {
            setTransactions(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      getTransactions();
    }, []);

  
  useEffect(() => {
      const getBills = async () => {
        const auth_token = await AsyncStorage.getItem('token');
        const member_id = await AsyncStorage.getItem('member_id');
        axios.get(`http://172.16.88.203:8000/get_member_bills/${member_id}/`, {
            method: 'GET',
            headers: {
              "Authorization": `Bearer ${auth_token}`
            },
          })
          .then((response) => {
            setBills(response.data);
            setLoading2(false);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      getBills();
    }, []);

  // transactions component
  const Transaction = ({ amount, date, method }) => {
    return(
      <View className="bg-white rounded-2xl p-5 shadow-lg w-full max-w-sm mx-auto mt-4">
      {/* Status */}
      <View className='flex-row justify-between items-center mb-2'>
      <Text className="text-blue-500 font-bold">Paid</Text>

      {/* Amount Paid */}
      <Text className="text-gray-700">KES {amount}</Text>
      </View>
      <View className='flex-row justify-between items-center mb-2'>
        {/* Date */}
      <Text className="text-gray-700">{date}</Text>
      {/* Transaction Ref */}
      <Text className="text-gray-700">{method}</Text>
      </View>
    </View>
    )
  }

  // bill component
  const Bill = ({ bill_date, units, bill_amount, due_date }) => {
    return(
      <View className="bg-white rounded-2xl p-5 shadow-lg w-full max-w-sm mx-auto mb-4 mt-4">
      {/* Month */}
      <Text className="text-lg font-bold text-blue-600 mb-3">{bill_date}</Text>

      {/* Details */}
      <View className='space-y-2'>
        <Text className="text-gray-700">Units: <Text className="font-semibold">{units}</Text></Text>
        <Text className="text-gray-700">Amount: <Text className="font-semibold">KES {bill_amount}</Text></Text>
        <Text className="text-gray-700">Due Date: <Text className="font-semibold">{due_date}</Text></Text>
      </View>

      {/* Pay Button */}
      <TouchableOpacity
        className="bg-blue-500 py-3 rounded-xl mt-5"
        onPress={() => alert("Proceeding to payment...")}
      >
        <Text className="text-white font-semibold text-center text-lg">Pay Now</Text>
      </TouchableOpacity>
    </View>
    )
  }


  return (
    <ScrollView className="flex-1 bg-white p-4">
       <View className="bg-white rounded-xl p-4 w-full max-w-sm shadow border border-gray-200">
      <Text className="text-lg font-bold text-blue-700">Gideon Ushindi</Text>
      <Text className="text-sm text-gray-500 mb-4">Previous Water Consumption</Text>

      <View className="bg-blue-50 rounded-lg p-4 items-center">
        <Text className="text-4xl font-bold text-blue-500">{totalUnits}</Text>
        <Text className="text-sm text-gray-500">Units</Text>
      </View>

      <View className="mt-4 items-end">
        <Text className="text-xs text-gray-400">Last recorded: {lastRecorded}</Text>
      </View>
    </View>

    <View className="bg-white font-sans">
              {bills.length === 0 ? (
                <Text className="text-gray-600 font-lato">No bills yet.</Text>
              ) : (
                <FlatList
                  data={bills} // Array of data
                  keyExtractor={(item) => item.id.toString()} // Unique key for each item
                  renderItem={({ item }) => (
                    <Bill
                      bill_date={item.date.split("T")[0]}
                      units={item.units}
                      bill_amount={item.amount}
                      due_date={item.due_date.split("T")[0]}
                    />
                  )}
                  showsVerticalScrollIndicator={false} // Hides the scrollbar
                  listMode="SCROLLVIEW"
                />
              )}
              
            </View>


    {/* transaction section */}
     {/* Title */}
      <Text className="text-lg font-bold text-blue-500 mt-4 mb-2">Payment Transactions</Text>
    <View className="bg-white font-sans">
              {transactions.length === 0 ? (
                <Text className="text-gray-600 font-lato">No transactions made.</Text>
              ) : (
                <FlatList
                  data={transactions} // Array of data
                  keyExtractor={(item) => item.id.toString()} // Unique key for each item
                  renderItem={({ item }) => (
                    <Transaction
                      date={item.date.split("T")[0]}
                      amount={item.amount}
                      method={item.payment_method}
                    />
                  )}
                  showsVerticalScrollIndicator={false} // Hides the scrollbar
                  listMode="SCROLLVIEW"
                />
              )}
              
            </View>

    </ScrollView>
  );
}
