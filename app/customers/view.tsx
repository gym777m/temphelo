import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import PageTransition from "../../components/animations/PageTransition";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Package,
  DollarSign,
  Edit,
  Trash2,
} from "lucide-react-native";

import Header from "../../components/Header";

export default function CustomerViewScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Mock customer data - in a real app, you would fetch this based on the ID
  const customer = {
    id: id || "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA",
    activeRentals: 2,
    totalSpent: 1250,
    joinDate: "Jan 15, 2023",
    notes: "Prefers weekend appointments. Always returns equipment on time.",
  };

  // Mock rental history
  const rentalHistory = [
    {
      id: "r1",
      date: "Jun 10, 2023",
      items: ["Canon 5D Mark IV", "50mm Lens"],
      amount: 350,
      status: "Returned",
    },
    {
      id: "r2",
      date: "May 22, 2023",
      items: ["Lighting Kit", "Backdrop"],
      amount: 280,
      status: "Returned",
    },
    {
      id: "r3",
      date: "Apr 15, 2023",
      items: ["Sony A7 III", "24-70mm Lens"],
      amount: 420,
      status: "Returned",
    },
  ];

  const handleEditCustomer = () => {
    router.push(`/customers/edit?id=${id}`);
  };

  const handleDeleteCustomer = () => {
    // In a real app, you would delete the customer and navigate back
    router.back();
  };

  const handleCreateRental = () => {
    router.push(`/orders/add?customerId=${id}`);
  };

  return (
    <PageTransition type="slide">
      <SafeAreaView className="flex-1 bg-gray-100">
        <Header
          title="Customer Details"
          leftIcon={<ArrowLeft size={24} color="#000" />}
          onLeftPress={() => router.back()}
        />

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom }}
        >
          {/* Customer Info Card */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-1">
                <Text className="text-2xl font-bold text-gray-900">
                  {customer.name}
                </Text>
                <View className="flex-row items-center mt-2">
                  <Mail size={16} color="#6B7280" />
                  <Text className="text-gray-600 ml-2">{customer.email}</Text>
                </View>
                <View className="flex-row items-center mt-2">
                  <Phone size={16} color="#6B7280" />
                  <Text className="text-gray-600 ml-2">{customer.phone}</Text>
                </View>
                <View className="flex-row items-center mt-2">
                  <User size={16} color="#6B7280" />
                  <Text className="text-gray-600 ml-2">{customer.address}</Text>
                </View>
              </View>
            </View>

            <View className="flex-row justify-between mb-4">
              <View className="items-center flex-1 bg-blue-50 p-3 rounded-xl mr-2">
                <Text className="text-gray-600 text-sm mb-1 font-medium">
                  Active Rentals
                </Text>
                <Text className="text-xl font-bold text-blue-600">
                  {customer.activeRentals}
                </Text>
              </View>
              <View className="items-center flex-1 bg-green-50 p-3 rounded-xl">
                <Text className="text-gray-600 text-sm mb-1 font-medium">
                  Total Spent
                </Text>
                <Text className="text-xl font-bold text-green-600">
                  ${customer.totalSpent}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between mt-2">
              <TouchableOpacity
                className="flex-row items-center bg-blue-50 px-4 py-2.5 rounded-xl"
                onPress={handleEditCustomer}
              >
                <Edit size={16} color="#3B82F6" />
                <Text className="text-blue-600 font-medium ml-2">Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center bg-red-50 px-4 py-2.5 rounded-xl"
                onPress={handleDeleteCustomer}
              >
                <Trash2 size={16} color="#EF4444" />
                <Text className="text-red-600 font-medium ml-2">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Customer Notes */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <Text className="text-lg font-bold mb-2 text-gray-900">Notes</Text>
            <Text className="text-gray-600">{customer.notes}</Text>
          </View>

          {/* Rental History */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-gray-900">
                Rental History
              </Text>
              <TouchableOpacity
                className="bg-blue-500 px-3 py-2 rounded-lg flex-row items-center"
                onPress={handleCreateRental}
              >
                <Package size={16} color="#FFFFFF" />
                <Text className="text-white font-medium ml-2">New Rental</Text>
              </TouchableOpacity>
            </View>

            {rentalHistory.map((rental) => (
              <TouchableOpacity
                key={rental.id}
                className="flex-row justify-between items-center p-3 mb-2 bg-gray-50 rounded-lg"
                onPress={() => router.push(`/orders/view?id=${rental.id}`)}
              >
                <View>
                  <Text className="font-medium text-gray-900">
                    {rental.date}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {rental.items.join(", ")}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="font-semibold text-gray-900">
                    ${rental.amount}
                  </Text>
                  <View
                    className={`px-2 py-1 rounded-full mt-1 ${rental.status === "Returned" ? "bg-green-100" : "bg-blue-100"}`}
                  >
                    <Text
                      className={`text-xs font-medium ${rental.status === "Returned" ? "text-green-800" : "text-blue-800"}`}
                    >
                      {rental.status}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </PageTransition>
  );
}
