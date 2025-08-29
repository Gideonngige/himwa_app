// app/(tabs)/home.jsx

import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';

export default function Notifications() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useFocusEffect(
  useCallback(() => {
    const fetchNotifications = async () => {
      try {
        const member_id = await AsyncStorage.getItem('member_id');
        const auth_token = await AsyncStorage.getItem('token');

        const response = await axios.get(`http://10.10.21.76:8000/get_notifications/${member_id}/`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${auth_token}`
          },
        });
        setNotifications(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, [])
);

const NotificationItem = ({ date, type, message }) => {
  return (
    <View className="w-full bg-white rounded-2xl shadow-md p-4 mb-4 border border-gray-200">
      {/* Header: Icon + Date + Type */}
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center space-x-2">
          <MaterialCommunityIcons name="bell-ring" size={20} color="#3B82F6" />
          <Text className="text-sm text-gray-500 font-lato ml-2">{date}</Text>
        </View>
        <Text className="text-sm font-semibold text-blue-500 lowercase font-lato">{type}</Text>
      </View>

      {/* Message */}
      <Text className="text-gray-800 text-base leading-5 font-lato">{message}</Text>
    </View>
  );
};

 if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="text-gray-600 font-lato">Loading notifications...</Text>
        </View>
    )
  }


  return (
    <SafeAreaView className="flex-1 bg-white p-4">

      <View className="bg-white  p-5 font-sans">
          {notifications.length === 0 ? (
            <Text className="text-gray-600 font-serif font-lato">No notifications available.</Text>
          ) : (
            <FlatList
              data={notifications} // Array of data
              keyExtractor={(item) => item.notification_id.toString()} // Unique key for each item
              renderItem={({ item }) => (
                <NotificationItem
                  date={item.notification_date.split("T")[0]}
                  type={item.notification_type}
                  message={item.notification}
                />
              )}
              showsVerticalScrollIndicator={false} // Hides the scrollbar
              listMode="SCROLLVIEW"
            />
          )}
          
        </View>


      

    

    
    </SafeAreaView>
  );
}
