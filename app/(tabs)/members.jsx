// app/(tabs)/home.jsx

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMembers = async () => {
      const auth_token = await AsyncStorage.getItem('token');
      axios.get(`http://172.16.88.203:8000/members`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${auth_token}`
          },
        })
        .then((response) => {
          setMembers(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getMembers();
  }, []);


  const ProfileCard = ({ name, email, joined_date, profile_image }) => (
    <View className="bg-white mb-4 p-4 rounded-2xl  shadow-lg">
      <View className="flex-row items-center">
        <Image
          source={{ uri: profile_image }}
          style={{ width: 60, height: 60 }}
          className="rounded-full"
        />
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900 font-lato">{name}</Text>
          <Text className="text-sm text-gray-900 font-lato">{email}</Text>
        </View>
        <Text className="text-xs text-blue-500 mt-1 font-lato">Joined: {joined_date}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-600 mt-4 font-lato">Loading members...</Text>
      </View>
    );
  }


  return (
    <SafeAreaView className="flex-1 bg-white p-4">

      <FlatList
        data={members}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProfileCard
            name={item.name}
            email={item.email}
            joined_date={item.joined_date.split('T')[0]}
            profile_image={item.profile_image}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />


    </SafeAreaView >
  );
}
