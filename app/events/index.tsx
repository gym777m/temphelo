import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  Plus,
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  DollarSign,
} from "lucide-react-native";

import Header from "../../components/Header";
import BottomNavigation from "../../components/navigation/BottomNavigation";

interface EventItem {
  id: string;
  title: string;
  date: string;
  venue: string;
  customer: string;
  staffCount: number;
  revenue: number;
  status: "Upcoming" | "In Progress" | "Completed";
}

export default function EventsScreen() {
  const insets = useSafeAreaInsets();

  const mockEvents: EventItem[] = [
    {
      id: "1",
      title: "Johnson Wedding",
      date: "Jun 15, 2023",
      venue: "Grand Hall, Downtown",
      customer: "Sarah Johnson",
      staffCount: 4,
      revenue: 2500,
      status: "Upcoming",
    },
    {
      id: "2",
      title: "Corporate Conference",
      date: "Jun 18, 2023",
      venue: "Business Center",
      customer: "Tech Solutions Inc.",
      staffCount: 6,
      revenue: 3800,
      status: "Upcoming",
    },
    {
      id: "3",
      title: "Smith Birthday Party",
      date: "Jun 10, 2023",
      venue: "Garden Venue",
      customer: "John Smith",
      staffCount: 2,
      revenue: 950,
      status: "Completed",
    },
    {
      id: "4",
      title: "Davis Anniversary",
      date: "Jun 12, 2023",
      venue: "Lakeside Resort",
      customer: "Emily Davis",
      staffCount: 3,
      revenue: 1750,
      status: "Completed",
    },
    {
      id: "5",
      title: "Product Launch",
      date: "Jun 14, 2023",
      venue: "Convention Center",
      customer: "Innovative Products LLC",
      staffCount: 5,
      revenue: 4200,
      status: "In Progress",
    },
  ];

  const renderEventItem = ({ item }: { item: EventItem }) => {
    const statusColor = {
      Upcoming: "bg-blue-100 text-blue-800",
      "In Progress": "bg-yellow-100 text-yellow-800",
      Completed: "bg-green-100 text-green-800",
    }[item.status];

    return (
      <TouchableOpacity
        className="bg-white p-4 rounded-lg mb-3 shadow-sm border border-gray-100"
        onPress={() => router.push(`/events/view?id=${item.id}`)}
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900">
              {item.title}
            </Text>
            <View className="flex-row items-center mt-1">
              <Calendar size={14} color="#6B7280" />
              <Text className="text-gray-500 text-sm ml-1">{item.date}</Text>
            </View>
            <View className="flex-row items-center mt-1">
              <MapPin size={14} color="#6B7280" />
              <Text className="text-gray-500 text-sm ml-1">{item.venue}</Text>
            </View>
            <Text className="text-gray-500 text-sm mt-1">
              Client: {item.customer}
            </Text>
          </View>
          <View className={`px-2 py-1 rounded-full ${statusColor}`}>
            <Text className="text-xs font-medium">{item.status}</Text>
          </View>
        </View>
        <View className="flex-row mt-3 pt-3 border-t border-gray-100">
          <View className="flex-row items-center mr-4">
            <Users size={14} color="#6B7280" />
            <Text className="text-gray-700 text-sm ml-1">
              {item.staffCount} staff
            </Text>
          </View>
          <View className="flex-row items-center">
            <DollarSign size={14} color="#6B7280" />
            <Text className="text-gray-700 text-sm ml-1">
              ${item.revenue.toLocaleString()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header title="Events" />

      <View className="flex-1 px-4 pt-4">
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row">
            <TouchableOpacity className="bg-white p-2 rounded-lg mr-2 shadow-sm">
              <Search size={20} color="#4B5563" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-2 rounded-lg shadow-sm">
              <Filter size={20} color="#4B5563" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="bg-blue-500 px-3 py-2 rounded-lg flex-row items-center"
            onPress={() => router.push("/events/add")}
          >
            <Plus size={18} color="#FFFFFF" />
            <Text className="text-white font-medium ml-1">Add Event</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={mockEvents}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        />
      </View>

      <View className="absolute bottom-0 left-0 right-0">
        <BottomNavigation activeTab="events" />
      </View>
    </SafeAreaView>
  );
}
