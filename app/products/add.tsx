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
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { ArrowLeft, Save, Camera, Plus, X } from "lucide-react-native";

import Header from "../../components/Header";

export default function ProductAddScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    rentalPrice: "",
    deposit: "",
    description: "",
    purchaseDate: "",
    purchasePrice: "",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80", // Default placeholder image
  });

  // Specifications list
  const [specifications, setSpecifications] = useState<string[]>([]);
  const [newSpec, setNewSpec] = useState("");

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addSpecification = () => {
    if (newSpec.trim()) {
      setSpecifications([...specifications, newSpec.trim()]);
      setNewSpec("");
    }
  };

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // In a real app, you would save the product data
    console.log("Saving product data:", {
      ...formData,
      specifications,
    });
    router.back();
  };

  const handleImagePicker = () => {
    // In a real app, you would implement image picking functionality
    console.log("Opening image picker");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header
        title={id ? "Edit Product" : "Add Product"}
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
          {/* Product Image */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5 items-center">
            <Text className="text-lg font-bold mb-3 text-gray-900">
              Product Image
            </Text>
            {formData.image ? (
              <View className="relative">
                <Image
                  source={{ uri: formData.image }}
                  className="w-full h-48 rounded-lg"
                  resizeMode="cover"
                />
                <TouchableOpacity
                  className="absolute top-2 right-2 bg-white p-1 rounded-full"
                  onPress={() => handleChange("image", "")}
                >
                  <X size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg items-center justify-center bg-gray-50"
                onPress={handleImagePicker}
              >
                <Camera size={40} color="#6B7280" />
                <Text className="text-gray-500 mt-2">Add Product Image</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Basic Information */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <Text className="text-lg font-bold mb-3 text-gray-900">
              Basic Information
            </Text>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">
                Product Name
              </Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                value={formData.name}
                onChangeText={(value) => handleChange("name", value)}
                placeholder="Enter product name"
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">Category</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                value={formData.category}
                onChangeText={(value) => handleChange("category", value)}
                placeholder="Enter product category"
              />
            </View>

            <View className="flex-row mb-4">
              <View className="flex-1 mr-2">
                <Text className="text-gray-700 mb-2 font-medium">
                  Rental Price ($/day)
                </Text>
                <TextInput
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                  value={formData.rentalPrice}
                  onChangeText={(value) => handleChange("rentalPrice", value)}
                  placeholder="0.00"
                  keyboardType="numeric"
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-700 mb-2 font-medium">
                  Deposit ($)
                </Text>
                <TextInput
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                  value={formData.deposit}
                  onChangeText={(value) => handleChange("deposit", value)}
                  placeholder="0.00"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">
                Description
              </Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200 min-h-[100px]"
                value={formData.description}
                onChangeText={(value) => handleChange("description", value)}
                placeholder="Enter product description"
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Specifications */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <Text className="text-lg font-bold mb-3 text-gray-900">
              Specifications
            </Text>

            <View className="flex-row mb-4">
              <TextInput
                className="flex-1 bg-gray-50 p-3 rounded-l-lg border border-gray-200"
                value={newSpec}
                onChangeText={setNewSpec}
                placeholder="Add a specification"
              />
              <TouchableOpacity
                className="bg-blue-500 px-4 rounded-r-lg items-center justify-center"
                onPress={addSpecification}
              >
                <Plus size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {specifications.map((spec, index) => (
              <View
                key={index}
                className="flex-row justify-between items-center bg-gray-50 p-3 rounded-lg mb-2"
              >
                <Text className="flex-1 text-gray-700">{spec}</Text>
                <TouchableOpacity onPress={() => removeSpecification(index)}>
                  <X size={18} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Purchase Information */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <Text className="text-lg font-bold mb-3 text-gray-900">
              Purchase Information
            </Text>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">
                Purchase Date
              </Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                value={formData.purchaseDate}
                onChangeText={(value) => handleChange("purchaseDate", value)}
                placeholder="MM/DD/YYYY"
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">
                Purchase Price ($)
              </Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                value={formData.purchasePrice}
                onChangeText={(value) => handleChange("purchasePrice", value)}
                placeholder="0.00"
                keyboardType="numeric"
              />
            </View>
          </View>

          <TouchableOpacity
            className="bg-blue-500 py-3 rounded-lg flex-row items-center justify-center mb-10"
            onPress={handleSave}
          >
            <Save size={20} color="#FFFFFF" />
            <Text className="text-white font-medium ml-2">
              {id ? "Update Product" : "Add Product"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
