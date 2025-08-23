import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";

export default function NotificationDetails() {
  const { order_id, title, body } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="p-4">
        <View className="bg-white rounded-2xl shadow p-6 mt-4">
          <Text className="text-sm text-gray-400 mb-2">
            Order ID: {order_id || "N/A"}
          </Text>

          <Text className="text-xl font-semibold text-green-800 mb-3">
            {title || "Notification"}
          </Text>

          <Text className="text-base text-gray-700 leading-relaxed">
            {body || "No message content available."}
          </Text>
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}