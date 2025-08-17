// app/(tabs)/home.jsx

import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import '../../global.css';

export default function Reports() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className='mb-4 text-lg font-bold'>Himwa income reports</Text>
      <View className="flex-row items-center bg-white p-4 rounded-lg shadow-lg">
        <View className='flex-1'>
          <Text className='font-bold'>Monthly report</Text>
          <Text className='text-blue-500'>The report contains summary of this month</Text>
        </View>
        <Text className='ml-2'>31/07/2025</Text>
        <TouchableOpacity className='bg-blue-500 p-2 rounded-lg m-4'>
          <Text className='ml-2 text-white font-bold'>Download</Text>
        </TouchableOpacity>

      </View>

      <View className="flex-row items-center bg-white p-4 rounded-lg shadow-lg">
        <View className='flex-1'>
          <Text className='font-bold'>Quartely report</Text>
          <Text className='text-blue-500'>The report contains summary of this quarter</Text>
        </View>
        <Text className='ml-2'>31/07/2025</Text>
        <TouchableOpacity className='bg-blue-500 p-2 rounded-lg m-4'>
          <Text className='ml-2 text-white font-bold'>Download</Text>
        </TouchableOpacity>

      </View>

      <View className="flex-row items-center bg-white p-4 rounded-lg shadow-lg">
        <View className='flex-1'>
          <Text className='font-bold'>Yearly report</Text>
          <Text className='text-blue-500'>The report contains summary of this quarter</Text>
        </View>
        <Text className='ml-2'>31/07/2025</Text>
        <TouchableOpacity className='bg-blue-500 p-2 rounded-lg m-4'>
          <Text className='ml-2 text-white font-bold'>Download</Text>
        </TouchableOpacity>

      </View>

      <View className="flex-row items-center bg-white p-4 rounded-lg shadow-lg">
        <View className='flex-1'>
          <Text className='font-bold'>Quartely report</Text>
          <Text className='text-blue-500'>The report contains summary of this quarter</Text>
        </View>
        <Text className='ml-2'>31/07/2025</Text>
        <TouchableOpacity className='bg-blue-500 p-2 rounded-lg m-4'>
          <Text className='ml-2 text-white font-bold'>Download</Text>
        </TouchableOpacity>

      </View>

      <View className="flex-row items-center bg-white p-4 rounded-lg shadow-lg">
        <View className='flex-1'>
          <Text className='font-bold'>Quartely report</Text>
          <Text className='text-blue-500'>The report contains summary of this quarter</Text>
        </View>
        <Text className='ml-2'>31/07/2025</Text>
        <TouchableOpacity className='bg-blue-500 p-2 rounded-lg m-4'>
          <Text className='ml-2 text-white font-bold'>Download</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}
