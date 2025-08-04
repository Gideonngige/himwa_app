// app/(tabs)/home.jsx

import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-white p-2">
      {/* Header */}
      <Text className="text-2xl font-bold text-blue-700 p-2 mb-2">
        Welcome, Gideon Ushindi
      </Text>

      <View className="bg-white rounded-xl shadow-md p-4 m-2">
      {/* Image */}
      <Image
        source={require('../../assets/images/members.png')}
        className="w-full h-40 rounded-lg mb-4"
        resizeMode="cover"
      />

      {/* Text Description */}
      <Text className="text-xl font-semibold text-blue-800 mb-2">Welcome to Himwa</Text>
      <Text className="text-gray-700 text-base">
        Himwa is a community-driven platform that empowers individuals through financial inclusion, 
        savings, investments, and group support. Together, we build a better future.
      </Text>
    </View>

    {/* Core Values Card */}
      <View className="bg-blue-100 p-4 rounded-xl mb-4">
        <Text className="text-xl font-bold text-blue-800 mb-2">Our Core Values</Text>
        <Text className="text-gray-700">
          • Integrity{'\n'}
          • Transparency{'\n'}
          • Teamwork{'\n'}
          • Empowerment{'\n'}
          • Accountability
        </Text>
      </View>

      {/* Mission Card */}
      <View className="bg-green-100 p-4 rounded-xl mb-4">
        <Text className="text-xl font-bold text-green-800 mb-2">Our Mission</Text>
        <Text className="text-gray-700">
          To empower communities through financial inclusion, collaborative savings, and accessible investment opportunities.
        </Text>
      </View>

      {/* Vision Card */}
      <View className="bg-yellow-100 p-4 rounded-xl mb-4">
        <Text className="text-xl font-bold text-yellow-800 mb-2">Our Vision</Text>
        <Text className="text-gray-700">
          To be the leading digital platform for community-based economic empowerment across Africa.
        </Text>
      </View>


    </ScrollView>
  );
}
