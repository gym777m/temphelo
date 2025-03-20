import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  PlusCircle,
  Search,
  SlidersHorizontal,
  FileText,
  Download,
  User,
  Calendar,
  Banknote,
} from "lucide-react-native";

import Header from "../../components/Header";
import BottomNavigation from "../../components/navigation/BottomNavigation";

type InvoiceStatus = "Paid" | "Pending" | "Overdue";

interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  customerName: string;
  date: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
  type: "Rental" | "Event";
}

export default function InvoicesScreen() {
  const insets = useSafeAreaInsets();

  const mockInvoices: InvoiceItem[] = [
    {
      id: "1",
      invoiceNumber: "INV-2023-001",
      customerName: "Sarah Johnson",
      date: "Jun 10, 2023",
      dueDate: "Jun 24, 2023",
      amount: 2500,
      status: "Paid",
      type: "Event",
    },
    {
      id: "2",
      invoiceNumber: "INV-2023-002",
      customerName: "Tech Solutions Inc.",
      date: "Jun 12, 2023",
      dueDate: "Jun 26, 2023",
      amount: 3800,
      status: "Pending",
      type: "Event",
    },
    {
      id: "3",
      invoiceNumber: "INV-2023-003",
      customerName: "John Smith",
      date: "Jun 8, 2023",
      dueDate: "Jun 22, 2023",
      amount: 850,
      status: "Paid",
      type: "Rental",
    },
    {
      id: "4",
      invoiceNumber: "INV-2023-004",
      customerName: "Emily Davis",
      date: "Jun 5, 2023",
      dueDate: "Jun 19, 2023",
      amount: 1200,
      status: "Overdue",
      type: "Rental",
    },
    {
      id: "5",
      invoiceNumber: "INV-2023-005",
      customerName: "Robert Wilson",
      date: "Jun 14, 2023",
      dueDate: "Jun 28, 2023",
      amount: 1750,
      status: "Pending",
      type: "Event",
    },
  ];

  const getStatusColor = (status: InvoiceStatus) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderInvoiceItem = ({ item }: { item: InvoiceItem }) => {
    const statusColor = getStatusColor(item.status);

    return (
      <TouchableOpacity
        className="bg-white p-4 rounded-lg mb-3 shadow-sm border border-gray-100"
        onPress={() => console.log(`View invoice ${item.id}`)}
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900">
              {item.invoiceNumber}
            </Text>
            <View className="flex-row items-center mt-1">
              <User size={14} color="#6B7280" />
              <Text className="text-gray-600 text-sm ml-1">
                {item.customerName}
              </Text>
            </View>
            <View className="flex-row items-center mt-1">
              <Calendar size={14} color="#6B7280" />
              <Text className="text-gray-500 text-sm ml-1">
                Issued: {item.date} | Due: {item.dueDate}
              </Text>
            </View>
          </View>
          <View className="items-end">
            <View className={`px-2 py-1 rounded-full mb-2 ${statusColor}`}>
              <Text className="text-xs font-medium">{item.status}</Text>
            </View>
            <Text className="font-semibold">
              ${item.amount.toLocaleString()}
            </Text>
            <Text className="text-xs text-gray-500">{item.type}</Text>
          </View>
        </View>
        <View className="flex-row justify-end mt-3 pt-2 border-t border-gray-100">
          <TouchableOpacity className="flex-row items-center mr-3">
            <FileText size={14} color="#3B82F6" />
            <Text className="text-blue-600 text-sm ml-1">View</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <Download size={14} color="#10B981" />
            <Text className="text-green-600 text-sm ml-1">Download PDF</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header title="Invoices" />

      <View className="flex-1 px-4 pt-4">
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row">
            <TouchableOpacity className="bg-white p-2.5 rounded-xl mr-3 shadow-sm">
              <Search size={20} color="#6366f1" strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-2.5 rounded-xl shadow-sm">
              <SlidersHorizontal size={20} color="#6366f1" strokeWidth={2} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 rounded-xl flex-row items-center shadow-md">
            <PlusCircle size={18} color="#FFFFFF" />
            <Text className="text-white font-medium ml-2">Create Invoice</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between mb-5">
          <View className="bg-white p-3.5 rounded-xl flex-1 mr-2 items-center shadow-sm">
            <Text className="text-gray-600 text-sm font-medium">Total</Text>
            <Text className="text-lg font-bold text-gray-900">$10,100</Text>
          </View>
          <View className="bg-white p-3.5 rounded-xl flex-1 mr-2 items-center shadow-sm">
            <Text className="text-gray-600 text-sm font-medium">Paid</Text>
            <Text className="text-lg font-bold text-emerald-600">$3,350</Text>
          </View>
          <View className="bg-white p-3.5 rounded-xl flex-1 items-center shadow-sm">
            <Text className="text-gray-600 text-sm font-medium">Pending</Text>
            <Text className="text-lg font-bold text-amber-600">$6,750</Text>
          </View>
        </View>

        <FlatList
          data={mockInvoices}
          renderItem={renderInvoiceItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        />
      </View>

      <View className="absolute bottom-0 left-0 right-0">
        <BottomNavigation activeTab="finances" />
      </View>
    </SafeAreaView>
  );
}
