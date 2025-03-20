import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import PageTransition from "../../components/animations/PageTransition";
import {
  ArrowLeft,
  Calendar,
  User,
  FileText,
  Send,
  Download,
  DollarSign,
  Edit,
  Printer,
} from "lucide-react-native";

import Header from "../../components/Header";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: "Paid" | "Pending" | "Overdue";
  notes: string;
}

export default function InvoiceDetailsScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Mock invoice data - in a real app, you would fetch this based on the ID
  const invoice: Invoice = {
    id: id || "1",
    invoiceNumber: "INV-2023-001",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@example.com",
    customerPhone: "(555) 987-6543",
    date: "Jun 10, 2023",
    dueDate: "Jun 25, 2023",
    items: [
      {
        id: "item1",
        description: "Wedding Photography Package",
        quantity: 1,
        unitPrice: 2000,
        total: 2000,
      },
      {
        id: "item2",
        description: "Additional Photographer",
        quantity: 1,
        unitPrice: 400,
        total: 400,
      },
      {
        id: "item3",
        description: "Photo Album",
        quantity: 1,
        unitPrice: 150,
        total: 150,
      },
    ],
    subtotal: 2550,
    tax: 127.5, // 5% tax
    discount: 100, // $100 discount
    total: 2577.5,
    status: "Paid",
    notes: "Thank you for your business! Payment is due within 15 days.",
  };

  const handleEditInvoice = () => {
    router.push(`/finances/edit-invoice?id=${id}`);
  };

  const handleSendInvoice = () => {
    // In a real app, you would send the invoice via email
    console.log("Sending invoice", id);
  };

  const handleDownloadInvoice = () => {
    // In a real app, you would download or generate a PDF
    console.log("Downloading invoice", id);
  };

  const handlePrintInvoice = () => {
    // In a real app, you would print the invoice
    console.log("Printing invoice", id);
  };

  const handleRecordPayment = () => {
    router.push(`/finances/record-payment?invoiceId=${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <PageTransition type="slide">
      <SafeAreaView className="flex-1 bg-gray-100">
        <Header
          title="Invoice Details"
          leftIcon={<ArrowLeft size={24} color="#000" />}
          onLeftPress={() => router.back()}
        />

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom }}
        >
          {/* Invoice Header */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-1">
                <Text className="text-2xl font-bold text-gray-900">
                  {invoice.invoiceNumber}
                </Text>
                <View className="flex-row items-center mt-2">
                  <Calendar size={16} color="#6B7280" />
                  <Text className="text-gray-600 ml-2">
                    Issued: {invoice.date}
                  </Text>
                </View>
                <View className="flex-row items-center mt-1">
                  <Calendar size={16} color="#6B7280" />
                  <Text className="text-gray-600 ml-2">
                    Due: {invoice.dueDate}
                  </Text>
                </View>
              </View>
              <View
                className={`px-3 py-1.5 rounded-full ${getStatusColor(invoice.status)}`}
              >
                <Text className="text-xs font-medium">{invoice.status}</Text>
              </View>
            </View>

            <View className="flex-row justify-between mt-2">
              <TouchableOpacity
                className="flex-row items-center bg-blue-50 px-4 py-2.5 rounded-xl"
                onPress={handleEditInvoice}
              >
                <Edit size={16} color="#3B82F6" />
                <Text className="text-blue-600 font-medium ml-2">Edit</Text>
              </TouchableOpacity>
              {invoice.status !== "Paid" && (
                <TouchableOpacity
                  className="flex-row items-center bg-green-50 px-4 py-2.5 rounded-xl"
                  onPress={handleRecordPayment}
                >
                  <DollarSign size={16} color="#10B981" />
                  <Text className="text-green-600 font-medium ml-2">
                    Record Payment
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-between mb-5">
            <TouchableOpacity
              className="flex-1 bg-indigo-500 py-3 rounded-lg flex-row items-center justify-center mr-1"
              onPress={handleSendInvoice}
            >
              <Send size={16} color="#FFFFFF" />
              <Text className="text-white font-medium ml-2">Send</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-indigo-500 py-3 rounded-lg flex-row items-center justify-center mx-1"
              onPress={handleDownloadInvoice}
            >
              <Download size={16} color="#FFFFFF" />
              <Text className="text-white font-medium ml-2">Download</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-indigo-500 py-3 rounded-lg flex-row items-center justify-center ml-1"
              onPress={handlePrintInvoice}
            >
              <Printer size={16} color="#FFFFFF" />
              <Text className="text-white font-medium ml-2">Print</Text>
            </TouchableOpacity>
          </View>

          {/* Customer Info */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <Text className="text-lg font-bold mb-3 text-gray-900">
              Customer Information
            </Text>
            <TouchableOpacity
              className="flex-row items-center mb-2"
              onPress={() => router.push(`/customers/view?id=1`)}
            >
              <User size={16} color="#3B82F6" />
              <Text className="text-blue-600 font-medium ml-2">
                {invoice.customerName}
              </Text>
            </TouchableOpacity>
            <Text className="text-gray-600 mb-1">{invoice.customerEmail}</Text>
            <Text className="text-gray-600">{invoice.customerPhone}</Text>
          </View>

          {/* Invoice Items */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <Text className="text-lg font-bold mb-3 text-gray-900">
              Invoice Items
            </Text>
            {invoice.items.map((item) => (
              <View
                key={item.id}
                className="flex-row justify-between items-center p-3 mb-2 bg-gray-50 rounded-lg"
              >
                <View className="flex-1">
                  <Text className="font-medium text-gray-900">
                    {item.description}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {item.quantity} x ${item.unitPrice}
                  </Text>
                </View>
                <Text className="font-semibold text-gray-900">
                  ${item.total}
                </Text>
              </View>
            ))}
          </View>

          {/* Invoice Summary */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <Text className="text-lg font-bold mb-3 text-gray-900">
              Invoice Summary
            </Text>
            <View className="border-b border-gray-100 pb-3 mb-3">
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-600">Subtotal:</Text>
                <Text className="font-medium text-gray-800">
                  ${invoice.subtotal}
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-600">Tax (5%):</Text>
                <Text className="font-medium text-gray-800">
                  ${invoice.tax}
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-600">Discount:</Text>
                <Text className="font-medium text-gray-800">
                  -${invoice.discount}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-800 font-bold">Total:</Text>
              <Text className="font-bold text-gray-900">${invoice.total}</Text>
            </View>
          </View>

          {/* Invoice Notes */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <Text className="text-lg font-bold mb-2 text-gray-900">Notes</Text>
            <Text className="text-gray-600">{invoice.notes}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </PageTransition>
  );
}
