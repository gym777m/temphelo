import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Save } from "lucide-react-native";

export default function EditEmployeeScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const employeeId = params.id as string;

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
    status: "Active",
  });

  // In a real app, you would fetch the employee data based on the ID
  useEffect(() => {
    // Mock data fetch
    const mockEmployeeData = {
      name: "David Miller",
      email: "david.m@example.com",
      phone: "(555) 123-7890",
      role: "Photographer",
      salary: "4500",
      startDate: "01/15/2022",
      address: "123 Main St, Anytown, USA 12345",
      emergencyContact: "Jane Miller (555) 987-6543",
      notes:
        "Specializes in outdoor and event photography. Prefers weekend assignments.",
      status: "Active",
    };
    setFormData(mockEmployeeData);
  }, [employeeId]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.role ||
      !formData.salary
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    console.log("Employee data updated:", formData);
    // Here you would typically update the database
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
          <Text className="text-xl font-bold text-gray-800">Edit Employee</Text>
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

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Status</Text>
              <View className="flex-row mt-2">
                {["Active", "On Leave", "Unavailable"].map((status) => (
                  <TouchableOpacity
                    key={status}
                    className={`mr-3 px-4 py-2 rounded-lg ${formData.status === status ? "bg-blue-500" : "bg-gray-200"}`}
                    onPress={() => handleChange("status", status)}
                  >
                    <Text
                      className={`${formData.status === status ? "text-white" : "text-gray-800"}`}
                    >
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
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
