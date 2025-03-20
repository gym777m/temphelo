import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Plus,
  Search,
  Filter,
  User,
  Phone,
  Calendar,
  Mail,
  Trash2,
  Edit,
} from "lucide-react-native";
import { router } from "expo-router";

import Header from "../../components/Header";
import BottomNavigation from "../../components/navigation/BottomNavigation";

interface EmployeeItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  assignedEvents: number;
  status: "Active" | "On Leave" | "Unavailable";
}

export default function EmployeesScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const mockEmployees: EmployeeItem[] = [
    {
      id: "1",
      name: "David Miller",
      email: "david.m@example.com",
      phone: "(555) 123-7890",
      role: "Photographer",
      assignedEvents: 3,
      status: "Active",
    },
    {
      id: "2",
      name: "Jessica Taylor",
      email: "jessica.t@example.com",
      phone: "(555) 456-7891",
      role: "Event Manager",
      assignedEvents: 5,
      status: "Active",
    },
    {
      id: "3",
      name: "Ryan Cooper",
      email: "ryan.c@example.com",
      phone: "(555) 789-1234",
      role: "Equipment Technician",
      assignedEvents: 2,
      status: "On Leave",
    },
    {
      id: "4",
      name: "Amanda Wilson",
      email: "amanda.w@example.com",
      phone: "(555) 234-5678",
      role: "Assistant Photographer",
      assignedEvents: 4,
      status: "Active",
    },
    {
      id: "5",
      name: "Mark Johnson",
      email: "mark.j@example.com",
      phone: "(555) 876-5432",
      role: "Videographer",
      assignedEvents: 0,
      status: "Unavailable",
    },
  ];

  const [employees, setEmployees] = useState<EmployeeItem[]>(mockEmployees);

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const filteredEmployees = searchQuery
    ? employees.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : employees;

  const renderEmployeeItem = ({ item }: { item: EmployeeItem }) => {
    const statusColor = {
      Active: "bg-green-100 text-green-800",
      "On Leave": "bg-yellow-100 text-yellow-800",
      Unavailable: "bg-red-100 text-red-800",
    }[item.status];

    return (
      <TouchableOpacity
        className="bg-white p-4 rounded-lg mb-3 shadow-sm border border-gray-100"
        onPress={() => router.push(`/employees/view?id=${item.id}`)}
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900">
              {item.name}
            </Text>
            <Text className="text-gray-600 text-sm mt-1">{item.role}</Text>
            <View className="flex-row items-center mt-2">
              <Mail size={14} color="#6B7280" className="mr-1" />
              <Text className="text-gray-500 text-sm">{item.email}</Text>
            </View>
            <View className="flex-row items-center mt-1">
              <Phone size={14} color="#6B7280" className="mr-1" />
              <Text className="text-gray-500 text-sm">{item.phone}</Text>
            </View>
          </View>
          <View className="items-end">
            <View className={`px-2 py-1 rounded-full mb-2 ${statusColor}`}>
              <Text className="text-xs font-medium">{item.status}</Text>
            </View>
            <View className="flex-row items-center">
              <Calendar size={14} color="#6B7280" />
              <Text className="text-gray-700 text-sm ml-1">
                {item.assignedEvents} events
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row justify-end mt-3 pt-2 border-t border-gray-100">
          <TouchableOpacity
            className="flex-row items-center mr-4"
            onPress={() => router.push(`/employees/edit?id=${item.id}`)}
          >
            <Edit size={16} color="#3B82F6" />
            <Text className="text-blue-500 ml-1">Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => handleDeleteEmployee(item.id)}
          >
            <Trash2 size={16} color="#EF4444" />
            <Text className="text-red-500 ml-1">Remove</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header title="Employees" />

      <View className="flex-1 px-4 pt-4">
        <View className="flex-row justify-between items-center mb-4">
          {showSearch ? (
            <View className="flex-1 flex-row items-center bg-white rounded-lg p-2 mr-2">
              <Search size={20} color="#4B5563" />
              <TextInput
                className="flex-1 ml-2"
                placeholder="Search employees..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              <TouchableOpacity
                onPress={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
              >
                <Text className="text-blue-500">Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex-row">
              <TouchableOpacity
                className="bg-white p-2 rounded-lg mr-2 shadow-sm"
                onPress={() => setShowSearch(true)}
              >
                <Search size={20} color="#4B5563" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-white p-2 rounded-lg shadow-sm">
                <Filter size={20} color="#4B5563" />
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            className="bg-blue-500 px-3 py-2 rounded-lg flex-row items-center"
            onPress={() => router.push("/employees/add")}
          >
            <Plus size={18} color="#FFFFFF" />
            <Text className="text-white font-medium ml-1">Add Employee</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredEmployees}
          renderItem={renderEmployeeItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        />
      </View>

      <View className="absolute bottom-0 left-0 right-0">
        <BottomNavigation activeTab="employees" />
      </View>
    </SafeAreaView>
  );
}
