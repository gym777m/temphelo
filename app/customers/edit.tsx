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
import { useLocalSearchParams, router } from "expo-router";
import { ArrowLeft, Save } from "lucide-react-native";

import Header from "../../components/Header";

export default function CustomerEditScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Mock customer data - in a real app, you would fetch this based on the ID
  const [formData, setFormData] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA",
    notes: "Prefers weekend appointments. Always returns equipment on time.",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // In a real app, you would save the customer data
    console.log("Saving customer data:", formData);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header
        title={id ? "Edit Customer" : "Add Customer"}
        leftIcon={<ArrowLeft size={24} color="#000" />}
        onLeftPress={() => router.back()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom }}
        >
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">Name</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                value={formData.name}
                onChangeText={(value) => handleChange("name", value)}
                placeholder="Customer name"
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">Email</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                value={formData.email}
                onChangeText={(value) => handleChange("email", value)}
                placeholder="Email address"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">Phone</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                value={formData.phone}
                onChangeText={(value) => handleChange("phone", value)}
                placeholder="Phone number"
                keyboardType="phone-pad"
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">Address</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                value={formData.address}
                onChangeText={(value) => handleChange("address", value)}
                placeholder="Customer address"
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">Notes</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200 min-h-[100px]"
                value={formData.notes}
                onChangeText={(value) => handleChange("notes", value)}
                placeholder="Additional notes"
                multiline
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity
              className="bg-blue-500 py-3 rounded-lg flex-row items-center justify-center mt-4"
              onPress={handleSave}
            >
              <Save size={20} color="#FFFFFF" />
              <Text className="text-white font-medium ml-2">
                {id ? "Update Customer" : "Add Customer"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
