import { router } from "expo-router";
// import { StatusBar } from 'expo-status-bar';
import { Dimensions, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import "../global.css";

export default function Index() {  
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH * 0.99;

const data = [
  { title: 'Welcome to Himwa', image: require('../assets/images/himwa_logo.png') },
  { title: 'Monitor your water usage', image: require('../assets/images/track_water.png') },
  { title: 'Pay your water bills easily', image: require('../assets/images/water_bill.png') },
  { title: 'Download your receipts', image: require('../assets/images/receipt.png') },
  { title: 'See himwa members', image: require('../assets/images/members.png') },
];
const renderItem = ({ item }) => (
  <View style={[styles.itemContainer, { width: ITEM_WIDTH }]}>
    <Image source={item.image} style={styles.image} />
    <Text style={styles.title}>{item.title}</Text>
  </View>
);

  return (
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView nestedScrollEnabled={true} className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
    <Carousel
        data={data}
        renderItem={renderItem}
        width={SLIDER_WIDTH}
        height={250}  // Adjust height as needed
        loop={true}
        autoPlay={true}
        autoPlayInterval={3000}
      />

      <Text className="font-bold text-blue-500 text-center text-2xl font-lato">Pay bills, Monitor your water consumption</Text>
       
      <Text className="mt-6 text-small text-center font-lato">Welcome to Himwa App. Monitor your water consumption easily, pay your bills from your phone, download receipts and himwa monthly, quartely and yearly reports</Text>

      <View className="mt-8 w-full">
        <TouchableOpacity className="bg-blue-500 rounded-full" onPress={()=>router.push("/signup")}>
        <Text className="text-white text-center font-semibold text-lg font-lato p-4">Create new account</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-blue-500 rounded-full mt-8" onPress={()=>{router.push("/(tabs)/home")}}>
        <Text className="text-white text-center font-semibold text-lg font-lato p-4">I already have an account</Text>
      </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
    </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
});