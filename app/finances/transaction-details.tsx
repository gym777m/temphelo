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
  Calendar,
  Tag,
  FileText,
  User,
  Edit,
  Trash2,
  Download,
  TrendingUp,
  TrendingDown,
} from "lucide-react-native";

import Header from "../../components/Header";

interface TransactionItem {
  id: string;
  type: "income" | "expense";
  description: string;
  amount: number;
  date: string;
  category: string;
  paymentMethod: string;
  reference: string;
  notes: string;
  relatedTo?: {
    type: "customer" | "event" | "order";
    id: string;
    name: string;
  };
}

export default function TransactionDetailsScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Mock transaction data - in a real app, you would fetch this based on the ID
  const transaction: TransactionItem = {
    id: id || "1",
    type: "income",
    description: "Wedding Photography Package",
    amount: 2500,
    date: "Jun 15, 2023",
    category: "Event",
    paymentMethod: "Credit Card",
    reference: "INV-2023-001",
    notes: "Full payment received for Johnson wedding photography package.",
    relatedTo: {
      type: "customer",
      id: "1",
      name: "Sarah Johnson",
    },
  };

  const handleEditTransaction = () => {
    router.push(`/finances/edit-transaction?id=${id}`);
  };

  const handleDeleteTransaction = () => {
    // In a real app, you would delete the transaction and navigate back
    router.back();
  };

  const handleDownloadReceipt = () => {
    // In a real app, you would download or generate a receipt
    console.log("Downloading receipt for transaction", id);
  };

  return (
    <PageTransition type="slide">
      <SafeAreaView className="flex-1 bg-gray-100">
        <Header
          title="Transaction Details"
          leftIcon={<ArrowLeft size={24} color="#000" />}
          onLeftPress={() => router.back()}
        />

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom }}
        >
          {/* Transaction Info Card */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-1">
                <Text className="text-2xl font-bold text-gray-900">
                  {transaction.description}
                </Text>
                <View className="flex-row items-center mt-2">
                  <Calendar size={16} color="#6B7280" />
                  <Text className="text-gray-600 ml-2">{transaction.date}</Text>
                </View>
                <View className="flex-row items-center mt-2">
                  <Tag size={16} color="#6B7280" />
                  <Text className="text-gray-600 ml-2">
                    {transaction.category}
                  </Text>
                </View>
              </View>
              <View
                className={`h-12 w-12 rounded-full items-center justify-center ${transaction.type === "income" ? "bg-green-100" : "bg-red-100"}`}
              >
                {transaction.type === "income" ? (
                  <TrendingUp size={24} color="#10B981" />
                ) : (
                  <TrendingDown size={24} color="#EF4444" />
                )}
              </View>
            </View>

            <View
              className={`p-4 rounded-lg mb-4 ${transaction.type === "income" ? "bg-green-50" : "bg-red-50"}`}
            >
              <Text
                className={`text-center text-2xl font-bold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
              >
                {transaction.type === "income" ? "+" : "-"}₹
                {transaction.amount.toLocaleString()}
              </Text>
            </View>

            <View className="flex-row justify-between mt-2">
              <TouchableOpacity
                className="flex-row items-center bg-blue-50 px-4 py-2.5 rounded-xl"
                onPress={handleEditTransaction}
              >
                <Edit size={16} color="#3B82F6" />
                <Text className="text-blue-600 font-medium ml-2">Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center bg-red-50 px-4 py-2.5 rounded-xl"
                onPress={handleDeleteTransaction}
              >
                <Trash2 size={16} color="#EF4444" />
                <Text className="text-red-600 font-medium ml-2">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Download Receipt Button */}
          <TouchableOpacity
            className="bg-indigo-500 py-3 rounded-lg flex-row items-center justify-center mb-5"
            onPress={handleDownloadReceipt}
          >
            <Download size={18} color="#FFFFFF" />
            <Text className="text-white font-medium ml-2">
              Download Receipt
            </Text>
          </TouchableOpacity>

          {/* Transaction Details */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <Text className="text-lg font-bold mb-3 text-gray-900">
              Transaction Details
            </Text>

            <View className="mb-3 pb-3 border-b border-gray-100">
              <Text className="text-gray-500 text-sm">Transaction ID</Text>
              <Text className="font-medium text-gray-800">
                {transaction.id}
              </Text>
            </View>

            <View className="mb-3 pb-3 border-b border-gray-100">
              <Text className="text-gray-500 text-sm">Type</Text>
              <Text className="font-medium text-gray-800 capitalize">
                {transaction.type}
              </Text>
            </View>

            <View className="mb-3 pb-3 border-b border-gray-100">
              <Text className="text-gray-500 text-sm">Payment Method</Text>
              <Text className="font-medium text-gray-800">
                {transaction.paymentMethod}
              </Text>
            </View>

            <View className="mb-3 pb-3 border-b border-gray-100">
              <Text className="text-gray-500 text-sm">Reference</Text>
              <TouchableOpacity
                onPress={() =>
                  router.push(`/invoices/view?id=${transaction.reference}`)
                }
              >
                <Text className="font-medium text-blue-600">
                  {transaction.reference}
                </Text>
              </TouchableOpacity>
            </View>

            {transaction.relatedTo && (
              <View className="mb-3 pb-3 border-b border-gray-100">
                <Text className="text-gray-500 text-sm">Related To</Text>
                <TouchableOpacity
                  onPress={() =>
                    router.push(
                      `/${transaction.relatedTo?.type}s/view?id=${transaction.relatedTo?.id}`,
                    )
                  }
                >
                  <Text className="font-medium text-blue-600">
                    {transaction.relatedTo.name} ({transaction.relatedTo.type})
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View>
              <Text className="text-gray-500 text-sm">Notes</Text>
              <Text className="font-medium text-gray-800">
                {transaction.notes}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </PageTransition>
  );
}
