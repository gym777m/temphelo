import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import {
  Bell,
  AlertCircle,
  Clock,
  CheckCircle,
  ChevronRight,
} from "lucide-react-native";

type NotificationType = "alert" | "reminder" | "success";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationCenterProps {
  notifications?: Notification[];
  onNotificationPress?: (notification: Notification) => void;
  onViewAllPress?: () => void;
}

const NotificationCenter = ({
  notifications = [
    {
      id: "1",
      type: "alert",
      title: "Overdue Return",
      message: "Camera equipment for John Doe is 2 days overdue",
      time: "2h ago",
      read: false,
    },
    {
      id: "2",
      type: "reminder",
      title: "Event Tomorrow",
      message: "Wedding photoshoot at Sunset Gardens",
      time: "3h ago",
      read: false,
    },
    {
      id: "3",
      type: "success",
      title: "Payment Received",
      message: "Invoice #1234 has been paid in full",
      time: "5h ago",
      read: true,
    },
  ],
  onNotificationPress = () => {},
  onViewAllPress = () => {},
}: NotificationCenterProps) => {
  const getIconForType = (type: NotificationType) => {
    switch (type) {
      case "alert":
        return <AlertCircle size={20} color="#EF4444" />;
      case "reminder":
        return <Clock size={20} color="#F59E0B" />;
      case "success":
        return <CheckCircle size={20} color="#10B981" />;
      default:
        return <Bell size={20} color="#6B7280" />;
    }
  };

  return (
    <View className="bg-white p-4 rounded-lg shadow-sm">
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center">
          <Bell size={18} color="#4B5563" />
          <Text className="text-lg font-semibold ml-2 text-gray-800">
            Notifications
          </Text>
        </View>
        <TouchableOpacity onPress={onViewAllPress}>
          <Text className="text-blue-500 text-sm">View all</Text>
        </TouchableOpacity>
      </View>

      {notifications.length === 0 ? (
        <View className="py-6 items-center justify-center">
          <Bell size={24} color="#9CA3AF" />
          <Text className="text-gray-500 mt-2">No new notifications</Text>
        </View>
      ) : (
        <ScrollView className="max-h-[150px]">
          {notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              className={`flex-row items-start p-3 mb-2 rounded-md ${notification.read ? "bg-gray-50" : "bg-blue-50"}`}
              onPress={() => onNotificationPress(notification)}
            >
              <View className="mr-3 mt-1">
                {getIconForType(notification.type)}
              </View>
              <View className="flex-1">
                <Text
                  className={`font-medium ${notification.read ? "text-gray-700" : "text-gray-900"}`}
                >
                  {notification.title}
                </Text>
                <Text className="text-gray-600 text-sm mt-1">
                  {notification.message}
                </Text>
                <Text className="text-gray-400 text-xs mt-1">
                  {notification.time}
                </Text>
              </View>
              <ChevronRight size={16} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default NotificationCenter;
