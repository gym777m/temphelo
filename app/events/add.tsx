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
import { ArrowLeft, Save, Plus, X } from "lucide-react-native";

import Header from "../../components/Header";

export default function EventAddScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    address: "",
    customer: "",
    notes: "",
  });

  // Selected staff and equipment
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  // Mock staff list
  const staffList = [
    { id: "s1", name: "David Miller", role: "Photographer" },
    { id: "s2", name: "Jessica Taylor", role: "Event Manager" },
    { id: "s3", name: "Ryan Cooper", role: "Equipment Technician" },
    { id: "s4", name: "Amanda Wilson", role: "Assistant Photographer" },
    { id: "s5", name: "Mark Johnson", role: "Videographer" },
  ];

  // Mock equipment list
  const equipmentList = [
    { id: "e1", name: "Canon 5D Mark IV", category: "Cameras" },
    { id: "e2", name: "Sony A7 III", category: "Cameras" },
    { id: "e3", name: "Godox Lighting Kit", category: "Lighting" },
    { id: "e4", name: "DJI Ronin Gimbal", category: "Stabilizers" },
    { id: "e5", name: "Sennheiser Wireless Mic", category: "Audio" },
  ];

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleStaffSelection = (staffId: string) => {
    if (selectedStaff.includes(staffId)) {
      setSelectedStaff(selectedStaff.filter((id) => id !== staffId));
    } else {
      setSelectedStaff([...selectedStaff, staffId]);
    }
  };

  const toggleEquipmentSelection = (equipmentId: string) => {
    if (selectedEquipment.includes(equipmentId)) {
      setSelectedEquipment(
        selectedEquipment.filter((id) => id !== equipmentId),
      );
    } else {
      setSelectedEquipment([...selectedEquipment, equipmentId]);
    }
  };

  const handleSave = () => {
    // In a real app, you would save the event data
    console.log("Saving event data:", {
      ...formData,
      staff: selectedStaff,
      equipment: selectedEquipment,
    });
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header
        title={id ? "Edit Event" : "Add Event"}
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
              <Text className="text-gray-700 mb-2 font-medium">
                Event Title
              </Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                value={formData.title}
                onChangeText={(value) => handleChange("title", value)}
                placeholder="Enter event title"
              />
            </View>

            <View className="flex-row mb-4">
              <View className="flex-1 mr-2">
                <Text className="text-gray-700 mb-2 font-medium">Date</Text>
                <TextInput
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                  value={formData.date}
                  onChangeText={(value) => handleChange("date", value)}
                  placeholder="MM/DD/YYYY"
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-700 mb-2 font-medium">Time</Text>
                <TextInput
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                  value={formData.time}
                  onChangeText={(value) => handleChange("time", value)}
                  placeholder="HH:MM AM/PM"
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">Venue</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                value={formData.venue}
                onChangeText={(value) => handleChange("venue", value)}
                placeholder="Enter venue name"
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">Address</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                value={formData.address}
                onChangeText={(value) => handleChange("address", value)}
                placeholder="Enter venue address"
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">Customer</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                value={formData.customer}
                onChangeText={(value) => handleChange("customer", value)}
                placeholder="Select customer"
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
          </View>

          {/* Staff Assignment */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <Text className="text-lg font-bold mb-3 text-gray-900">
              Assign Staff
            </Text>
            {staffList.map((staff) => (
              <TouchableOpacity
                key={staff.id}
                className={`flex-row justify-between items-center p-3 mb-2 rounded-lg ${selectedStaff.includes(staff.id) ? "bg-blue-50 border border-blue-200" : "bg-gray-50"}`}
                onPress={() => toggleStaffSelection(staff.id)}
              >
                <View className="flex-row items-center">
                  <View
                    className={`h-5 w-5 rounded-full mr-3 items-center justify-center ${selectedStaff.includes(staff.id) ? "bg-blue-500" : "border border-gray-300"}`}
                  >
                    {selectedStaff.includes(staff.id) && (
                      <Text className="text-white text-xs">✓</Text>
                    )}
                  </View>
                  <View>
                    <Text className="font-medium text-gray-900">
                      {staff.name}
                    </Text>
                    <Text className="text-sm text-gray-500">{staff.role}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Equipment Assignment */}
          <View className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <Text className="text-lg font-bold mb-3 text-gray-900">
              Assign Equipment
            </Text>
            {equipmentList.map((equipment) => (
              <TouchableOpacity
                key={equipment.id}
                className={`flex-row justify-between items-center p-3 mb-2 rounded-lg ${selectedEquipment.includes(equipment.id) ? "bg-blue-50 border border-blue-200" : "bg-gray-50"}`}
                onPress={() => toggleEquipmentSelection(equipment.id)}
              >
                <View className="flex-row items-center">
                  <View
                    className={`h-5 w-5 rounded-full mr-3 items-center justify-center ${selectedEquipment.includes(equipment.id) ? "bg-blue-500" : "border border-gray-300"}`}
                  >
                    {selectedEquipment.includes(equipment.id) && (
                      <Text className="text-white text-xs">✓</Text>
                    )}
                  </View>
                  <View>
                    <Text className="font-medium text-gray-900">
                      {equipment.name}
                    </Text>
                    <Text className="text-sm text-gray-500">
                      {equipment.category}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            className="bg-blue-500 py-3 rounded-lg flex-row items-center justify-center mb-10"
            onPress={handleSave}
          >
            <Save size={20} color="#FFFFFF" />
            <Text className="text-white font-medium ml-2">
              {id ? "Update Event" : "Create Event"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
