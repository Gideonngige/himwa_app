import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function RootLayout() {
  return (
    
    <SafeAreaProvider>
      <Stack screenOptions={{headerShown: true}}>
        <Stack.Screen name="index" options={{title:"Welcome"}}  />
        <Stack.Screen name="signin" options={{title:"Signin"}}  />
        <Stack.Screen name="signup" options={{title:"Signup"}}  />
        <Stack.Screen name="resetpassword" options={{title:"Reset password"}}  />
        <Stack.Screen name="paybill" options={{title:"Pay Bill"}}  />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      </Stack>
    </SafeAreaProvider>
  );
}