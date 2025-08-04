import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function NotificationIcon(){
  const router = useRouter();
  const gotToNotification =async()=>{
    router.push('/notifications');
  }
  
  return (
    <TouchableOpacity
      style={{ marginRight: 10 }}
      onPress={gotToNotification}
    >
      <MaterialCommunityIcons name="bell-outline" size={24} color="#3B82F6" />
    </TouchableOpacity>
  );
};