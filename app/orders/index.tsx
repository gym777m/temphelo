import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  Search,
  Filter,
  Package,
  Calendar,
  User,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle,
  Plus,
  X,
} from "lucide-react-native";

import Header from "../../components/Header";
import BottomNavigation from "../../components/navigation/BottomNavigation";

type OrderStatus = "Active" | "Pending Return" | "Returned" | "Overdue";

interface OrderItem {
  id: string;
  customerName: string;
  items: string[];
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: OrderStatus;
  daysRemaining?: number;
  daysOverdue?: number;
}

export default function OrdersScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<OrderStatus | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const mockOrders: OrderItem[] = [
    {
      id: "1",
      customerName: "John Smith",
      items: ["Canon 5D Mark IV", "Tripod", "50mm Lens"],
      startDate: "Jun 10, 2023",
      endDate: "Jun 15, 2023",
      totalAmount: 650,
      status: "Active",
      daysRemaining: 3,
    },
    {
      id: "2",
      customerName: "Sarah Johnson",
      items: ["PA System", "Wireless Microphones (2)"],
      startDate: "Jun 12, 2023",
      endDate: "Jun 18, 2023",
      totalAmount: 480,
      status: "Active",
      daysRemaining: 6,
    },
    {
      id: "3",
      customerName: "Michael Brown",
      items: ["Projector", "Projection Screen", "HDMI Cable"],
      startDate: "Jun 5, 2023",
      endDate: "Jun 12, 2023",
      totalAmount: 350,
      status: "Overdue",
      daysOverdue: 1,
    },
    {
      id: "4",
      customerName: "Emily Davis",
      items: ["Lighting Kit", "Backdrop Stand"],
      startDate: "Jun 8, 2023",
      endDate: "Jun 14, 2023",
      totalAmount: 420,
      status: "Pending Return",
      daysRemaining: 0,
    },
    {
      id: "5",
      customerName: "Robert Wilson",
      items: ["Sony A7 III", "24-70mm Lens", "Flash Kit"],
      startDate: "Jun 1, 2023",
      endDate: "Jun 8, 2023",
      totalAmount: 580,
      status: "Returned",
    },
  ];

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "Active":
        return <Package size={20} color="#3B82F6" />;
      case "Pending Return":
        return <Clock size={20} color="#F59E0B" />;
      case "Returned":
        return <CheckCircle size={20} color="#10B981" />;
      case "Overdue":
        return <AlertCircle size={20} color="#EF4444" />;
      default:
        return <Package size={20} color="#6B7280" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-800";
      case "Pending Return":
        return "bg-yellow-100 text-yellow-800";
      case "Returned":
        return "bg-green-100 text-green-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter orders by status and search query
  const filteredOrders = mockOrders
    .filter((order) => activeFilter === "All" || order.status === activeFilter)
    .filter((order) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        order.customerName.toLowerCase().includes(query) ||
        order.items.some((item) => item.toLowerCase().includes(query))
      );
    });

  const handleMarkAsReturned = (id: string) => {
    console.log(`Marking order ${id} as returned`);
    // In a real app, you would update the order status in the database
    // and then refresh the orders list
  };

  const handleViewInvoice = (id: string) => {
    router.push(`/invoices/view?id=${id}`);
  };

  const renderOrderItem = ({ item }: { item: OrderItem }) => {
    const statusColor = getStatusColor(item.status);

    return (
      <TouchableOpacity
        className="bg-white p-4 rounded-lg mb-3 shadow-sm border border-gray-100"
        onPress={() => router.push(`/orders/view?id=${item.id}`)}
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <User size={14} color="#6B7280" />
              <Text className="font-semibold text-gray-900 ml-1">
                {item.customerName}
              </Text>
            </View>
            <Text className="text-gray-600 text-sm mb-1">
              {item.items.length > 1
                ? `${item.items[0]} +${item.items.length - 1} more`
                : item.items[0]}
            </Text>
            <View className="flex-row items-center">
              <Calendar size={14} color="#6B7280" />
              <Text className="text-gray-500 text-sm ml-1">
                {item.startDate} - {item.endDate}
              </Text>
            </View>
          </View>
          <View className="items-end">
            <View className={`px-2 py-1 rounded-full mb-2 ${statusColor}`}>
              <Text className="text-xs font-medium">{item.status}</Text>
            </View>
            <Text className="font-semibold">${item.totalAmount}</Text>
            {item.status === "Active" && item.daysRemaining !== undefined && (
              <Text
                className={`text-xs ${item.daysRemaining <= 2 ? "text-red-600" : "text-gray-600"}`}
              >
                {item.daysRemaining} days remaining
              </Text>
            )}
            {item.status === "Overdue" && item.daysOverdue !== undefined && (
              <Text className="text-xs text-red-600">
                {item.daysOverdue} {item.daysOverdue === 1 ? "day" : "days"}{" "}
                overdue
              </Text>
            )}
          </View>
        </View>
        <View className="flex-row justify-end mt-3 pt-2 border-t border-gray-100">
          <TouchableOpacity
            className="flex-row items-center mr-3"
            onPress={() => handleViewInvoice(item.id)}
          >
            <FileText size={14} color="#3B82F6" />
            <Text className="text-blue-600 text-sm ml-1">Invoice</Text>
          </TouchableOpacity>
          {item.status !== "Returned" && (
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => handleMarkAsReturned(item.id)}
            >
              <CheckCircle size={14} color="#10B981" />
              <Text className="text-green-600 text-sm ml-1">Mark Returned</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header title="Rental Orders" />
      <View className="flex-1 px-4 pt-4 shrink">
        <View className="flex-row justify-between items-center mb-4">
          {showSearch ? (
            <View className="flex-1 flex-row items-center bg-white rounded-lg p-2 mr-2">
              <Search size={20} color="#4B5563" />
              <TextInput
                className="flex-1 ml-2"
                placeholder="Search orders..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              <TouchableOpacity
                onPress={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
              >
                <Text className="text-blue-500">Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex-row">
              <TouchableOpacity
                className="bg-white p-2 rounded-lg mr-2 shadow-sm"
                onPress={() => setShowSearch(true)}
              >
                <Search size={20} color="#4B5563" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-white p-2 rounded-lg shadow-sm">
                <Filter size={20} color="#4B5563" />
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            className="bg-blue-500 px-3 py-2 rounded-lg flex-row items-center"
            onPress={() => router.push("/orders/add")}
          >
            <Plus size={18} color="#FFFFFF" />
            <Text className="text-white font-medium ml-1">New Order</Text>
          </TouchableOpacity>
        </View>

        {/* Status Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4 shrink-0 grow-0"
        >
          {["All", "Active", "Pending Return", "Returned", "Overdue"].map(
            (status) => (
              <TouchableOpacity
                key={status}
                className={`px-4 py-2 rounded-full mr-2 ${activeFilter === status ? "bg-blue-500" : "bg-white"}`}
                onPress={() => setActiveFilter(status as OrderStatus | "All")}
              >
                <Text
                  className={`font-medium ${activeFilter === status ? "text-white" : "text-gray-700"}`}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </ScrollView>

        <FlatList
          data={filteredOrders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        />
      </View>
      <View className="absolute bottom-0 left-0 right-0">
        <BottomNavigation activeTab="orders" />
      </View>
    </SafeAreaView>
  );
}
