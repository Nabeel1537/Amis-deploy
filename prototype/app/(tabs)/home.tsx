import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Animated,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ComponentProps } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
type IconName = ComponentProps<typeof Ionicons>["name"];

export default function Home() {
  const router = useRouter();

  // 🧠 REAL USER
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const data = await AsyncStorage.getItem("user");

      if (data) {
        setUser(JSON.parse(data));
      } else {
        router.replace("/login");
      }
    };

    loadUser();
  }, []);

  // 🟩 CATEGORY (same structure as your original)
 const categories: { name: string; icon: IconName }[] = [
  { name: "Vegetables", icon: "leaf" },
  { name: "Fruits", icon: "nutrition" },
  { name: "Meat", icon: "restaurant" },
  { name: "Grains", icon: "leaf-outline" },
  { name: "Dairy", icon: "water" },
  { name: "Poultry", icon: "egg" },
];

  const [search, setSearch] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  // ⏳ TIMER (same logic)
  useEffect(() => {
    const target = Date.now() + 24 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      const diff = target - Date.now();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    const total = Math.floor(ms / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const filtered = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🎬 HEADER ANIMATION (same)
  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, []);

  const headerTranslate = headerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-120, 0],
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#1b5e20" />

      {/* 🌿 HEADER */}
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{ translateY: headerTranslate }],
            opacity: headerAnim,
          },
        ]}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.name}>
              Hello, {user?.name || "Farmer"} 👋
            </Text>
            <Text style={styles.location}>
              📍 Sindh Agriculture Portal
            </Text>
          </View>

          <TouchableOpacity
            style={styles.iconBox}
            onPress={() => router.replace("/(tabs)/profile")}
          >
            <Ionicons name="person" size={24} color="#1b5e20" />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerSub}>
          SWAT • Smart Agriculture System 🌾
        </Text>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* 🔍 SEARCH */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            placeholder="Search categories..."
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />
        </View>

        {/* 🌾 SLIDER (placeholder like your system) */}
        <View style={styles.slider}>
          <Text style={{ textAlign: "center", padding: 20 }}>
            Agriculture Slider Here 🌱
          </Text>
        </View>

        {/* 📊 CARDS */}
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Ionicons name="apps" size={22} color="#2e7d32" />
            <Text style={styles.cardNum}>{categories.length}</Text>
            <Text style={styles.cardText}>Items</Text>
          </View>

          <View style={styles.card}>
            <Ionicons name="pulse" size={22} color="#2e7d32" />
            <Text style={styles.cardNum}>Live</Text>
            <Text style={styles.cardText}>Status</Text>
          </View>

          <View style={styles.card}>
            <Ionicons name="timer" size={22} color="#2e7d32" />
            <Text style={styles.cardNum}>{formatTime(timeLeft)}</Text>
            <Text style={styles.cardText}>Timer</Text>
          </View>
        </View>

        {/* 🟩 GRID */}
        <Text style={styles.section}>Categories</Text>

        <View style={styles.grid}>
          {filtered.map((item, i) => (
            <View key={i} style={styles.gridCard}>
              <Ionicons name={item.icon} size={26} color="#2e7d32" />
              <Text style={styles.gridText}>{item.name}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f4fbf4" },

  header: {
    backgroundColor: "#1b5e20",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
  },

  name: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  location: { color: "#c8e6c9", fontSize: 12 },

  headerSub: { marginTop: 8, color: "#e8f5e9", fontSize: 12 },

  searchBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 15,
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
  },

  input: { marginLeft: 10, flex: 1 },

  slider: {
    marginHorizontal: 15,
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 18,
    justifyContent: "center",
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },

  card: {
    backgroundColor: "#fff",
    width: "30%",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  cardNum: { fontWeight: "bold", color: "#1b5e20" },
  cardText: { fontSize: 10, color: "#666" },

  section: {
    marginLeft: 15,
    marginTop: 18,
    fontWeight: "bold",
    color: "#1b5e20",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 10,
  },

  gridCard: {
    width: "30%",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 10,
    borderRadius: 14,
    alignItems: "center",
  },

  gridText: { marginTop: 6 },
});