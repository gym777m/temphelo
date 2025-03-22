import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  Plus,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  TrendingDown,
  FileText,
  Calendar,
  CreditCard,
  BarChart2,
  PieChart,
  FileSpreadsheet,
} from "lucide-react-native";

import Header from "../../components/Header";
import BottomNavigation from "../../components/navigation/BottomNavigation";

interface TransactionItem {
  id: string;
  type: "income" | "expense";
  description: string;
  amount: number;
  date: string;
  category: string;
}

export default function FinancesScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<
    "transactions" | "reports" | "invoices"
  >("transactions");
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);

  // Mock data - in a real app, you would fetch this from MongoDB Atlas
  const mockTransactions: TransactionItem[] = [
    {
      id: "1",
      type: "income",
      description: "Wedding Photography Package",
      amount: 2500,
      date: "Jun 15, 2023",
      category: "Event",
    },
    {
      id: "2",
      type: "expense",
      description: "Camera Equipment Repair",
      amount: 350,
      date: "Jun 12, 2023",
      category: "Maintenance",
    },
    {
      id: "3",
      type: "income",
      description: "Corporate Event Photography",
      amount: 1800,
      date: "Jun 10, 2023",
      category: "Event",
    },
    {
      id: "4",
      type: "expense",
      description: "Office Rent",
      amount: 1200,
      date: "Jun 05, 2023",
      category: "Rent",
    },
    {
      id: "5",
      type: "income",
      description: "Product Photography Session",
      amount: 750,
      date: "Jun 03, 2023",
      category: "Session",
    },
  ];

  // Simulate fetching data from MongoDB Atlas
  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch data from MongoDB Atlas here
        // const response = await fetch('your-mongodb-atlas-api-endpoint');
        // const data = await response.json();
        // setTransactions(data);

        // For now, use mock data
        setTimeout(() => {
          setTransactions(mockTransactions);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const renderTransactionItem = ({ item }: { item: TransactionItem }) => {
    return (
      <TouchableOpacity
        className="bg-white p-4 rounded-lg mb-3 shadow-sm border border-gray-100"
        onPress={() =>
          router.push(`/finances/transaction-details?id=${item.id}`)
        }
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View
              className={`w-10 h-10 rounded-full items-center justify-center ${item.type === "income" ? "bg-green-100" : "bg-red-100"}`}
            >
              {item.type === "income" ? (
                <TrendingUp size={20} color="#10B981" />
              ) : (
                <TrendingDown size={20} color="#EF4444" />
              )}
            </View>
            <View className="ml-3">
              <Text className="font-semibold text-gray-900">
                {item.description}
              </Text>
              <Text className="text-gray-500 text-sm">
                {item.date} • {item.category}
              </Text>
            </View>
          </View>
          <Text
            className={`font-bold ${item.type === "income" ? "text-green-600" : "text-red-600"}`}
          >
            {item.type === "income" ? "+" : "-"}₹{item.amount}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderReportsSection = () => {
    return (
      <View className="mt-2">
        <Text className="text-lg font-semibold mb-3">Financial Reports</Text>

        <View className="flex-row flex-wrap">
          <TouchableOpacity
            className="bg-white p-4 rounded-lg shadow-sm flex-row items-center mb-3 w-full"
            onPress={() => router.push("/finances/reports/profit-loss")}
          >
            <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3">
              <BarChart2 size={20} color="#3B82F6" />
            </View>
            <View>
              <Text className="font-medium text-gray-900">Profit & Loss</Text>
              <Text className="text-gray-500 text-sm">
                View your business performance
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white p-4 rounded-lg shadow-sm flex-row items-center mb-3 w-full"
            onPress={() => router.push("/finances/reports/revenue")}
          >
            <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center mr-3">
              <PieChart size={20} color="#10B981" />
            </View>
            <View>
              <Text className="font-medium text-gray-900">
                Revenue Analysis
              </Text>
              <Text className="text-gray-500 text-sm">
                Analyze your income sources
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white p-4 rounded-lg shadow-sm flex-row items-center mb-3 w-full"
            onPress={() => router.push("/finances/reports/expenses")}
          >
            <View className="w-10 h-10 rounded-full bg-red-100 items-center justify-center mr-3">
              <FileSpreadsheet size={20} color="#EF4444" />
            </View>
            <View>
              <Text className="font-medium text-gray-900">Expense Report</Text>
              <Text className="text-gray-500 text-sm">
                Track your business expenses
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white p-4 rounded-lg shadow-sm flex-row items-center w-full"
            onPress={() => router.push("/finances/reports/tax")}
          >
            <View className="w-10 h-10 rounded-full bg-purple-100 items-center justify-center mr-3">
              <DollarSign size={20} color="#8B5CF6" />
            </View>
            <View>
              <Text className="font-medium text-gray-900">Tax Summary</Text>
              <Text className="text-gray-500 text-sm">
                Prepare for tax filing
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderInvoicesSection = () => {
    return (
      <View className="mt-2">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-semibold">Recent Invoices</Text>
          <TouchableOpacity onPress={() => router.push("/invoices")}>
            <Text className="text-blue-500">View All</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-blue-500 py-3 rounded-lg flex-row items-center justify-center mb-4"
          onPress={() => router.push("/invoices/create")}
        >
          <Plus size={18} color="#FFFFFF" />
          <Text className="text-white font-medium ml-2">
            Create New Invoice
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-gray-100"
          onPress={() => router.push("/finances/invoice-details?id=1")}
        >
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="font-semibold text-gray-900">INV-2023-001</Text>
              <Text className="text-gray-500 text-sm">Sarah Johnson</Text>
              <Text className="text-gray-500 text-sm">Due: Jun 25, 2023</Text>
            </View>
            <View className="items-end">
              <View className="px-2 py-1 rounded-full bg-green-100 mb-1">
                <Text className="text-xs font-medium text-green-800">Paid</Text>
              </View>
              <Text className="font-bold">₹2,577.50</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-gray-100"
          onPress={() => router.push("/finances/invoice-details?id=2")}
        >
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="font-semibold text-gray-900">INV-2023-002</Text>
              <Text className="text-gray-500 text-sm">John Smith</Text>
              <Text className="text-gray-500 text-sm">Due: Jun 30, 2023</Text>
            </View>
            <View className="items-end">
              <View className="px-2 py-1 rounded-full bg-yellow-100 mb-1">
                <Text className="text-xs font-medium text-yellow-800">
                  Pending
                </Text>
              </View>
              <Text className="font-bold">₹1,850.00</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header title="Finances" />

      <View className="flex-1 px-4 pt-4">
        {/* Summary Cards */}
        <View className="flex-row justify-between mb-5">
          <View className="bg-white p-3.5 rounded-xl flex-1 mr-2 items-center shadow-sm">
            <Text className="text-gray-600 text-sm font-medium">Revenue</Text>
            <Text className="text-lg font-bold text-gray-900">₹5,050</Text>
          </View>
          <View className="bg-white p-3.5 rounded-xl flex-1 mr-2 items-center shadow-sm">
            <Text className="text-gray-600 text-sm font-medium">Expenses</Text>
            <Text className="text-lg font-bold text-red-600">₹1,550</Text>
          </View>
          <View className="bg-white p-3.5 rounded-xl flex-1 items-center shadow-sm">
            <Text className="text-gray-600 text-sm font-medium">Profit</Text>
            <Text className="text-lg font-bold text-green-600">₹3,500</Text>
          </View>
        </View>

        {/* Tab Navigation */}
        <View className="flex-row bg-gray-200 rounded-lg p-1 mb-4">
          <TouchableOpacity
            className={`flex-1 py-2 rounded-md ${activeTab === "transactions" ? "bg-white shadow" : ""}`}
            onPress={() => setActiveTab("transactions")}
          >
            <Text
              className={`text-center font-medium ${activeTab === "transactions" ? "text-blue-600" : "text-gray-600"}`}
            >
              Transactions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-2 rounded-md ${activeTab === "invoices" ? "bg-white shadow" : ""}`}
            onPress={() => setActiveTab("invoices")}
          >
            <Text
              className={`text-center font-medium ${activeTab === "invoices" ? "text-blue-600" : "text-gray-600"}`}
            >
              Invoices
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-2 rounded-md ${activeTab === "reports" ? "bg-white shadow" : ""}`}
            onPress={() => setActiveTab("reports")}
          >
            <Text
              className={`text-center font-medium ${activeTab === "reports" ? "text-blue-600" : "text-gray-600"}`}
            >
              Reports
            </Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        {activeTab === "transactions" && (
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row">
              <TouchableOpacity className="bg-white p-2 rounded-lg mr-2 shadow-sm">
                <Search size={20} color="#4B5563" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-white p-2 rounded-lg shadow-sm">
                <Filter size={20} color="#4B5563" />
              </TouchableOpacity>
            </View>
            <View className="flex-row">
              <TouchableOpacity
                className="bg-green-500 px-3 py-2 rounded-lg flex-row items-center mr-2"
                onPress={() => router.push("/finances/add-income")}
              >
                <TrendingUp size={18} color="#FFFFFF" />
                <Text className="text-white font-medium ml-1">Income</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-red-500 px-3 py-2 rounded-lg flex-row items-center"
                onPress={() => router.push("/finances/add-expense")}
              >
                <TrendingDown size={18} color="#FFFFFF" />
                <Text className="text-white font-medium ml-1">Expense</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Content based on active tab */}
        {activeTab === "transactions" && (
          <FlatList
            data={transactions}
            renderItem={renderTransactionItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
            ListEmptyComponent={
              isLoading ? (
                <View className="py-10 items-center">
                  <Text className="text-gray-500">Loading transactions...</Text>
                </View>
              ) : (
                <View className="py-10 items-center">
                  <Text className="text-gray-500">No transactions found</Text>
                </View>
              )
            }
          />
        )}

        {activeTab === "reports" && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
          >
            {renderReportsSection()}
          </ScrollView>
        )}

        {activeTab === "invoices" && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
          >
            {renderInvoicesSection()}
          </ScrollView>
        )}
      </View>

      <View className="absolute bottom-0 left-0 right-0">
        <BottomNavigation activeTab="finances" />
      </View>
    </SafeAreaView>
  );
}
