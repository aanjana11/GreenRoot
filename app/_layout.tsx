import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");

        const loggedIn = !!token;
        setIsAuthenticated(loggedIn);

        const isAuthRoute = pathname === "/login" || pathname === "/signup";

        if (!loggedIn && !isAuthRoute) {
          router.replace("/login");
        }

        if (loggedIn && isAuthRoute) {
          router.replace("/(tabs)");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname]);

  if (loading) {
    // ⏳ Prevent route flicker
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F0FDF4",
        }}
      >
        <ActivityIndicator size="large" color="#16A34A" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Auth screens */}
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />

      {/* Main app */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
