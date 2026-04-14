import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
const router = useRouter();

const logout = async () => {
  try {
    await AsyncStorage.removeItem("user");
    router.replace("/login");
  } catch (error) {
    console.log("Logout error:", error);
  }
};
export default function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={logout} style={{ padding: 12, backgroundColor: "red", borderRadius: 10 }}>
  <Text style={{ color: "#fff", fontWeight: "bold" }}>Logout</Text>
</TouchableOpacity>
    </View>
  );
}