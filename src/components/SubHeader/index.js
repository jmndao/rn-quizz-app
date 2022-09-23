import React from "react";
import { Text, View } from "react-native";

const SubHeader = ({ title }) => {
  return (
    <View className="flex-row justify-end items-center mb-2">
      <View className="px-3 py-1.5 bg-sky-600 rounded-full shadow-lg shadow-sky-900">
        <Text className="text-white font-semibold text-base">{title}</Text>
      </View>
      {/* <TouchableOpacity
        onPress={onPress}
        className="rounded-full px-4 py-1 bg-black flex-row space-x-1 items-center"
      >
        <FontAwesome5 name="running" size={22} color="white" />
        <Text className="text-white font-semibold">Go</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default SubHeader;
