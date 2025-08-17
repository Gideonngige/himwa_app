import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import { Provider } from 'react-redux';
// import NotificationIcon from './NotificationIcon';
// import store from './store/store';
export default function RootLayout() {
  return (
    
    <SafeAreaProvider>
      {/* <Provider store={store}> */}
      <Stack screenOptions={{headerShown: true}}>
        <Stack.Screen name="index" options={{title:"Welcome"}}  />
        <Stack.Screen name="signin" options={{title:"Signin"}}  />
        <Stack.Screen name="signup" options={{title:"Signup"}}  />
        <Stack.Screen name="resetpassword" options={{title:"Reset password"}}  />

      </Stack>
      {/* </Provider> */}
    </SafeAreaProvider>
  );
}