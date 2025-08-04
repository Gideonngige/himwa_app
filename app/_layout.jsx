import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import { Provider } from 'react-redux';
// import NotificationIcon from './NotificationIcon';
// import store from './store/store';
export default function RootLayout() {
  return (
    
    <SafeAreaProvider>
      {/* <Provider store={store}> */}
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index" options={{title:"Welcome"}}  />

      </Stack>
      {/* </Provider> */}
    </SafeAreaProvider>
  );
}