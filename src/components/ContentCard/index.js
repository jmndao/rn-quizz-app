import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import EntypoIcons from "react-native-vector-icons/Entypo";
import { useTheme } from "../../context/ThemeContext";

const ContentCard = ({ item, onPress }) => {
  const { curTheme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row space-x-4 py-1.5 mb-1.5 border-b border-red-100"
    >
      <EntypoIcons name="book" size={22} style={{ color: curTheme.primary }} />
      <View className="tracking-tight leading-relaxed">
        <Text className="font-semibold" style={{ color: curTheme.primary }}>
          {item.title}
        </Text>
        <Text
          style={{
            color: curTheme.secondary,
            fontSize: Platform.OS === "ios" ? 14 : 12,
          }}
        >{`Questions: ${item.qa.length}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ContentCard;
