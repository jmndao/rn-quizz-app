import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const SubHeader = ({ title }) => {
  const { curTheme } = useTheme();

  return (
    <View className="flex-row justify-end items-center mb-2">
      <View
        className="px-3 py-1.5 rounded-full shadow-lg shadow-red-900"
        style={{ backgroundColor: curTheme.primary }}
      >
        <Text className="font-bold" style={{ color: curTheme.neutral }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default SubHeader;
