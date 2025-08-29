// app/(tabs)/home.jsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  addNotificationListeners,
  registerForPushNotificationsAsync
} from '../notifications';

export default function HomeScreen() {
  const [profileImg, setProfileImg] = React.useState(null);
  const [memberName, setMemberName] = React.useState("Gideon Ushindi");

  // Push Notifications
  const [token, setToken] = useState('');
    const [notification, setNotification] = useState(null);
  useEffect(() => {
  const registerAndSendToken = async () => {
    try {
       const member_id = await AsyncStorage.getItem("member_id");
      const t = await registerForPushNotificationsAsync();
      const auth_token = await AsyncStorage.getItem('token');
      setToken(t);
      console.log("Token:", t);

      const url = `http://10.10.21.76:8000/send_expo_token/${member_id}/${t}/`;
      const response2 = await axios.get(url, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${auth_token}`
          },
        });

      if (response2.status === 200) {
        console.log(response2.data.message);
      } else {
        console.log("Token not sent");
      }
    } catch (err) {
      console.error(err);
    }
  };

  registerAndSendToken();

  const unsubscribe = addNotificationListeners(
    (notif) => setNotification(notif),
    (response) => {
      console.log('Notification clicked:', response);
      const { title, body, data } = response.notification.request.content;
      router.push({
        pathname: "/notificationdetails",
        params: {
          order_id: data.order_id,
          message: data.message || "",
          title: title || "",
          body: body || ""
      },
      });
    }
  );

  return unsubscribe;
}, []);

  useFocusEffect(
  useCallback(() => {
    const fetchData = async () => {
      try {
        const profile_image = await AsyncStorage.getItem('profile_image');
        const member_name = await AsyncStorage.getItem('member_name');
        setProfileImg(profile_image);
        setMemberName(member_name);
        
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [])
);


  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-row m-4 p-4 bg-white shadow-lg'>
        <TouchableOpacity onPress={()=>alert("Profile!")}>
            <Image
              source={{ uri: profileImg}}
              className="w-10 h-10 rounded-full mr-4"
            />
        </TouchableOpacity>
        <View>
          <Text className='text-lg font-bold'>Welcome</Text>
          <Text className='text-sm text-blue-500 font-bold'>{memberName}</Text>
        </View>
      </View>
    <ScrollView className="flex-1 bg-white p-2">
      {/* Header */}
      

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
    </SafeAreaView>
  );
}
