import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import PageTransition from "../../components/animations/PageTransition";
import {
  ArrowLeft,
  Tag,
  Package,
  Clock,
  Edit,
  Trash2,
  ShoppingCart,
  Calendar,
  User,
} from "lucide-react-native";

import Header from "../../components/Header";

export default function ProductViewScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Mock product data - in a real app, you would fetch this based on the ID
  const product = {
    id: id || "1",
    name: "Canon 5D Mark IV",
    category: "Cameras",
    status: "Available",
    rentalPrice: 120,
    deposit: 500,
    description:
      "Professional full-frame DSLR camera with 30.4MP sensor, 4K video recording, and 7fps continuous shooting. Includes battery, charger, and 32GB memory card.",
    specifications: [
      "30.4MP Full-Frame CMOS Sensor",
      "DIGIC 6+ Image Processor",
      '3.2" 1.62m-Dot Touchscreen LCD Monitor',
      "DCI 4K Video at 30 fps; 8.8MP Still Grab",
      "61-Point High Density Reticular AF",
      "Native ISO 32000, Expanded to ISO 102400",
      "Dual Pixel RAW; AF Area Select Button",
      "Dual Pixel CMOS AF and Movie Servo AF",
      "7 fps Shooting; CF & SD Card Slots",
      "Built-In GPS and Wi-Fi with NFC",
    ],
    purchaseDate: "Jan 15, 2022",
    purchasePrice: 2499,
    maintenanceHistory: [
      {
        date: "Mar 10, 2023",
        description: "Sensor cleaning and firmware update",
        cost: 120,
      },
      {
        date: "Oct 05, 2022",
        description: "Shutter mechanism replacement",
        cost: 350,
      },
    ],
    rentalHistory: [
      {
        id: "r1",
        customer: "John Smith",
        startDate: "Jun 10, 2023",
        endDate: "Jun 15, 2023",
        status: "Returned",
      },
      {
        id: "r2",
        customer: "Emily Davis",
        startDate: "May 22, 2023",
        endDate: "May 25, 2023",
        status: "Returned",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
  };

  const handleEditProduct = () => {
    router.push(`/products/edit?id=${id}`);
  };

  const handleDeleteProduct = () => {
    // In a real app, you would delete the product and navigate back
    router.back();
  };

  const handleRentProduct = () => {
    router.push(`/orders/add?productId=${id}`);
  };

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(product.status);
  const [currentCustomer, setCurrentCustomer] = useState("");

  const updateProductStatus = (newStatus: string) => {
    // In a real app, you would update the product status in the database
    setCurrentStatus(newStatus);
    setShowStatusModal(false);
    // If status is Rented, you would also update the customer information
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Rented":
        return "bg-blue-100 text-blue-800";
      case "Maintenance":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <PageTransition type="slide">
      <SafeAreaView className="flex-1 bg-gray-100">
        <Header
          title="Product Details"
          leftIcon={<ArrowLeft size={24} color="#000" />}
          onLeftPress={() => router.back()}
        />

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom }}
        >
          {/* Product Image */}
          <View className="bg-white rounded-xl shadow-sm mb-5 overflow-hidden">
            <Image
              source={{ uri: product.image }}
              className="w-full h-64"
              resizeMode="cover"
            />
          </View>

          {/* Product Info Card */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-1">
                <Text className="text-2xl font-bold text-gray-900">
                  {product.name}
                </Text>
                <View className="flex-row items-center mt-2">
                  <Package size={16} color="#6B7280" />
                  <Text className="text-gray-600 ml-2">{product.category}</Text>
                </View>
              </View>
              <View
                className={`px-3 py-1.5 rounded-full ${getStatusColor(product.status)}`}
              >
                <Text className="text-xs font-medium">{product.status}</Text>
              </View>
            </View>

            <View className="flex-row justify-between mb-4">
              <View className="items-center flex-1 bg-blue-50 p-3 rounded-xl mr-2">
                <Text className="text-gray-600 text-sm mb-1 font-medium">
                  Rental Price
                </Text>
                <Text className="text-xl font-bold text-blue-600">
                  ${product.rentalPrice}/day
                </Text>
              </View>
              <View className="items-center flex-1 bg-amber-50 p-3 rounded-xl">
                <Text className="text-gray-600 text-sm mb-1 font-medium">
                  Deposit
                </Text>
                <Text className="text-xl font-bold text-amber-600">
                  ${product.deposit}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between mt-2">
              <TouchableOpacity
                className="flex-row items-center bg-blue-50 px-4 py-2.5 rounded-xl"
                onPress={handleEditProduct}
              >
                <Edit size={16} color="#3B82F6" />
                <Text className="text-blue-600 font-medium ml-2">Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center bg-red-50 px-4 py-2.5 rounded-xl"
                onPress={handleDeleteProduct}
              >
                <Trash2 size={16} color="#EF4444" />
                <Text className="text-red-600 font-medium ml-2">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-between mb-5">
            {product.status === "Available" && (
              <TouchableOpacity
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 py-3 rounded-xl flex-row items-center justify-center mr-2 shadow-md"
                onPress={handleRentProduct}
              >
                <ShoppingCart size={20} color="#FFFFFF" />
                <Text className="text-white font-medium ml-2">Rent Now</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              className="flex-1 bg-amber-500 py-3 rounded-xl flex-row items-center justify-center shadow-md"
              onPress={() => setShowStatusModal(true)}
            >
              <Clock size={20} color="#FFFFFF" />
              <Text className="text-white font-medium ml-2">Change Status</Text>
            </TouchableOpacity>
          </View>

          {/* Status Change Modal */}
          {showStatusModal && (
            <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-50 items-center justify-center">
              <View className="bg-white p-5 rounded-xl w-4/5 shadow-lg">
                <Text className="text-xl font-bold mb-4 text-center">
                  Change Status
                </Text>

                <TouchableOpacity
                  className={`p-3 rounded-lg mb-2 ${currentStatus === "Available" ? "bg-green-100 border border-green-500" : "bg-gray-100"}`}
                  onPress={() => updateProductStatus("Available")}
                >
                  <Text
                    className={`font-medium ${currentStatus === "Available" ? "text-green-800" : "text-gray-800"}`}
                  >
                    Available
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`p-3 rounded-lg mb-2 ${currentStatus === "Rented" ? "bg-blue-100 border border-blue-500" : "bg-gray-100"}`}
                  onPress={() => updateProductStatus("Rented")}
                >
                  <Text
                    className={`font-medium ${currentStatus === "Rented" ? "text-blue-800" : "text-gray-800"}`}
                  >
                    Rented
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`p-3 rounded-lg mb-4 ${currentStatus === "Maintenance" ? "bg-orange-100 border border-orange-500" : "bg-gray-100"}`}
                  onPress={() => updateProductStatus("Maintenance")}
                >
                  <Text
                    className={`font-medium ${currentStatus === "Maintenance" ? "text-orange-800" : "text-gray-800"}`}
                  >
                    Maintenance
                  </Text>
                </TouchableOpacity>

                {currentStatus === "Rented" && (
                  <View className="mb-4">
                    <Text className="font-medium mb-2">
                      Rented to Customer:
                    </Text>
                    <TextInput
                      className="border border-gray-300 rounded-lg p-2"
                      placeholder="Enter customer name"
                      value={currentCustomer}
                      onChangeText={setCurrentCustomer}
                    />
                  </View>
                )}

                <View className="flex-row justify-end">
                  <TouchableOpacity
                    className="bg-gray-200 px-4 py-2 rounded-lg mr-2"
                    onPress={() => setShowStatusModal(false)}
                  >
                    <Text className="font-medium">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-blue-500 px-4 py-2 rounded-lg"
                    onPress={() => updateProductStatus(currentStatus)}
                  >
                    <Text className="font-medium text-white">Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Product Description */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <Text className="text-lg font-bold mb-2 text-gray-900">
              Description
            </Text>
            <Text className="text-gray-600">{product.description}</Text>
          </View>

          {/* Product Specifications */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <Text className="text-lg font-bold mb-3 text-gray-900">
              Specifications
            </Text>
            {product.specifications.map((spec, index) => (
              <View
                key={index}
                className="flex-row items-center mb-2 bg-gray-50 p-2 rounded-lg"
              >
                <View className="h-2 w-2 rounded-full bg-indigo-500 mr-3" />
                <Text className="text-gray-700">{spec}</Text>
              </View>
            ))}
          </View>

          {/* Purchase Information */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <Text className="text-lg font-bold mb-3 text-gray-900">
              Purchase Information
            </Text>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Purchase Date:</Text>
              <Text className="font-medium text-gray-800">
                {product.purchaseDate}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Purchase Price:</Text>
              <Text className="font-medium text-gray-800">
                ${product.purchasePrice}
              </Text>
            </View>
          </View>

          {/* Maintenance History */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <Text className="text-lg font-bold mb-3 text-gray-900">
              Maintenance History
            </Text>
            {product.maintenanceHistory.map((maintenance, index) => (
              <View
                key={index}
                className="p-3 mb-2 bg-gray-50 rounded-lg border-l-4 border-amber-500"
              >
                <View className="flex-row justify-between">
                  <Text className="font-medium text-gray-900">
                    {maintenance.date}
                  </Text>
                  <Text className="font-medium text-gray-900">
                    ${maintenance.cost}
                  </Text>
                </View>
                <Text className="text-gray-600 mt-1">
                  {maintenance.description}
                </Text>
              </View>
            ))}
          </View>

          {/* Rental History */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <Text className="text-lg font-bold mb-3 text-gray-900">
              Rental History
            </Text>
            {product.rentalHistory.map((rental) => (
              <TouchableOpacity
                key={rental.id}
                className="flex-row justify-between items-center p-3 mb-2 bg-gray-50 rounded-lg"
                onPress={() => router.push(`/orders/view?id=${rental.id}`)}
              >
                <View>
                  <Text className="font-medium text-gray-900">
                    {rental.customer}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Calendar size={14} color="#6B7280" />
                    <Text className="text-sm text-gray-500 ml-1">
                      {rental.startDate} - {rental.endDate}
                    </Text>
                  </View>
                </View>
                <View
                  className={`px-2 py-1 rounded-full ${rental.status === "Returned" ? "bg-green-100" : "bg-blue-100"}`}
                >
                  <Text
                    className={`text-xs font-medium ${rental.status === "Returned" ? "text-green-800" : "text-blue-800"}`}
                  >
                    {rental.status}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </PageTransition>
  );
}
