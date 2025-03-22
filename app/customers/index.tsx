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
  User,
  Phone,
  Package,
} from "lucide-react-native";

import Header from "../../components/Header";
import BottomNavigation from "../../components/navigation/BottomNavigation";

interface CustomerItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  activeRentals: number;
  totalSpent: number;
}

export default function CustomersScreen() {
  const insets = useSafeAreaInsets();

  const mockCustomers: CustomerItem[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      activeRentals: 2,
      totalSpent: 1250,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "(555) 987-6543",
      activeRentals: 1,
      totalSpent: 850,
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "mbrown@example.com",
      phone: "(555) 456-7890",
      activeRentals: 0,
      totalSpent: 3200,
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "(555) 234-5678",
      activeRentals: 3,
      totalSpent: 1750,
    },
    {
      id: "5",
      name: "Robert Wilson",
      email: "rwilson@example.com",
      phone: "(555) 876-5432",
      activeRentals: 0,
      totalSpent: 920,
    },
  ];

  const renderCustomerItem = ({ item }: { item: CustomerItem }) => {
    return (
      <TouchableOpacity
        className="bg-white p-4 rounded-lg mb-3 shadow-sm border border-gray-100"
        onPress={() => router.push(`/customers/view?id=${item.id}`)}
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900">
              {item.name}
            </Text>
            <Text className="text-gray-500 text-sm mt-1">{item.email}</Text>
            <View className="flex-row items-center mt-1">
              <Phone size={14} color="#6B7280" />
              <Text className="text-gray-500 text-sm ml-1">{item.phone}</Text>
            </View>
          </View>
          <View className="items-end">
            <View className="flex-row items-center">
              <Package size={14} color="#6B7280" />
              <Text className="text-gray-700 text-sm ml-1">
                {item.activeRentals} active
              </Text>
            </View>
            <Text className="text-gray-700 text-sm mt-1">
              ${item.totalSpent.toLocaleString()} spent
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header title="Customers" />
      <View className="flex-1 px-4 pt-4">
        <View className="flex-row justify-between items-center mb-4 animate-none">
          <View className="flex-row">
            <TouchableOpacity className="bg-white p-2 rounded-lg mr-2 shadow-sm">
              <Search size={20} color="#4B5563" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-2 rounded-lg shadow-sm">
              <Filter size={20} color="#4B5563" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="px-3 py-2 rounded-lg flex-row items-center bg-[#4489f0]"
            onPress={() => router.push("/customers/add")}
          >
            <Plus size={18} color="#FFFFFF" />
            <Text className="text-white font-medium ml-1">Add Customer</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={mockCustomers}
          renderItem={renderCustomerItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        />
      </View>
      <View className="absolute bottom-0 left-0 right-0">
        <BottomNavigation activeTab="customers" />
      </View>
    </SafeAreaView>
  );
}
