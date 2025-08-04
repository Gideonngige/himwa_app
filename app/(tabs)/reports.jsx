// app/(tabs)/home.jsx

import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function Reports() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <View>
        <Text className='text-blue-500'>Welcome to reports screen</Text>
      </View>
    </ScrollView>
  );
}
