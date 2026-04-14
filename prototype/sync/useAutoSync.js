import NetInfo from '@react-native-community/netinfo';
import { syncOfflineUsers } from './syncUsers';

export const startAutoSync = () => {
  NetInfo.addEventListener(state => {
    const isOnline = state.isConnected && state.isInternetReachable;

    console.log('Network status:', isOnline);

    if (isOnline) {
      console.log('Internet is back → syncing...');
      syncOfflineUsers();
    }
  });
};