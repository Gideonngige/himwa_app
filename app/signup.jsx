import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
// import Toast from "react-native-toast-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import "../global.css";

export default function SignUp() {
    const router = useRouter();

    const [fullname, setFullname] = useState("");
    const [nationalID, setNationalID] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    // Area dropdown state
    const [areaOpen, setAreaOpen] = useState(false);
    const [areaValue, setAreaValue] = useState(null);
    const [areas, setAreas] = useState([
        { label: "Hindi", value: "Hindi" },
        { label: "Sabasaba", value: "Sabasaba" },
        { label: "Hindi Town", value: "Hindi Town" },
        { label: "Safirisi", value: "Safirisi" },
        { label: "Kiongoni", value: "Kiongoni" },
        { label: "Matengeni", value: "Matengeni" },
    ]);


    // Handle registration
    const handleSignUp = async () => {
        if (!fullname || !phonenumber || !email || !areaValue || !password || !confirmPassword) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        setIsLoading(true);
        try {
            const url = "http://172.16.88.203:8000/signup/";
            const data = {
                fullname: fullname,
                national_id: nationalID,
                phonenumber: phonenumber,
                email: email,
                area_of_residence: areaValue,
                password: password,
            };

            const response = await axios.post(url, data, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 201) {
                Alert.alert("Success", "Signup successful");
                router.push("signin/");
            } else {
                Alert.alert("Error", `${response.data.message}`);
                
            }
        } catch (error) {
            if (error.response) {
                Alert.alert("Error", `${error.response.data.message}`);
            } else {
                Alert.alert("Error", `${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView nestedScrollEnabled={true} className="p-4">
                <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
                    <Text className="text-3xl text-blue-500  font-bold">SIGN UP</Text>
                    <Image source={require('../assets/images/himwa_logo.png')} className="w-full h-56" style={{ resizeMode:"contain", height:150}}/>
                    <View className="w-full mt-2">
                        {/* Full Name */}
                        <Text className="text-blue-500  text-lg font-bold">Full names<Text className="text-red-600"> *</Text></Text>
                        <TextInput
                            placeholder="e.g. Gideon Ushindi"
                            value={fullname}
                            onChangeText={setFullname}
                            className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-blue-500  text-gray-700 text-lg"
                        />

                        {/* National ID */}
                        <Text className="text-blue-500  text-lg font-bold">National ID<Text className="text-red-600"> *</Text></Text>
                        <TextInput
                            placeholder="e.g. 12345678"
                            value={nationalID}
                            onChangeText={setNationalID}
                            className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-blue-500  text-gray-700 text-lg"
                        />

                        {/* Phone Number */}
                        <Text className="text-blue-500  text-lg font-bold">Phone number<Text className="text-red-600"> *</Text></Text>
                        <TextInput
                            placeholder="e.g. 254712345678"
                            keyboardType="phone-pad"
                            maxLength={12}
                            value={phonenumber}
                            onChangeText={setPhonenumber}
                            className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-blue-500  text-gray-700 text-lg"
                        />

                        {/* Email */}
                        <Text className="text-blue-500  text-lg font-bold">Email<Text className="text-red-600"> *</Text></Text>
                        <TextInput
                            placeholder="e.g. johndoe@example.com"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-blue-500  text-gray-700 text-lg"
                        />

                        {/* Area Dropdown */}
                        <Text className="text-blue-500  text-lg font-bold mt-4">Area of residence<Text className="text-red-600"> *</Text></Text>
                        <DropDownPicker
                            open={areaOpen}
                            value={areaValue}
                            items={areas}
                            setOpen={setAreaOpen}
                            setValue={setAreaValue}
                            setItems={setAreas}
                            placeholder="Select your area of residence"
                            style={{ borderColor: '#3B82F6', borderWidth: 1 }}
                            listMode="MODAL"
                            zIndex={2000}
                            zIndexInverse={2000}
                        />

                        {/* Password */}
                        <Text className="text-blue-500  text-lg font-bold mt-4">Password<Text className="text-red-600"> *</Text></Text>
                        <View className="relative mb-4">
                            <TextInput
                                placeholder="Enter your password"
                                secureTextEntry={!isPasswordVisible}
                                value={password}
                                onChangeText={setPassword}
                                className="w-full p-4 pr-12 bg-white rounded-lg shadow-sm border border-blue-500  text-gray-700 text-lg"
                            />
                            <TouchableOpacity
                                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                className="absolute right-4 top-4"
                            >
                                <Ionicons name={isPasswordVisible ? "eye" : "eye-off"} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>

                        {/* Confirm Password */}
                        <Text className="text-blue-500  text-lg font-bold">Confirm Password<Text className="text-red-600"> *</Text></Text>
                        <View className="relative mb-6">
                            <TextInput
                                placeholder="Confirm your password"
                                secureTextEntry={!isConfirmVisible}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                className="w-full p-4 pr-12 bg-white rounded-lg shadow-sm border border-blue-500  text-gray-700 text-lg"
                            />
                            <TouchableOpacity
                                onPress={() => setIsConfirmVisible(!isConfirmVisible)}
                                className="absolute right-4 top-4"
                            >
                                <Ionicons name={isConfirmVisible ? "eye" : "eye-off"} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>

                        {/* Sign Up Button */}
                        <TouchableOpacity className="w-full bg-blue-500  p-4 rounded-lg" onPress={handleSignUp}>
                            {isLoading ? <ActivityIndicator size="large" color="#fff" /> :
                                <Text className="text-white text-center font-semibold text-lg">Sign Up</Text>}
                        </TouchableOpacity>

                        {/* Navigation to Sign In */}
                        <View className="flex-row justify-center mt-4">
                            <Text className="text-lg">Already have an account? </Text>
                            <TouchableOpacity onPress={() => router.push("/signin")}>
                                <Text className="text-lg text-blue-500 ">Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* <Toast /> */}
                <StatusBar style="auto" />
            </ScrollView>
        </SafeAreaView>
    );
}