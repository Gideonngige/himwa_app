import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from "expo-router";
import NotificationIcon from '../NotificationIcon';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'home') {
            iconName = 'home-outline';
          } 
          else if(route.name == 'profile'){
            iconName = 'account-outline';
          }
          else if(route.name == 'bills'){
            iconName = 'wallet-outline';
          }
          else if(route.name == 'members'){
            iconName = 'account-group-outline';
          }
          else if(route.name == 'reports'){
            iconName = 'chart-areaspline';
          }


          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home", headerRight: () => <NotificationIcon />}} />
      <Tabs.Screen name="bills" options={{ title: "Bills", headerRight: () => <NotificationIcon />}} />
      <Tabs.Screen name="reports" options={{ title: "Reports", headerRight: () => <NotificationIcon />}} />
      <Tabs.Screen name="members" options={{ title: "Members", headerRight: () => <NotificationIcon />}} />
      <Tabs.Screen name="profile" options={{ title: "Profile"}} />
      <Tabs.Screen name="notifications" options={{ href:null, title: "Notifications"}} />
      
      
      
    </Tabs>
  );
}