import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
// import Toast from "react-native-toast-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import "../global.css";

export default function SignUp() {
    const router = useRouter();

    const [fullname, setFullname] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    // County dropdown state
    const [countyOpen, setCountyOpen] = useState(false);
    const [countyValue, setCountyValue] = useState(null);
    const [counties, setCounties] = useState([]);

    // Area dropdown state
    const [areaOpen, setAreaOpen] = useState(false);
    const [areaValue, setAreaValue] = useState(null);
    const [areas, setAreas] = useState([]);

    // Fetch counties on load
    useEffect(() => {
        const fetchCounties = async () => {
            try {
                const response = await axios.get(`https://farmlinkbackend-qupt.onrender.com/get_counties/`);
                const formattedCounties = response.data.counties.map(county => ({
                    label: county.name,
                    value: county.id
                }));
                setCounties(formattedCounties);
            } catch (error) {
                console.error("Error fetching counties", error);
            }
        };
        fetchCounties();
    }, []);

    // Fetch areas when a county is selected
    useEffect(() => {
        const fetchAreas = async () => {
            if (!countyValue) return;
            try {
                const response = await axios.get(`https://farmlinkbackend-qupt.onrender.com/get_areas_by_county/${countyValue}`);
                const formattedAreas = response.data.areas.map(area => ({
                    label: area.name,
                    value: area.id
                }));
                setAreas(formattedAreas);
            } catch (error) {
                console.error("Error fetching areas", error);
            }
        };
        fetchAreas();
    }, [countyValue]);

    // Handle registration
    const handleSignUp = async () => {
        if (!fullname || !phonenumber || !email || !countyValue || !areaValue || !password || !confirmPassword) {
            // Toast.show({
            //     type: "error",
            //     text1: "Empty fields",
            //     text2: "Please fill in all fields",
            //     position: "center",
            // });
            return;
        }

        if (password !== confirmPassword) {
            // Toast.show({
            //     type: "error",
            //     text1: "Password mismatch",
            //     text2: "Passwords do not match",
            //     position: "center",
            // });
            return;
        }

        setIsLoading(true);
        try {
            const url = "https://farmlinkbackend-qupt.onrender.com/signup/";
            const data = {
                fullname: fullname,
                phonenumber: phonenumber,
                email: email,
                county: countyValue,
                areaofresident: areaValue,
                password: password,
            };

            const response = await axios.post(url, data, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 201) {
                // Toast.show({
                //     type: "success",
                //     text1: "Signup successful",
                //     text2: "You can now sign in",
                //     position: "center",
                // });
                router.push("signin/");
            } else {
                // Toast.show({
                //     type: "error",
                //     text1: "Failed signup",
                //     text2: response.data.message || "Something went wrong",
                //     position: "center",
                // });
            }
        } catch (error) {
            if (error.response) {
                // Toast.show({
                //     type: "error",
                //     text1: "Error",
                //     text2: error.response.data.message || "Server error",
                //     position: "center",
                // });
            } else {
                // Toast.show({
                //     type: "error",
                //     text1: "Network Error",
                //     text2: error.message,
                //     position: "center",
                // });
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

                        {/* County Dropdown */}
                        <Text className="text-blue-500  text-lg font-bold">County<Text className="text-red-600"> *</Text></Text>
                        <DropDownPicker
                            open={countyOpen}
                            value={countyValue}
                            items={counties}
                            setOpen={setCountyOpen}
                            setValue={setCountyValue}
                            setItems={setCounties}
                            placeholder="Select your county"
                            style={{ borderColor: '#3B82F6', borderWidth: 1 }}
                            listMode="SCROLLVIEW"
                            zIndex={3000}
                            zIndexInverse={1000}
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
                            listMode="SCROLLVIEW"
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