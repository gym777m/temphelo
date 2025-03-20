import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Calendar, Clock, User } from "lucide-react-native";

interface RentalItem {
  id: string;
  customerName: string;
  items: string[];
  returnDate: string;
  daysRemaining: number;
}

interface ActiveRentalsProps {
  rentals?: RentalItem[];
  onViewRental?: (id: string) => void;
}

const ActiveRentals = ({
  rentals = [
    {
      id: "1",
      customerName: "John Smith",
      items: ["Canon 5D Mark IV", "Tripod", "50mm Lens"],
      returnDate: "May 15, 2023",
      daysRemaining: 3,
    },
    {
      id: "2",
      customerName: "Sarah Johnson",
      items: ["PA System", "Wireless Microphones (2)"],
      returnDate: "May 18, 2023",
      daysRemaining: 6,
    },
    {
      id: "3",
      customerName: "Michael Brown",
      items: ["Projector", "Projection Screen", "HDMI Cable"],
      returnDate: "May 12, 2023",
      daysRemaining: 1,
    },
    {
      id: "4",
      customerName: "Emily Davis",
      items: ["Lighting Kit", "Backdrop Stand"],
      returnDate: "May 20, 2023",
      daysRemaining: 8,
    },
  ],
  onViewRental = (id) => console.log(`View rental ${id}`),
}: ActiveRentalsProps) => {
  return (
    <View className="bg-white p-4 rounded-lg shadow-sm">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-bold">Active Rentals</Text>
        <TouchableOpacity>
          <Text className="text-blue-500">View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="max-h-[180px]"
        showsVerticalScrollIndicator={false}
      >
        {rentals.map((rental) => (
          <TouchableOpacity
            key={rental.id}
            className={`p-3 mb-2 rounded-md border-l-4 ${rental.daysRemaining <= 2 ? "border-red-500 bg-red-50" : "border-green-500 bg-white"}`}
            onPress={() => onViewRental(rental.id)}
          >
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <View className="flex-row items-center mb-1">
                  <User size={14} className="text-gray-600 mr-1" />
                  <Text className="font-semibold">{rental.customerName}</Text>
                </View>
                <Text className="text-gray-600 text-sm mb-1">
                  {rental.items.length > 1
                    ? `${rental.items[0]} +${rental.items.length - 1} more`
                    : rental.items[0]}
                </Text>
                <View className="flex-row items-center">
                  <Calendar size={14} className="text-gray-500 mr-1" />
                  <Text className="text-gray-500 text-xs">
                    {rental.returnDate}
                  </Text>
                </View>
              </View>
              <View className="flex items-center justify-center bg-gray-100 px-2 py-1 rounded">
                <Clock size={12} className="text-gray-600 mb-1" />
                <Text
                  className={`text-xs font-medium ${rental.daysRemaining <= 2 ? "text-red-600" : "text-gray-600"}`}
                >
                  {rental.daysRemaining}{" "}
                  {rental.daysRemaining === 1 ? "day" : "days"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ActiveRentals;
