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
  MapPin,
  Users,
  Package,
  DollarSign,
  Edit,
  Trash2,
  User,
} from "lucide-react-native";

import Header from "../../components/Header";

export default function EventViewScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Mock event data - in a real app, you would fetch this based on the ID
  const event = {
    id: id || "1",
    title: "Johnson Wedding",
    date: "Jun 15, 2023",
    time: "2:00 PM - 10:00 PM",
    venue: "Grand Hall, Downtown",
    address: "123 Main St, Anytown, USA",
    customer: "Sarah Johnson",
    customerEmail: "sarah.j@example.com",
    customerPhone: "(555) 987-6543",
    staffCount: 4,
    revenue: 2500,
    status: "Upcoming",
    notes:
      "Bride requested extra lighting setup. Ceremony starts at 3:00 PM sharp.",
  };

  // Mock assigned staff
  const assignedStaff = [
    {
      id: "s1",
      name: "David Miller",
      role: "Lead Photographer",
      phone: "(555) 123-7890",
    },
    {
      id: "s2",
      name: "Jessica Taylor",
      role: "Event Manager",
      phone: "(555) 456-7891",
    },
    {
      id: "s3",
      name: "Ryan Cooper",
      role: "Equipment Technician",
      phone: "(555) 789-1234",
    },
    {
      id: "s4",
      name: "Amanda Wilson",
      role: "Assistant Photographer",
      phone: "(555) 234-5678",
    },
  ];

  // Mock assigned equipment
  const assignedEquipment = [
    {
      id: "e1",
      name: "Canon 5D Mark IV",
      category: "Cameras",
      quantity: 2,
    },
    {
      id: "e2",
      name: "Godox Lighting Kit",
      category: "Lighting",
      quantity: 1,
    },
    {
      id: "e3",
      name: "DJI Ronin Gimbal",
      category: "Stabilizers",
      quantity: 1,
    },
    {
      id: "e4",
      name: "Sennheiser Wireless Mic",
      category: "Audio",
      quantity: 2,
    },
  ];

  const handleEditEvent = () => {
    router.push(`/events/edit?id=${id}`);
  };

  const handleDeleteEvent = () => {
    // In a real app, you would delete the event and navigate back
    router.back();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <PageTransition type="slide">
      <SafeAreaView className="flex-1 bg-gray-100">
        <Header
          title="Event Details"
          leftIcon={<ArrowLeft size={24} color="#000" />}
          onLeftPress={() => router.back()}
        />

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom }}
        >
          {/* Event Info Card */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-1">
                <Text className="text-2xl font-bold text-gray-900">
                  {event.title}
                </Text>
                <View className="flex-row items-center mt-2">
                  <Calendar size={16} color="#6B7280" />
                  <Text className="text-gray-600 ml-2">
                    {event.date}, {event.time}
                  </Text>
                </View>
                <View className="flex-row items-center mt-2">
                  <MapPin size={16} color="#6B7280" />
                  <Text className="text-gray-600 ml-2">
                    {event.venue}, {event.address}
                  </Text>
                </View>
              </View>
              <View
                className={`px-3 py-1.5 rounded-full ${getStatusColor(event.status)}`}
              >
                <Text className="text-xs font-medium">{event.status}</Text>
              </View>
            </View>

            <View className="flex-row justify-between mb-4">
              <View className="items-center flex-1 bg-blue-50 p-3 rounded-xl mr-2">
                <Text className="text-gray-600 text-sm mb-1 font-medium">
                  Staff
                </Text>
                <Text className="text-xl font-bold text-blue-600">
                  {event.staffCount}
                </Text>
              </View>
              <View className="items-center flex-1 bg-green-50 p-3 rounded-xl">
                <Text className="text-gray-600 text-sm mb-1 font-medium">
                  Revenue
                </Text>
                <Text className="text-xl font-bold text-green-600">
                  ${event.revenue}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between mt-2">
              <TouchableOpacity
                className="flex-row items-center bg-blue-50 px-4 py-2.5 rounded-xl"
                onPress={handleEditEvent}
              >
                <Edit size={16} color="#3B82F6" />
                <Text className="text-blue-600 font-medium ml-2">Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center bg-red-50 px-4 py-2.5 rounded-xl"
                onPress={handleDeleteEvent}
              >
                <Trash2 size={16} color="#EF4444" />
                <Text className="text-red-600 font-medium ml-2">Delete</Text>
              </TouchableOpacity>
            </View>
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
              <User size={16} color="#6B7280" />
              <Text className="text-blue-600 font-medium ml-2">
                {event.customer}
              </Text>
            </TouchableOpacity>
            <Text className="text-gray-600 ml-6 mb-1">
              {event.customerEmail}
            </Text>
            <Text className="text-gray-600 ml-6">{event.customerPhone}</Text>
          </View>

          {/* Event Notes */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <Text className="text-lg font-bold mb-2 text-gray-900">Notes</Text>
            <Text className="text-gray-600">{event.notes}</Text>
          </View>

          {/* Assigned Staff */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <Text className="text-lg font-bold mb-3 text-gray-900">
              Assigned Staff
            </Text>
            {assignedStaff.map((staff) => (
              <TouchableOpacity
                key={staff.id}
                className="flex-row justify-between items-center p-3 mb-2 bg-gray-50 rounded-lg"
                onPress={() => router.push(`/employees/view?id=${staff.id}`)}
              >
                <View>
                  <Text className="font-medium text-gray-900">
                    {staff.name}
                  </Text>
                  <Text className="text-sm text-gray-500">{staff.role}</Text>
                </View>
                <Text className="text-gray-600">{staff.phone}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Assigned Equipment */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <Text className="text-lg font-bold mb-3 text-gray-900">
              Assigned Equipment
            </Text>
            {assignedEquipment.map((equipment) => (
              <TouchableOpacity
                key={equipment.id}
                className="flex-row justify-between items-center p-3 mb-2 bg-gray-50 rounded-lg"
                onPress={() => router.push(`/products/view?id=${equipment.id}`)}
              >
                <View>
                  <Text className="font-medium text-gray-900">
                    {equipment.name}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {equipment.category}
                  </Text>
                </View>
                <Text className="text-gray-600">Qty: {equipment.quantity}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </PageTransition>
  );
}
