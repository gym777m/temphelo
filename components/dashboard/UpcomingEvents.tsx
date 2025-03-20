import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Calendar, Users, ChevronRight } from "lucide-react-native";
import { router } from "expo-router";

interface EventProps {
  id: string;
  title: string;
  date: string;
  location: string;
  staffCount: number;
  onPress?: () => void;
}

interface UpcomingEventsProps {
  events?: EventProps[];
  onViewAll?: () => void;
}

const EventItem = ({
  title,
  date,
  location,
  staffCount,
  onPress = () => router.push(`/events/view?id=${id}`),
}: EventProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center p-3 mb-2 bg-white rounded-lg shadow-sm border border-gray-100"
    >
      <View className="h-10 w-10 rounded-full bg-blue-100 items-center justify-center mr-3">
        <Calendar size={20} color="#3b82f6" />
      </View>
      <View className="flex-1">
        <Text className="font-medium text-gray-900">{title}</Text>
        <Text className="text-sm text-gray-500">
          {date} • {location}
        </Text>
      </View>
      <View className="flex-row items-center">
        <Users size={16} color="#6b7280" />
        <Text className="ml-1 mr-2 text-gray-500">{staffCount}</Text>
        <ChevronRight size={16} color="#9ca3af" />
      </View>
    </TouchableOpacity>
  );
};

const UpcomingEvents = ({
  events = [],
  onViewAll = () => {},
}: UpcomingEventsProps) => {
  // Default mock data if no events are provided
  const defaultEvents: EventProps[] = [
    {
      id: "1",
      title: "Wedding Reception",
      date: "Jun 15, 2023",
      location: "Grand Hall",
      staffCount: 4,
      onPress: () => {},
    },
    {
      id: "2",
      title: "Corporate Conference",
      date: "Jun 18, 2023",
      location: "Business Center",
      staffCount: 6,
      onPress: () => {},
    },
    {
      id: "3",
      title: "Birthday Party",
      date: "Jun 20, 2023",
      location: "Garden Venue",
      staffCount: 2,
      onPress: () => {},
    },
  ];

  const displayEvents = events.length > 0 ? events : defaultEvents;

  return (
    <View className="bg-gray-50 p-4 rounded-xl">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-semibold text-gray-900">
          Upcoming Events
        </Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text className="text-blue-600 font-medium">View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="max-h-[180px]"
        showsVerticalScrollIndicator={false}
      >
        {displayEvents.map((event) => (
          <EventItem key={event.id} {...event} />
        ))}
      </ScrollView>
    </View>
  );
};

export default UpcomingEvents;
