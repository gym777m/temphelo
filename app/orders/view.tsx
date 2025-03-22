import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  Package,
  Calendar,
  User,
  FileText,
  Clock,
  CheckCircle,
  Printer,
  Download,
  Send,
} from "lucide-react-native";

type OrderStatus = "Active" | "Pending Return" | "Returned" | "Overdue";

interface OrderItem {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    pricePerDay: number;
  }>;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: OrderStatus;
  daysRemaining?: number;
  daysOverdue?: number;
  notes?: string;
  invoiceNumber: string;
  paymentStatus: "Paid" | "Pending" | "Partial";
}

export default function OrderViewScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const orderId = params.id as string;

  // Mock data - in a real app, you would fetch this based on the orderId
  const orderData: OrderItem = {
    id: "1",
    customerName: "John Smith",
    customerEmail: "john.smith@example.com",
    customerPhone: "(555) 123-4567",
    items: [
      {
        id: "101",
        name: "Canon 5D Mark IV",
        quantity: 1,
        pricePerDay: 120,
      },
      {
        id: "102",
        name: "Tripod",
        quantity: 1,
        pricePerDay: 25,
      },
      {
        id: "103",
        name: "50mm Lens",
        quantity: 1,
        pricePerDay: 35,
      },
    ],
    startDate: "Jun 10, 2023",
    endDate: "Jun 15, 2023",
    totalAmount: 650,
    status: "Active",
    daysRemaining: 3,
    notes: "Customer requested early morning pickup.",
    invoiceNumber: "INV-2023-001",
    paymentStatus: "Paid",
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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "text-green-600";
      case "Pending":
        return "text-yellow-600";
      case "Partial":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-white px-4 py-4 flex-row justify-between items-center shadow-sm">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ArrowLeft size={24} color="#4B5563" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">Order Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 20,
        }}
      >
        {/* Order Status */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-semibold">Order #{orderData.id}</Text>
            <View
              className={`px-3 py-1 rounded-full ${getStatusColor(orderData.status)}`}
            >
              <Text className="text-xs font-medium">{orderData.status}</Text>
            </View>
          </View>

          <View className="flex-row items-center mb-2">
            <Calendar size={16} color="#6B7280" />
            <Text className="text-gray-700 ml-2">
              {orderData.startDate} - {orderData.endDate}
            </Text>
          </View>

          {orderData.status === "Active" &&
            orderData.daysRemaining !== undefined && (
              <View className="bg-blue-50 p-2 rounded-lg">
                <Text className="text-blue-800">
                  {orderData.daysRemaining} days remaining until return
                </Text>
              </View>
            )}

          {orderData.status === "Overdue" &&
            orderData.daysOverdue !== undefined && (
              <View className="bg-red-50 p-2 rounded-lg">
                <Text className="text-red-800">
                  {orderData.daysOverdue}{" "}
                  {orderData.daysOverdue === 1 ? "day" : "days"} overdue
                </Text>
              </View>
            )}
        </View>

        {/* Customer Information */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <Text className="text-lg font-semibold mb-3">
            Customer Information
          </Text>

          <View className="mb-2">
            <View className="flex-row items-center">
              <User size={16} color="#6B7280" />
              <Text className="text-gray-900 font-medium ml-2">
                {orderData.customerName}
              </Text>
            </View>
          </View>

          <View className="mb-2">
            <Text className="text-gray-700">
              Email: {orderData.customerEmail}
            </Text>
          </View>

          <View>
            <Text className="text-gray-700">
              Phone: {orderData.customerPhone}
            </Text>
          </View>
        </View>

        {/* Rented Items */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <Text className="text-lg font-semibold mb-3">Rented Items</Text>

          {orderData.items.map((item) => (
            <View
              key={item.id}
              className="flex-row justify-between items-center py-3 border-b border-gray-100"
            >
              <View className="flex-row items-center">
                <Package size={16} color="#6B7280" />
                <View className="ml-2">
                  <Text className="text-gray-900">{item.name}</Text>
                  <Text className="text-gray-500 text-sm">
                    Qty: {item.quantity} × ₹{item.pricePerDay}/day
                  </Text>
                </View>
              </View>
              <Text className="font-medium">
                ₹{item.quantity * item.pricePerDay * 5}
              </Text>
            </View>
          ))}

          <View className="mt-4 pt-3 border-t border-gray-200">
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-600">Subtotal</Text>
              <Text className="text-gray-800">
                ₹{orderData.totalAmount - 50}
              </Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-600">Insurance Fee</Text>
              <Text className="text-gray-800">₹50</Text>
            </View>
            <View className="flex-row justify-between mt-2 pt-2 border-t border-gray-200">
              <Text className="font-semibold">Total</Text>
              <Text className="font-bold">₹{orderData.totalAmount}</Text>
            </View>
          </View>
        </View>

        {/* Invoice Information */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <Text className="text-lg font-semibold mb-3">
            Invoice Information
          </Text>

          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-700">Invoice Number</Text>
            <Text className="font-medium">{orderData.invoiceNumber}</Text>
          </View>

          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-gray-700">Payment Status</Text>
            <Text
              className={`font-medium ${getPaymentStatusColor(orderData.paymentStatus)}`}
            >
              {orderData.paymentStatus}
            </Text>
          </View>

          <View className="flex-row justify-between mt-3">
            <TouchableOpacity
              className="flex-row items-center bg-blue-50 px-3 py-2 rounded-lg"
              onPress={() => {
                console.log(`Printing invoice ${orderData.invoiceNumber}`);
                // Here you would handle printing functionality
              }}
            >
              <Printer size={16} color="#3B82F6" />
              <Text className="text-blue-600 font-medium ml-2">
                Print Invoice
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center bg-blue-50 px-3 py-2 rounded-lg"
              onPress={() => {
                console.log(`Emailing invoice to ${orderData.customerEmail}`);
                // Here you would handle email sending functionality
              }}
            >
              <Send size={16} color="#3B82F6" />
              <Text className="text-blue-600 font-medium ml-2">
                Email Invoice
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notes */}
        {orderData.notes && (
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <Text className="text-lg font-semibold mb-2">Notes</Text>
            <Text className="text-gray-700">{orderData.notes}</Text>
          </View>
        )}

        {/* Action Buttons */}
        <View className="flex-row justify-between mb-4">
          {orderData.status !== "Returned" && (
            <TouchableOpacity
              className="flex-1 bg-green-500 py-3 rounded-lg flex-row justify-center items-center mr-2"
              onPress={() => {
                console.log(`Marking order ${orderData.id} as returned`);
                // Here you would update the order status in the database
                router.back();
              }}
            >
              <CheckCircle size={18} color="#FFFFFF" />
              <Text className="text-white font-medium ml-2">
                Mark as Returned
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            className="flex-1 bg-blue-500 py-3 rounded-lg flex-row justify-center items-center ml-2"
            onPress={() => {
              console.log(`Downloading details for order ${orderData.id}`);
              // Here you would generate and download a PDF or similar
            }}
          >
            <Download size={18} color="#FFFFFF" />
            <Text className="text-white font-medium ml-2">
              Download Details
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
