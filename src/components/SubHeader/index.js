import React from "react";
import { Text, View } from "react-native";

const SubHeader = ({ title }) => {
  return (
    <View className="flex-row justify-end items-center mb-2">
      <View className="px-3 py-1.5 bg-sky-600 rounded-full shadow-lg shadow-sky-900">
        <Text className="text-white font-bold">{title}</Text>
      </View>
    </View>
  );
};

export default SubHeader;
