import React from "react";
import { View, Text, ScrollView } from "react-native";
import {
  TrendingUp,
  Calendar,
  DollarSign,
  PackageCheck,
} from "lucide-react-native";

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

const SummaryCard = ({
  title = "Metric",
  value = "0",
  icon = <TrendingUp size={20} color="#4F46E5" />,
  trend = "+0%",
  trendUp = true,
}: SummaryCardProps) => {
  return (
    <View className="bg-white rounded-xl p-4 shadow-sm mr-3 w-36">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-gray-500 text-xs font-medium">{title}</Text>
        <View className="bg-indigo-100 p-1.5 rounded-full">{icon}</View>
      </View>
      <Text className="text-xl font-bold mb-1">{value}</Text>
      <View className="flex-row items-center">
        <Text
          className={`text-xs font-medium ${trendUp ? "text-green-600" : "text-red-600"}`}
        >
          {trend}
        </Text>
        <Text className="text-xs text-gray-500 ml-1">vs last month</Text>
      </View>
    </View>
  );
};

interface DashboardSummaryProps {
  activeRentals?: number;
  upcomingEvents?: number;
  monthlyRevenue?: number;
  pendingReturns?: number;
}

const DashboardSummary = ({
  activeRentals = 24,
  upcomingEvents = 8,
  monthlyRevenue = 12580,
  pendingReturns = 5,
}: DashboardSummaryProps) => {
  return (
    <View className="bg-gray-50 p-4 rounded-lg">
      <Text className="text-lg font-bold mb-3">Business Overview</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="-mx-1 px-3.5"
      >
        <SummaryCard
          title="Active Rentals"
          value={activeRentals.toString()}
          icon={<PackageCheck size={20} color="#4F46E5" />}
          trend="+12%"
          trendUp={true}
        />
        <SummaryCard
          title="Upcoming Events"
          value={upcomingEvents.toString()}
          icon={<Calendar size={20} color="#4F46E5" />}
          trend="+5%"
          trendUp={true}
        />
        <SummaryCard
          title="Monthly Revenue"
          value={`$${monthlyRevenue.toLocaleString()}`}
          icon={<DollarSign size={20} color="#4F46E5" />}
          trend="+8%"
          trendUp={true}
        />
        <SummaryCard
          title="Pending Returns"
          value={pendingReturns.toString()}
          icon={<PackageCheck size={20} color="#4F46E5" />}
          trend="-3%"
          trendUp={false}
        />
      </ScrollView>
    </View>
  );
};

export default DashboardSummary;
