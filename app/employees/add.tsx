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
import { ArrowLeft, Save, X } from "lucide-react-native";

export default function AddEmployeeScreen() {
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    salary: "",
    startDate: "",
    address: "",
    emergencyContact: "",
    notes: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Employee data saved:", formData);
    // Here you would typically save to a database
    router.back();
  };

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
          <Text className="text-xl font-bold text-gray-800">Add Employee</Text>
          <TouchableOpacity
            onPress={handleSave}
            className="bg-blue-500 px-4 py-2 rounded-lg flex-row items-center"
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
          {/* Personal Information */}
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <Text className="text-lg font-semibold mb-4">
              Personal Information
            </Text>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Full Name *</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                placeholder="Enter full name"
                value={formData.name}
                onChangeText={(text) => handleChange("name", text)}
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Email *</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                placeholder="Enter email address"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Phone Number *</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(text) => handleChange("phone", text)}
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Address</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                placeholder="Enter address"
                multiline
                numberOfLines={3}
                value={formData.address}
                onChangeText={(text) => handleChange("address", text)}
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Emergency Contact</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                placeholder="Enter emergency contact"
                value={formData.emergencyContact}
                onChangeText={(text) => handleChange("emergencyContact", text)}
              />
            </View>
          </View>

          {/* Employment Information */}
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <Text className="text-lg font-semibold mb-4">
              Employment Information
            </Text>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Role/Position *</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                placeholder="Enter role or position"
                value={formData.role}
                onChangeText={(text) => handleChange("role", text)}
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Salary ($/month) *</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                placeholder="Enter monthly salary"
                keyboardType="numeric"
                value={formData.salary}
                onChangeText={(text) => handleChange("salary", text)}
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Start Date</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                placeholder="MM/DD/YYYY"
                value={formData.startDate}
                onChangeText={(text) => handleChange("startDate", text)}
              />
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
