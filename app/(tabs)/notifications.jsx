// app/(tabs)/home.jsx

import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function Notifications() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <View className="w-full bg-white rounded-2xl shadow-md p-4 mb-4 border border-gray-200">
      {/* Header: Icon + Date + Type */}
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center space-x-2">
          <MaterialCommunityIcons name="bell-ring" size={20} color="#3B82F6" />
          <Text className="text-sm text-gray-500 font-lato ml-2">12/03/2025</Text>
        </View>
        <Text className="text-sm font-semibold text-blue-500 lowercase font-lato">info</Text>
      </View>

      {/* Message */}
      <Text className="text-gray-800 text-base leading-5 font-lato">Welcome to himwa app.</Text>
    </View>

    <View className="w-full bg-white rounded-2xl shadow-md p-4 mb-4 border border-gray-200">
      {/* Header: Icon + Date + Type */}
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center space-x-2">
          <MaterialCommunityIcons name="bell-ring" size={20} color="#3B82F6" />
          <Text className="text-sm text-gray-500 font-lato ml-2">12/03/2025</Text>
        </View>
        <Text className="text-sm font-semibold text-blue-500 lowercase font-lato">info</Text>
      </View>

      {/* Message */}
      <Text className="text-gray-800 text-base leading-5 font-lato">Welcome to himwa app.</Text>
    </View>

    <View className="w-full bg-white rounded-2xl shadow-md p-4 mb-4 border border-gray-200">
      {/* Header: Icon + Date + Type */}
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center space-x-2">
          <MaterialCommunityIcons name="bell-ring" size={20} color="#3B82F6" />
          <Text className="text-sm text-gray-500 font-lato ml-2">12/03/2025</Text>
        </View>
        <Text className="text-sm font-semibold text-blue-500 lowercase font-lato">alert</Text>
      </View>

      {/* Message */}
      <Text className="text-gray-800 text-base leading-5 font-lato">Welcome to himwa app.</Text>
    </View>
    </ScrollView>
  );
}
