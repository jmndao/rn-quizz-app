import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import EntypoIcons from "react-native-vector-icons/Entypo";

const ContentCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row space-x-4 py-1.5 mb-1.5 border-b border-sky-200"
    >
      <EntypoIcons name="book" size={22} />
      <View className="tracking-tight leading-relaxed">
        <Text className="font-semibold text-sky-600">{item.title}</Text>
        <Text className="text-sm text-slate-400">{`Questions: ${item.questions.length}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ContentCard;
