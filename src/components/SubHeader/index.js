import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Text, TouchableOpacity, View } from "react-native";

const SubHeader = ({ title, onPress }) => {
  return (
    <View className="flex-row justify-between items-center mb-2">
      <View className="px-2.5 py-1 bg-sky-600 rounded-full shadow-lg shadow-sky-900">
        <Text className="text-white font-semibold text-sm">{title}</Text>
      </View>
      <TouchableOpacity
        onPress={onPress}
        className="rounded-full px-4 py-1 bg-black flex-row space-x-1 items-center"
      >
        <FontAwesome5 name="running" size={22} color="white" />
        <Text className="text-white font-semibold">Go</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubHeader;
