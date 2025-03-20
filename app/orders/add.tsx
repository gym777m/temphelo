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
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ArrowLeft,
  Save,
  Plus,
  Minus,
  Package,
  Calendar,
  User,
  DollarSign,
  Search,
  X,
} from "lucide-react-native";

interface ProductItem {
  id: string;
  name: string;
  pricePerDay: number;
  quantity: number;
  selected?: boolean;
}

export default function AddOrderScreen() {
  const insets = useSafeAreaInsets();

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  const [selectedProducts, setSelectedProducts] = useState<ProductItem[]>([]);
  const [showProductSelector, setShowProductSelector] = useState(false);

  // Mock products data
  const mockProducts: ProductItem[] = [
    { id: "1", name: "Canon 5D Mark IV", pricePerDay: 120, quantity: 1 },
    { id: "2", name: "Sony A7 III", pricePerDay: 110, quantity: 1 },
    { id: "3", name: "Tripod", pricePerDay: 25, quantity: 1 },
    { id: "4", name: "50mm Lens", pricePerDay: 35, quantity: 1 },
    { id: "5", name: "24-70mm Lens", pricePerDay: 45, quantity: 1 },
    { id: "6", name: "Lighting Kit", pricePerDay: 80, quantity: 1 },
    { id: "7", name: "Backdrop Stand", pricePerDay: 30, quantity: 1 },
    { id: "8", name: "PA System", pricePerDay: 95, quantity: 1 },
    { id: "9", name: "Wireless Microphone", pricePerDay: 25, quantity: 1 },
    { id: "10", name: "Projector", pricePerDay: 70, quantity: 1 },
  ];

  const [availableProducts, setAvailableProducts] =
    useState<ProductItem[]>(mockProducts);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddProduct = (product: ProductItem) => {
    const updatedSelectedProducts = [...selectedProducts];
    const existingIndex = updatedSelectedProducts.findIndex(
      (p) => p.id === product.id,
    );

    if (existingIndex >= 0) {
      updatedSelectedProducts[existingIndex].quantity += 1;
    } else {
      updatedSelectedProducts.push({ ...product, selected: true });
    }

    setSelectedProducts(updatedSelectedProducts);
    setShowProductSelector(false);
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId));
  };

  const handleQuantityChange = (productId: string, increment: boolean) => {
    const updatedProducts = selectedProducts.map((product) => {
      if (product.id === productId) {
        const newQuantity = increment
          ? product.quantity + 1
          : Math.max(1, product.quantity - 1);
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setSelectedProducts(updatedProducts);
  };

  const calculateTotal = () => {
    // Calculate days between start and end date (simplified for demo)
    const days = 5; // Assuming 5 days rental period

    return selectedProducts.reduce((total, product) => {
      return total + product.pricePerDay * product.quantity * days;
    }, 0);
  };

  const handleSave = () => {
    if (
      !formData.customerName ||
      !formData.startDate ||
      !formData.endDate ||
      selectedProducts.length === 0
    ) {
      console.log(
        "Please fill in all required fields and select at least one product",
      );
      return;
    }

    const orderData = {
      ...formData,
      items: selectedProducts,
      totalAmount: calculateTotal(),
    };

    console.log("Order data saved:", orderData);
    // Here you would typically save to a database
    router.back();
  };

  const renderProductItem = ({ item }: { item: ProductItem }) => (
    <TouchableOpacity
      className="bg-white p-3 rounded-lg mb-2 border border-gray-200"
      onPress={() => handleAddProduct(item)}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Package size={16} color="#6B7280" />
          <Text className="ml-2 text-gray-900">{item.name}</Text>
        </View>
        <Text className="font-medium">${item.pricePerDay}/day</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSelectedProductItem = ({ item }: { item: ProductItem }) => (
    <View className="bg-white p-3 rounded-lg mb-2 border border-gray-200">
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-900">{item.name}</Text>
        <TouchableOpacity onPress={() => handleRemoveProduct(item.id)}>
          <X size={16} color="#EF4444" />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-gray-600">${item.pricePerDay}/day</Text>
        <View className="flex-row items-center">
          <TouchableOpacity
            className="bg-gray-200 p-1 rounded"
            onPress={() => handleQuantityChange(item.id, false)}
          >
            <Minus size={14} color="#4B5563" />
          </TouchableOpacity>
          <Text className="mx-3">{item.quantity}</Text>
          <TouchableOpacity
            className="bg-gray-200 p-1 rounded"
            onPress={() => handleQuantityChange(item.id, true)}
          >
            <Plus size={14} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

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
          <Text className="text-xl font-bold text-gray-800">
            Create New Order
          </Text>
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
          {/* Customer Information */}
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <Text className="text-lg font-semibold mb-4">
              Customer Information
            </Text>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Customer Name *</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                placeholder="Enter customer name"
                value={formData.customerName}
                onChangeText={(text) => handleChange("customerName", text)}
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Email</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                placeholder="Enter email address"
                keyboardType="email-address"
                value={formData.customerEmail}
                onChangeText={(text) => handleChange("customerEmail", text)}
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Phone Number</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                value={formData.customerPhone}
                onChangeText={(text) => handleChange("customerPhone", text)}
              />
            </View>
          </View>

          {/* Rental Period */}
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <Text className="text-lg font-semibold mb-4">Rental Period</Text>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Start Date *</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                placeholder="MM/DD/YYYY"
                value={formData.startDate}
                onChangeText={(text) => handleChange("startDate", text)}
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1">End Date *</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                placeholder="MM/DD/YYYY"
                value={formData.endDate}
                onChangeText={(text) => handleChange("endDate", text)}
              />
            </View>
          </View>

          {/* Products */}
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold">Rental Items *</Text>
              <TouchableOpacity
                className="bg-blue-500 px-3 py-1 rounded-lg flex-row items-center"
                onPress={() => setShowProductSelector(true)}
              >
                <Plus size={16} color="#FFFFFF" />
                <Text className="text-white font-medium ml-1">Add Item</Text>
              </TouchableOpacity>
            </View>

            {selectedProducts.length === 0 ? (
              <Text className="text-gray-500 italic">No items selected</Text>
            ) : (
              <FlatList
                data={selectedProducts}
                renderItem={renderSelectedProductItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            )}

            {selectedProducts.length > 0 && (
              <View className="mt-4 pt-3 border-t border-gray-200">
                <View className="flex-row justify-between mb-1">
                  <Text className="text-gray-600">Subtotal (5 days)</Text>
                  <Text className="text-gray-800">
                    ${calculateTotal() - 50}
                  </Text>
                </View>
                <View className="flex-row justify-between mb-1">
                  <Text className="text-gray-600">Insurance Fee</Text>
                  <Text className="text-gray-800">$50</Text>
                </View>
                <View className="flex-row justify-between mt-2 pt-2 border-t border-gray-200">
                  <Text className="font-semibold">Total</Text>
                  <Text className="font-bold">${calculateTotal()}</Text>
                </View>
              </View>
            )}
          </View>

          {/* Notes */}
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

        {/* Product Selector Modal */}
        {showProductSelector && (
          <View className="absolute inset-0 bg-black bg-opacity-50 p-4 flex justify-center">
            <View className="bg-white rounded-lg p-4 max-h-[70%]">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold">Select Products</Text>
                <TouchableOpacity onPress={() => setShowProductSelector(false)}>
                  <X size={20} color="#4B5563" />
                </TouchableOpacity>
              </View>

              <View className="bg-gray-100 flex-row items-center p-2 rounded-lg mb-4">
                <Search size={16} color="#6B7280" />
                <TextInput
                  className="flex-1 ml-2"
                  placeholder="Search products..."
                />
              </View>

              <FlatList
                data={availableProducts}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={true}
              />
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
