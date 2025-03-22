import React, { useEffect } from "react";
import { View, ScrollView, SafeAreaView, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

// Import components
import Header from "../components/Header";
import DashboardSummary from "../components/dashboard/DashboardSummary";
import ActiveRentals from "../components/dashboard/ActiveRentals";
import UpcomingEvents from "../components/dashboard/UpcomingEvents";
import NotificationCenter from "../components/dashboard/NotificationCenter";
import BottomNavigation from "../components/navigation/BottomNavigation";

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();

  // Add error handling script for Tempo
  useEffect(() => {
    if (typeof document !== "undefined" && process.env.EXPO_PUBLIC_TEMPO) {
      const script = document.createElement("script");
      script.src =
        "https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js";
      document.head.appendChild(script);
    }
  }, []);

  // Mock handlers for component interactions
  const handleNotificationPress = () => {
    router.push("/notifications");
  };

  const handleViewRental = (id: string) => {
    router.push(`/orders/view?id=${id}`);
  };

  const handleViewAllEvents = () => {
    router.push("/events");
  };

  const handleNotificationItemPress = (notification: any) => {
    console.log("Notification pressed:", notification);
    // Navigate based on notification type
    if (notification.type === "order") {
      router.push(`/orders/view?id=${notification.id}`);
    } else if (notification.type === "event") {
      router.push(`/events/view?id=${notification.id}`);
    }
  };

  const handleViewAllNotifications = () => {
    router.push("/notifications");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Header title="Dashboard" onNotificationPress={handleNotificationPress} />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        <View className="p-4 space-y-4">
          {/* Dashboard Summary Cards */}
          <DashboardSummary
            activeRentals={24}
            upcomingEvents={8}
            monthlyRevenue={12580}
            pendingReturns={5}
          />

          {/* Active Rentals Section */}
          <ActiveRentals onViewRental={handleViewRental} />

          {/* Upcoming Events Section */}
          <UpcomingEvents onViewAll={handleViewAllEvents} />

          {/* Notification Center */}
          <NotificationCenter
            onNotificationPress={handleNotificationItemPress}
            onViewAllPress={handleViewAllNotifications}
          />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0">
        <BottomNavigation activeTab="dashboard" />
      </View>
    </SafeAreaView>
  );
}
