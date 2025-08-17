// app/(tabs)/home.jsx

import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import '../../global.css';

export default function Bills() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
       <View className="bg-white rounded-xl p-4 w-full max-w-sm shadow border border-gray-200">
      <Text className="text-lg font-bold text-blue-700">Gideon Ushindi</Text>
      <Text className="text-sm text-gray-500 mb-4">Previous Water Consumption</Text>

      <View className="bg-blue-50 rounded-lg p-4 items-center">
        <Text className="text-4xl font-bold text-blue-500">20</Text>
        <Text className="text-sm text-gray-500">Units</Text>
      </View>

      <View className="mt-4 items-end">
        <Text className="text-xs text-gray-400">Last recorded: 12/03/2025</Text>
      </View>
    </View>

    <View className="bg-white rounded-2xl p-5 shadow-lg w-full max-w-sm mx-auto mt-4">
      {/* Month */}
      <Text className="text-lg font-bold text-blue-600 mb-3">
        August Bill
      </Text>

      {/* Details */}
      <View className='space-y-2'>
        <Text className="text-gray-700">Units: <Text className="font-semibold">20</Text></Text>
        <Text className="text-gray-700">Amount: <Text className="font-semibold">KES 2,000</Text></Text>
        <Text className="text-gray-700">Debt: <Text className="font-semibold">KES 3,000</Text></Text>
        <Text className="text-gray-700">Total: <Text className="font-semibold">KES 5,000</Text></Text>
        <Text className="text-gray-700">Due Date: <Text className="font-semibold">12/08/2025</Text></Text>
      </View>

      {/* Pay Button */}
      <TouchableOpacity
        className="bg-blue-500 py-3 rounded-xl mt-5"
        onPress={() => alert("Proceeding to payment...")}
      >
        <Text className="text-white font-semibold text-center text-lg">Pay Now</Text>
      </TouchableOpacity>
    </View>

    {/* transaction section */}
    
      {/* Title */}
      <Text className="text-lg font-bold text-blue-500 mt-4 mb-2">Payment Transactions</Text>

      <View className="bg-white rounded-2xl p-5 shadow-lg w-full max-w-sm mx-auto mt-4">
      {/* Status */}
      <View className='flex-row justify-between items-center mb-2'>
      <Text className="text-blue-500 font-bold">Paid</Text>

      {/* Amount Paid */}
      <Text className="text-gray-700">KES 500</Text>
      </View>
      <View className='flex-row justify-between items-center mb-2'>
        {/* Date */}
      <Text className="text-gray-700">12/03/2024</Text>
      {/* Transaction Ref */}
      <Text className="text-gray-700">T900VSHHSJS</Text>
      </View>
    </View>

    <View className="bg-white rounded-2xl p-5 shadow-lg w-full max-w-sm mx-auto mt-4">
      {/* Status */}
      <View className='flex-row justify-between items-center mb-2'>
      <Text className="text-blue-500 font-bold">Paid</Text>

      {/* Amount Paid */}
      <Text className="text-gray-700">KES 500</Text>
      </View>
      <View className='flex-row justify-between items-center mb-2'>
        {/* Date */}
      <Text className="text-gray-700">12/03/2024</Text>
      {/* Transaction Ref */}
      <Text className="text-gray-700">T900VSHHSJS</Text>
      </View>
    </View>

    <View className="bg-white rounded-2xl p-5 shadow-lg w-full max-w-sm mx-auto mt-4">
      {/* Status */}
      <View className='flex-row justify-between items-center mb-2'>
      <Text className="text-blue-500 font-bold">Paid</Text>

      {/* Amount Paid */}
      <Text className="text-gray-700">KES 500</Text>
      </View>
      <View className='flex-row justify-between items-center mb-2'>
        {/* Date */}
      <Text className="text-gray-700">12/03/2024</Text>
      {/* Transaction Ref */}
      <Text className="text-gray-700">T900VSHHSJS</Text>
      </View>
    </View>
    </ScrollView>
  );
}
