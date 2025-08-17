import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
// import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
// import Toast from "react-native-toast-message";
import '../global.css';

export default function SignIn() {
  const[email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // start of handle login
  const handleSignIn = async () => {
    if(email == "" || password == ""){
    //   Toast.show({
    //     type: "error", // Can be "success", "error", "info"
    //     text1: "Empty fields",
    //     text2: "Please fill in all fields",
    //   });
      return;
    }
    else{
    setIsLoading(true);
    try {
      const response = await fetch('https://farmlinkbackend-qupt.onrender.com/signin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      
      const data = await response.json();
      if (response.status === 200) {
        await AsyncStorage.setItem("farmer_id", data.farmer_id.toString());
        await AsyncStorage.setItem("farmer_name", data.farmer_name);
        await AsyncStorage.setItem("farmer_email", data.farmer_email);
        await AsyncStorage.setItem("phone_number", data.phone_number);
        await AsyncStorage.setItem("county", data.county);
        await AsyncStorage.setItem("county_id", data.county_id.toString());
        await AsyncStorage.setItem("area_of_residence", data.area_of_resident);
        await AsyncStorage.setItem("profile_image", data.profile_image);
        await AsyncStorage.setItem("date_joined", data.date_joined);
        if(data.farmer_email == "adminfarmlink@gmail.com"){
          setEmail("");
          setPassword("");
          router.push('admin/')
        }
        else{
          setEmail("");
          setPassword("");
          router.replace("/(tabs)/home/");

        }
        
        
      } 
      else {
        // Toast.show({
        //   type: "error", // Can be "success", "error", "info"
        //   text1: "Login failed",
        //   text2: response.data.message,
        // });
        // alert("Login Failed:", response.data);
        return null;
      }
    } catch (error) {
    //   Toast.show({
    //     type: "error", // Can be "success", "error", "info"
    //     text1: "Login failed",
    //     text2: error.message,
    //   });
      return null;
    }
    finally{
      setIsLoading(false);
    }
  }
  };
   // end of handle login

  
  return (
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView nestedScrollEnabled={true} className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
      <Text className="text-3xl font-bold text-blue-500 mb-1">SIGN IN</Text>
      <Image source={require('../assets/images/himwa_logo.png')} className="w-full h-56 mb-2" style={{ resizeMode:"contain", height:150}}/>
      <Text className="w-full text-blue-500  text-lg font-bold">Email</Text>
      <TextInput 
      placeholder="eg.johndoe@example.com"
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-blue-500  text-gray-400 text-lg"
      />

      <View className="w-full mb-4">
      <Text className="w-full text-blue-500  text-lg font-bold">Password</Text>
      <View className="relative">
        <TextInput
          placeholder="your password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
          className="w-full p-4 pr-12 bg-white rounded-lg border border-blue-500  text-gray-400 text-lg font-lato mb-2"
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          className="absolute right-4 top-4"
        >
          <Ionicons
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
    </View>
      
      <TouchableOpacity className="w-full flex-row justify-end m-4" onPress={() => router.push("/resetpassword")}>
      <Text className="text-lg">Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-full bg-blue-500  p-4 rounded-lg" onPress={handleSignIn }>
        {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">SignIn</Text> }
        
      </TouchableOpacity>
      <View className="flex-row justify-center mt-4">
      <Text className="text-lg">Do not have an account? </Text>
      <TouchableOpacity onPress={() => router.push("/signup")}>
      <Text className="text-lg text-blue-500 ">SignUp</Text>
      </TouchableOpacity>
      </View>
      {/* <Toast/> */}
      <StatusBar style="auto" />
    </View>
    </ScrollView>
    </SafeAreaView>
    
  );
}