import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ArrowLeft,
  Plus,
  Trash2,
  User,
  Calendar,
  FileText,
} from "lucide-react-native";

import Header from "../../components/Header";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export default function CreateInvoiceScreen() {
  const insets = useSafeAreaInsets();
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "1",
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    },
  ]);

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, quantity);
          return {
            ...item,
            quantity: newQuantity,
            total: newQuantity * item.unitPrice,
          };
        }
        return item;
      }),
    );
  };

  const updateItemPrice = (id: string, price: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newPrice = Math.max(0, price);
          return {
            ...item,
            unitPrice: newPrice,
            total: item.quantity * newPrice,
          };
        }
        return item;
      }),
    );
  };

  const updateItemDescription = (id: string, description: string) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, description };
        }
        return item;
      }),
    );
  };

  const addNewItem = () => {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        description: "",
        quantity: 1,
        unitPrice: 0,
        total: 0,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleCreateInvoice = () => {
    // In a real app, you would save the invoice to the database
    console.log("Creating invoice", {
      customerName,
      customerEmail,
      customerPhone,
      dueDate,
      notes,
      items,
      total: calculateTotal(),
    });
    router.push("/invoices");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header
        title="Create Invoice"
        leftIcon={<ArrowLeft size={24} color="#000" />}
        onLeftPress={() => router.back()}
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom }}
      >
        {/* Customer Information */}
        <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
          <Text className="text-lg font-bold mb-3 text-gray-900">
            Customer Information
          </Text>

          <View className="mb-3">
            <Text className="text-gray-700 mb-1">Customer Name *</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="Enter customer name"
              value={customerName}
              onChangeText={setCustomerName}
            />
          </View>

          <View className="mb-3">
            <Text className="text-gray-700 mb-1">Email</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="Enter email address"
              keyboardType="email-address"
              value={customerEmail}
              onChangeText={setCustomerEmail}
            />
          </View>

          <View className="mb-3">
            <Text className="text-gray-700 mb-1">Phone</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={customerPhone}
              onChangeText={setCustomerPhone}
            />
          </View>

          <View className="mb-3">
            <Text className="text-gray-700 mb-1">Due Date *</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              placeholder="MM/DD/YYYY"
              value={dueDate}
              onChangeText={setDueDate}
            />
          </View>
        </View>

        {/* Invoice Items */}
        <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-gray-900">
              Invoice Items
            </Text>
            <TouchableOpacity
              className="bg-blue-500 p-2 rounded-full"
              onPress={addNewItem}
            >
              <Plus size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {items.map((item, index) => (
            <View
              key={item.id}
              className="border border-gray-200 rounded-lg p-3 mb-3"
            >
              <View className="flex-row justify-between items-center mb-2">
                <Text className="font-medium text-gray-800">
                  Item #{index + 1}
                </Text>
                <TouchableOpacity
                  onPress={() => removeItem(item.id)}
                  disabled={items.length === 1}
                >
                  <Trash2
                    size={18}
                    color={items.length === 1 ? "#CBD5E0" : "#EF4444"}
                  />
                </TouchableOpacity>
              </View>

              <View className="mb-2">
                <Text className="text-gray-700 mb-1">Description *</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Enter item description"
                  value={item.description}
                  onChangeText={(text) => updateItemDescription(item.id, text)}
                />
              </View>

              <View className="flex-row justify-between">
                <View className="w-1/3 pr-2">
                  <Text className="text-gray-700 mb-1">Quantity</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg p-2"
                    placeholder="1"
                    keyboardType="numeric"
                    value={item.quantity.toString()}
                    onChangeText={(text) =>
                      updateItemQuantity(item.id, text ? parseInt(text, 10) : 0)
                    }
                  />
                </View>

                <View className="w-1/3 px-1">
                  <Text className="text-gray-700 mb-1">Unit Price ($)</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg p-2"
                    placeholder="0.00"
                    keyboardType="numeric"
                    value={item.unitPrice.toString()}
                    onChangeText={(text) =>
                      updateItemPrice(item.id, text ? parseFloat(text) : 0)
                    }
                  />
                </View>

                <View className="w-1/3 pl-2">
                  <Text className="text-gray-700 mb-1">Total</Text>
                  <View className="border border-gray-300 rounded-lg p-2 bg-gray-50">
                    <Text className="text-gray-800">
                      ${item.total.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}

          <View className="flex-row justify-end mt-3">
            <View className="w-1/2">
              <View className="flex-row justify-between py-2">
                <Text className="font-medium text-gray-700">Subtotal:</Text>
                <Text className="font-medium text-gray-900">
                  ${calculateTotal().toFixed(2)}
                </Text>
              </View>
              <View className="flex-row justify-between py-2 border-t border-gray-200">
                <Text className="font-bold text-gray-800">Total:</Text>
                <Text className="font-bold text-gray-900">
                  ${calculateTotal().toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Notes */}
        <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
          <Text className="text-lg font-bold mb-3 text-gray-900">Notes</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3"
            placeholder="Add notes to invoice (optional)"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        {/* Create Invoice Button */}
        <TouchableOpacity
          className="bg-blue-500 py-3 rounded-xl flex-row items-center justify-center mb-5"
          onPress={handleCreateInvoice}
        >
          <FileText size={20} color="#FFFFFF" />
          <Text className="text-white font-medium ml-2">Create Invoice</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
