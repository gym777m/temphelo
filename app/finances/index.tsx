import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Banknote,
  TrendingUp,
  TrendingDown,
  FileText,
  Download,
  ChevronDown,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  Plus,
} from "lucide-react-native";
import { router } from "expo-router";
import BarChart from "../../components/charts/BarChart";
import PieChart from "../../components/charts/PieChart";

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
  const [timeframe, setTimeframe] = useState("This Month");
  const [activeChart, setActiveChart] = useState<"bar" | "pie">("bar");

  // Monthly data for the bar chart
  const monthlyData = [
    { label: "Jan", value: 12500, color: "#6366F1" },
    { label: "Feb", value: 10800, color: "#6366F1" },
    { label: "Mar", value: 15200, color: "#6366F1" },
    { label: "Apr", value: 11900, color: "#6366F1" },
    { label: "May", value: 14300, color: "#6366F1" },
    { label: "Jun", value: 15750, color: "#6366F1" },
  ];

  // Expense categories for the pie chart
  const expenseCategories = [
    { label: "Equipment", value: 2400, color: "#EF4444" },
    { label: "Salary", value: 2400, color: "#F59E0B" },
    { label: "Rent", value: 800, color: "#10B981" },
    { label: "Marketing", value: 720, color: "#6366F1" },
  ];

  const financialSummary = {
    income: 15750,
    expenses: 6320,
    profit: 9430,
    incomeGrowth: 8.5,
    expenseGrowth: 3.2,
    profitGrowth: 12.4,
  };

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
      type: "income",
      description: "Camera Equipment Rental",
      amount: 850,
      date: "Jun 14, 2023",
      category: "Rental",
    },
    {
      id: "3",
      type: "expense",
      description: "New Lighting Equipment",
      amount: 1200,
      date: "Jun 12, 2023",
      category: "Equipment",
    },
    {
      id: "4",
      type: "income",
      description: "Corporate Event Photography",
      amount: 1800,
      date: "Jun 10, 2023",
      category: "Event",
    },
    {
      id: "5",
      type: "expense",
      description: "Staff Payments",
      amount: 2400,
      date: "Jun 8, 2023",
      category: "Salary",
    },
  ];

  const renderTransactionItem = (item: TransactionItem) => {
    return (
      <TouchableOpacity
        key={item.id}
        className="flex-row items-center p-3 mb-2 bg-white rounded-lg shadow-sm border border-gray-100"
        onPress={() => console.log(`View transaction ${item.id}`)}
      >
        <View
          className={`h-10 w-10 rounded-full items-center justify-center mr-3 ${item.type === "income" ? "bg-green-100" : "bg-red-100"}`}
        >
          {item.type === "income" ? (
            <TrendingUp size={20} color="#10B981" />
          ) : (
            <TrendingDown size={20} color="#EF4444" />
          )}
        </View>
        <View className="flex-1">
          <Text className="font-medium text-gray-900">{item.description}</Text>
          <Text className="text-sm text-gray-500">
            {item.date} • {item.category}
          </Text>
        </View>
        <Text
          className={`font-semibold ${item.type === "income" ? "text-green-600" : "text-red-600"}`}
        >
          {item.type === "income" ? "+" : "-"}${item.amount.toLocaleString()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header title="Finances" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 80,
        }}
      >
        {/* Timeframe Selector */}
        <TouchableOpacity className="flex-row items-center justify-center bg-white py-2 px-4 rounded-lg mb-4 shadow-sm">
          <Text className="font-medium text-gray-800 mr-2">{timeframe}</Text>
          <ChevronDown size={16} color="#4B5563" />
        </TouchableOpacity>

        {/* Financial Summary */}
        <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
          <Text className="text-lg font-bold mb-4 text-gray-900">
            Financial Summary
          </Text>
          <View className="flex-row justify-between mb-4">
            <View className="items-center flex-1 bg-emerald-50 p-3 rounded-xl">
              <Text className="text-gray-600 text-sm mb-1 font-medium">
                Income
              </Text>
              <Text className="text-xl font-bold text-emerald-600">
                ${financialSummary.income.toLocaleString()}
              </Text>
              <View className="flex-row items-center mt-1">
                <TrendingUp size={12} color="#10B981" />
                <Text className="text-xs text-emerald-600 ml-1 font-medium">
                  {financialSummary.incomeGrowth}%
                </Text>
              </View>
            </View>
            <View className="items-center flex-1 bg-rose-50 p-3 rounded-xl mx-2">
              <Text className="text-gray-600 text-sm mb-1 font-medium">
                Expenses
              </Text>
              <Text className="text-xl font-bold text-rose-600">
                ${financialSummary.expenses.toLocaleString()}
              </Text>
              <View className="flex-row items-center mt-1">
                <TrendingUp size={12} color="#F43F5E" />
                <Text className="text-xs text-rose-600 ml-1 font-medium">
                  {financialSummary.expenseGrowth}%
                </Text>
              </View>
            </View>
            <View className="items-center flex-1 bg-indigo-50 p-3 rounded-xl">
              <Text className="text-gray-600 text-sm mb-1 font-medium">
                Profit
              </Text>
              <Text className="text-xl font-bold text-indigo-600">
                ${financialSummary.profit.toLocaleString()}
              </Text>
              <View className="flex-row items-center mt-1">
                <TrendingUp size={12} color="#6366F1" />
                <Text className="text-xs text-indigo-600 ml-1 font-medium">
                  {financialSummary.profitGrowth}%
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row justify-between mt-2">
            <TouchableOpacity className="flex-row items-center bg-indigo-50 px-4 py-2.5 rounded-xl">
              <FileText size={16} color="#6366F1" />
              <Text className="text-indigo-600 font-medium ml-2">
                View Reports
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center bg-rose-50 px-4 py-2.5 rounded-xl"
              onPress={() => router.push("/finances/add-expense")}
            >
              <Plus size={16} color="#F43F5E" />
              <Text className="text-rose-600 font-medium ml-2">
                Add Expense
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Charts */}
        <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-900">
              Financial Analytics
            </Text>
            <View className="flex-row bg-gray-100 rounded-lg p-1">
              <TouchableOpacity
                className={`px-3 py-1.5 rounded-md ${activeChart === "bar" ? "bg-white shadow-sm" : ""}`}
                onPress={() => setActiveChart("bar")}
              >
                <BarChartIcon
                  size={18}
                  color={activeChart === "bar" ? "#6366F1" : "#9CA3AF"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                className={`px-3 py-1.5 rounded-md ${activeChart === "pie" ? "bg-white shadow-sm" : ""}`}
                onPress={() => setActiveChart("pie")}
              >
                <PieChartIcon
                  size={18}
                  color={activeChart === "pie" ? "#6366F1" : "#9CA3AF"}
                />
              </TouchableOpacity>
            </View>
          </View>

          {activeChart === "bar" ? (
            <View>
              <Text className="text-gray-700 mb-3">Monthly Revenue</Text>
              <BarChart data={monthlyData} height={180} />
            </View>
          ) : (
            <View>
              <Text className="text-gray-700 mb-3">Expense Breakdown</Text>
              <PieChart data={expenseCategories} />
              <View className="mt-4 pt-3 border-t border-gray-100">
                <Text className="text-gray-700 mb-2">
                  Total Expenses: $6,320
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Recent Transactions */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-semibold">Recent Transactions</Text>
            <TouchableOpacity>
              <Text className="text-blue-500">View All</Text>
            </TouchableOpacity>
          </View>

          {mockTransactions.map(renderTransactionItem)}
        </View>

        {/* Invoices Section */}
        <View className="bg-white p-4 rounded-xl shadow-sm mb-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-semibold">Recent Invoices</Text>
            <TouchableOpacity>
              <Text className="text-blue-500">View All</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="flex-row items-center justify-between p-3 mb-2 bg-gray-50 rounded-lg">
            <View className="flex-row items-center">
              <FileText size={20} color="#4B5563" />
              <View className="ml-3">
                <Text className="font-medium">INV-2023-001</Text>
                <Text className="text-sm text-gray-500">
                  Sarah Johnson - Wedding
                </Text>
              </View>
            </View>
            <View className="items-end">
              <Text className="font-semibold">$2,500.00</Text>
              <Text className="text-xs text-green-600">Paid</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-3 mb-2 bg-gray-50 rounded-lg">
            <View className="flex-row items-center">
              <FileText size={20} color="#4B5563" />
              <View className="ml-3">
                <Text className="font-medium">INV-2023-002</Text>
                <Text className="text-sm text-gray-500">
                  Tech Solutions - Conference
                </Text>
              </View>
            </View>
            <View className="items-end">
              <Text className="font-semibold">$3,800.00</Text>
              <Text className="text-xs text-yellow-600">Pending</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg">
            <View className="flex-row items-center">
              <FileText size={20} color="#4B5563" />
              <View className="ml-3">
                <Text className="font-medium">INV-2023-003</Text>
                <Text className="text-sm text-gray-500">
                  John Smith - Equipment Rental
                </Text>
              </View>
            </View>
            <View className="items-end">
              <Text className="font-semibold">$850.00</Text>
              <Text className="text-xs text-green-600">Paid</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0">
        <BottomNavigation activeTab="finances" />
      </View>
    </SafeAreaView>
  );
}
