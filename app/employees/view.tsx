import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  AlertTriangle,
  Edit,
  Trash2,
} from "lucide-react-native";

interface EmployeeDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  salary: string;
  startDate: string;
  address: string;
  emergencyContact: string;
  notes: string;
  assignedEvents: number;
  status: "Active" | "On Leave" | "Unavailable";
}

export default function EmployeeViewScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const employeeId = params.id as string;

  // Mock data - in a real app, you would fetch this based on the employeeId
  const employeeData: EmployeeDetails = {
    id: employeeId,
    name: "David Miller",
    email: "david.m@example.com",
    phone: "(555) 123-7890",
    role: "Photographer",
    salary: "4500",
    startDate: "Jan 15, 2022",
    address: "123 Main St, Anytown, USA 12345",
    emergencyContact: "Jane Miller (555) 987-6543",
    notes:
      "Specializes in outdoor and event photography. Prefers weekend assignments.",
    assignedEvents: 3,
    status: "Active",
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "On Leave":
        return "bg-yellow-100 text-yellow-800";
      case "Unavailable":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDeleteEmployee = () => {
    // In a real app, you would delete the employee from the database
    console.log(`Delete employee ${employeeId}`);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-white px-4 py-4 flex-row justify-between items-center shadow-sm">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ArrowLeft size={24} color="#4B5563" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">
          Employee Details
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 20,
        }}
      >
        {/* Employee Status */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-row items-center">
              <User size={20} color="#4B5563" />
              <Text className="text-xl font-semibold ml-2">
                {employeeData.name}
              </Text>
            </View>
            <View
              className={`px-3 py-1 rounded-full ${getStatusColor(employeeData.status)}`}
            >
              <Text className="text-xs font-medium">{employeeData.status}</Text>
            </View>
          </View>

          <View className="flex-row items-center mt-2">
            <Briefcase size={16} color="#6B7280" />
            <Text className="text-gray-700 ml-2">{employeeData.role}</Text>
          </View>

          <View className="flex-row items-center mt-2">
            <Calendar size={16} color="#6B7280" />
            <Text className="text-gray-700 ml-2">
              Started {employeeData.startDate}
            </Text>
          </View>

          <View className="flex-row items-center mt-2">
            <Calendar size={16} color="#6B7280" />
            <Text className="text-gray-700 ml-2">
              {employeeData.assignedEvents} assigned events
            </Text>
          </View>
        </View>

        {/* Contact Information */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <Text className="text-lg font-semibold mb-3">
            Contact Information
          </Text>

          <View className="mb-3">
            <View className="flex-row items-center mb-1">
              <Mail size={16} color="#6B7280" />
              <Text className="text-gray-700 font-medium ml-2">Email</Text>
            </View>
            <Text className="text-gray-900 ml-6">{employeeData.email}</Text>
          </View>

          <View className="mb-3">
            <View className="flex-row items-center mb-1">
              <Phone size={16} color="#6B7280" />
              <Text className="text-gray-700 font-medium ml-2">Phone</Text>
            </View>
            <Text className="text-gray-900 ml-6">{employeeData.phone}</Text>
          </View>

          <View className="mb-3">
            <View className="flex-row items-center mb-1">
              <MapPin size={16} color="#6B7280" />
              <Text className="text-gray-700 font-medium ml-2">Address</Text>
            </View>
            <Text className="text-gray-900 ml-6">{employeeData.address}</Text>
          </View>

          <View>
            <View className="flex-row items-center mb-1">
              <AlertTriangle size={16} color="#6B7280" />
              <Text className="text-gray-700 font-medium ml-2">
                Emergency Contact
              </Text>
            </View>
            <Text className="text-gray-900 ml-6">
              {employeeData.emergencyContact}
            </Text>
          </View>
        </View>

        {/* Employment Information */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <Text className="text-lg font-semibold mb-3">
            Employment Information
          </Text>

          <View className="mb-3">
            <View className="flex-row items-center mb-1">
              <Briefcase size={16} color="#6B7280" />
              <Text className="text-gray-700 font-medium ml-2">Position</Text>
            </View>
            <Text className="text-gray-900 ml-6">{employeeData.role}</Text>
          </View>

          <View className="mb-3">
            <View className="flex-row items-center mb-1">
              <DollarSign size={16} color="#6B7280" />
              <Text className="text-gray-700 font-medium ml-2">
                Monthly Salary
              </Text>
            </View>
            <Text className="text-gray-900 ml-6">${employeeData.salary}</Text>
          </View>

          <View>
            <View className="flex-row items-center mb-1">
              <Calendar size={16} color="#6B7280" />
              <Text className="text-gray-700 font-medium ml-2">Start Date</Text>
            </View>
            <Text className="text-gray-900 ml-6">{employeeData.startDate}</Text>
          </View>
        </View>

        {/* Notes */}
        {employeeData.notes && (
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <Text className="text-lg font-semibold mb-2">Notes</Text>
            <Text className="text-gray-700">{employeeData.notes}</Text>
          </View>
        )}

        {/* Action Buttons */}
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity
            className="flex-1 bg-blue-500 py-3 rounded-lg flex-row justify-center items-center mr-2"
            onPress={() => router.push(`/employees/edit?id=${employeeId}`)}
          >
            <Edit size={18} color="#FFFFFF" />
            <Text className="text-white font-medium ml-2">Edit Employee</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 bg-red-500 py-3 rounded-lg flex-row justify-center items-center ml-2"
            onPress={handleDeleteEmployee}
          >
            <Trash2 size={18} color="#FFFFFF" />
            <Text className="text-white font-medium ml-2">Delete Employee</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
