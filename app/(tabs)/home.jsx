// app/(tabs)/home.jsx

import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Header */}
      <Text className="text-2xl font-bold text-blue-700 mb-4">
        Welcome to Himwa
      </Text>

      {/* Summary Cards */}
      <View className="flex-row justify-between mb-4">
        <View className="bg-blue-100 p-4 rounded-xl w-[48%]">
          <Text className="text-sm text-gray-500">My Contributions</Text>
          <Text className="text-xl font-semibold text-blue-800">KES 4,500</Text>
        </View>

        <View className="bg-green-100 p-4 rounded-xl w-[48%]">
          <Text className="text-sm text-gray-500">Loans Balance</Text>
          <Text className="text-xl font-semibold text-green-800">KES 2,000</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <Text className="text-lg font-semibold text-gray-700 mb-2">Quick Actions</Text>
      <View className="space-y-3">
        <TouchableOpacity className="bg-blue-500 p-3 rounded-lg">
          <Text className="text-white text-center">Make Contribution</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-green-500 p-3 rounded-lg">
          <Text className="text-white text-center">Apply for Loan</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-yellow-500 p-3 rounded-lg">
          <Text className="text-white text-center">View Reports</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
