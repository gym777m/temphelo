import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  PlusCircle,
  Search,
  SlidersHorizontal,
  Package,
  Tag,
  Clock,
} from "lucide-react-native";

import Header from "../../components/Header";
import BottomNavigation from "../../components/navigation/BottomNavigation";

interface ProductItem {
  id: string;
  name: string;
  category: string;
  status: "Available" | "Rented" | "Maintenance";
  rentalPrice: number;
  deposit: number;
  image: string;
}

export default function ProductsScreen() {
  const insets = useSafeAreaInsets();

  const mockProducts: ProductItem[] = [
    {
      id: "1",
      name: "Canon 5D Mark IV",
      category: "Cameras",
      status: "Available",
      rentalPrice: 120,
      deposit: 500,
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
    },
    {
      id: "2",
      name: "Sony A7 III",
      category: "Cameras",
      status: "Rented",
      rentalPrice: 100,
      deposit: 450,
      image:
        "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&q=80",
    },
    {
      id: "3",
      name: "Godox Lighting Kit",
      category: "Lighting",
      status: "Available",
      rentalPrice: 80,
      deposit: 200,
      image:
        "https://images.unsplash.com/photo-1520549233664-03f65c1d1327?w=400&q=80",
    },
    {
      id: "4",
      name: "DJI Ronin Gimbal",
      category: "Stabilizers",
      status: "Maintenance",
      rentalPrice: 65,
      deposit: 300,
      image:
        "https://images.unsplash.com/photo-1589872307379-0ffdf9829123?w=400&q=80",
    },
    {
      id: "5",
      name: "Sennheiser Wireless Mic",
      category: "Audio",
      status: "Rented",
      rentalPrice: 45,
      deposit: 150,
      image:
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&q=80",
    },
  ];

  const renderProductItem = ({ item }: { item: ProductItem }) => {
    const statusColor = {
      Available: "bg-green-100 text-green-800",
      Rented: "bg-blue-100 text-blue-800",
      Maintenance: "bg-orange-100 text-orange-800",
    }[item.status];

    return (
      <TouchableOpacity
        className="bg-white p-4 rounded-lg mb-3 shadow-sm border border-gray-100"
        onPress={() => router.push(`/products/view?id=${item.id}`)}
      >
        <View className="flex-row justify-between">
          <Image
            source={{ uri: item.image }}
            className="w-20 h-20 rounded-lg mr-3"
          />
          <View className="flex-1">
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-900">
                  {item.name}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Package size={14} color="#6B7280" />
                  <Text className="text-gray-500 text-sm ml-1">
                    {item.category}
                  </Text>
                </View>
              </View>
              <View className={`px-2 py-1 rounded-full ${statusColor}`}>
                <Text className="text-xs font-medium">{item.status}</Text>
              </View>
            </View>
            <View className="flex-row mt-3 pt-3 border-t border-gray-100">
              <View className="flex-row items-center mr-4">
                <Tag size={14} color="#6B7280" />
                <Text className="text-gray-700 text-sm ml-1">
                  ₹{item.rentalPrice}/day
                </Text>
              </View>
              <View className="flex-row items-center">
                <Clock size={14} color="#6B7280" />
                <Text className="text-gray-700 text-sm ml-1">
                  ₹{item.deposit} deposit
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header title="Products" />

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
          <TouchableOpacity
            className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 rounded-xl flex-row items-center shadow-md"
            onPress={() => router.push("/products/add")}
          >
            <PlusCircle size={18} color="#FFFFFF" />
            <Text className="text-white font-medium ml-2">Add Product</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={mockProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        />
      </View>

      <View className="absolute bottom-0 left-0 right-0">
        <BottomNavigation activeTab="products" />
      </View>
    </SafeAreaView>
  );
}
