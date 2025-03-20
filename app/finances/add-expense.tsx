import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ArrowLeft, Save, Calendar, Tag } from "lucide-react-native";

export default function AddExpenseScreen() {
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: "",
    category: "",
    notes: "",
    paymentMethod: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Expense data saved:", formData);
    // Here you would typically save to a database
    router.back();
  };

  const categories = [
    "Equipment",
    "Salary",
    "Rent",
    "Utilities",
    "Marketing",
    "Insurance",
    "Maintenance",
    "Other",
  ];

  const paymentMethods = [
    "Cash",
    "Credit Card",
    "Bank Transfer",
    "Check",
    "PayPal",
    "Other",
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <View className="bg-white px-4 py-4 flex-row justify-between items-center shadow-sm">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <ArrowLeft size={24} color="#4B5563" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">Add Expense</Text>
          <TouchableOpacity
            onPress={handleSave}
            className="bg-rose-500 px-4 py-2 rounded-lg flex-row items-center"
          >
            <Save size={18} color="#FFFFFF" />
            <Text className="text-white font-medium ml-1">Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1 px-4 pt-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        >
          {/* Expense Details */}
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <Text className="text-lg font-semibold mb-4">Expense Details</Text>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Description *</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                placeholder="Enter expense description"
                value={formData.description}
                onChangeText={(text) => handleChange("description", text)}
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Amount ($) *</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                placeholder="Enter amount"
                keyboardType="numeric"
                value={formData.amount}
                onChangeText={(text) => handleChange("amount", text)}
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Date *</Text>
              <View className="flex-row items-center">
                <TextInput
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex-1"
                  placeholder="MM/DD/YYYY"
                  value={formData.date}
                  onChangeText={(text) => handleChange("date", text)}
                />
                <TouchableOpacity className="ml-2 p-3 bg-gray-200 rounded-lg">
                  <Calendar size={20} color="#4B5563" />
                </TouchableOpacity>
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Category *</Text>
              <View className="flex-row flex-wrap">
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    className={`mr-2 mb-2 px-3 py-2 rounded-lg ${formData.category === category ? "bg-rose-100 border border-rose-300" : "bg-gray-50 border border-gray-200"}`}
                    onPress={() => handleChange("category", category)}
                  >
                    <Text
                      className={`${formData.category === category ? "text-rose-800" : "text-gray-700"}`}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Payment Details */}
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <Text className="text-lg font-semibold mb-4">Payment Details</Text>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Payment Method</Text>
              <View className="flex-row flex-wrap">
                {paymentMethods.map((method) => (
                  <TouchableOpacity
                    key={method}
                    className={`mr-2 mb-2 px-3 py-2 rounded-lg ${formData.paymentMethod === method ? "bg-blue-100 border border-blue-300" : "bg-gray-50 border border-gray-200"}`}
                    onPress={() => handleChange("paymentMethod", method)}
                  >
                    <Text
                      className={`${formData.paymentMethod === method ? "text-blue-800" : "text-gray-700"}`}
                    >
                      {method}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Additional Notes */}
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <Text className="text-lg font-semibold mb-4">Additional Notes</Text>

            <View className="mb-4">
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                placeholder="Enter any additional notes"
                multiline
                numberOfLines={4}
                value={formData.notes}
                onChangeText={(text) => handleChange("notes", text)}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
