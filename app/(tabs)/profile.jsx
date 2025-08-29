// app/(tabs)/home.jsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Profile() {
    const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [farmerId, setFarmerId] = useState(0);
  const [profileImg, setProfileImg] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
      { label: 'Hindi', value: 'Hindi' },
      { label: 'Sabasaba', value: 'Sabasaba' },
      { label: 'Kiongoni', value: 'Kiongoni' },
      { label: 'Matengeni', value: 'Matengeni' },
      { label: 'Safirisi', value: 'Safirisi' },
    ]);


   useFocusEffect(
  useCallback(() => {
    const handleGetData = async () => {
      try {
        const name = await AsyncStorage.getItem('member_name');
        const phonenumber = await AsyncStorage.getItem('phonenumber');
        const profile_image = await AsyncStorage.getItem('profile_image');


        setPhonenumber(phonenumber);
        setFullname(name);
        setProfileImg(profile_image);
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    handleGetData();
  }, [])
);

  
    // Pick an image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      setProfileImg(uri); // update preview
    }
  };

    const handleUpdate = async () => {
    if (fullname === "" || phonenumber === "" || value == null) {
      Alert.alert("Empty field", "Please fill all fields");

      return;
    }

    setIsLoading(true);
    try {
      const member_id = await AsyncStorage.getItem('member_id');
      const auth_token = await AsyncStorage.getItem('token');
      const formData = new FormData();
      formData.append("member_id", member_id);
      formData.append("member_name", fullname);
      formData.append("phonenumber", phonenumber);
      formData.append("area_of_residence", value);

      if (selectedImage) {
        const filename = selectedImage.split('/').pop();
        const match = /\.(\w+)$/.exec(filename ?? '');
        const type = match ? `image/${match[1]}` : `image`;

        formData.append("profile_image", {
          uri: selectedImage,
          name: filename,
          type,
        });
      }

      const response = await axios.post(
        "http://10.10.21.76:8000/updateprofile/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${auth_token}`
          },
        }
      );

      if (response.status === 200 && response.data.message === "ok") {
        Alert.alert("Success", "Updated successfully");
      } else {
        Alert.alert("Error", "An error occurred");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <ScrollView className="flex-1 bg-white p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
          <TouchableOpacity onPress={pickImage} className="items-center mb-4">
            <Image
              source={{ uri: profileImg }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                borderWidth: 3,
                borderColor: '#fff',
                resizeMode: 'cover',
              }}
            />
            <Text className="text-blue-500 mt-2 underline font-lato">Change Photo</Text>
          </TouchableOpacity>

          <Text className="w-full text-lg font-bold font-lato text-blue-500">Your full names</Text>
          <TextInput
            placeholder="e.g John Doe"
            value={fullname}
            onChangeText={setFullname}
            className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-blue-500 text-gray-400 text-lg font-lato"
          />

          <Text className="w-full text-lg font-bold font-lato text-blue-500">Your phone number</Text>
          <TextInput
            placeholder="e.g 0712345678"
            value={phonenumber}
            onChangeText={setPhonenumber}
            keyboardType="phone-pad"
            className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-blue-500 text-gray-400 text-lg font-lato"
          />

          <Text className="w-full text-lg text-blue-500 font-bold">Area of residence</Text>
          <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select area of residence"
          style={{borderColor: '#3B82F6',borderWidth: 1, marginBottom:25  
          }}
          listMode="SCROLLVIEW"
          />

          <TouchableOpacity className="w-full bg-blue-500 p-4 rounded-lg" onPress={handleUpdate}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text className="text-white text-center font-semibold text-lg font-lato">Update</Text>
            )}
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
}
