import { Text, View } from "react-native";
import React from "react";

const QuestionItem = ({ question }) => {
  return (
    <View className="mt-2 mb-3 py-1.5 ">
      {/* Question Card Wrapper */}
      <View className="bg-sky-700 p-2 rounded-md my-2 shadow-lg shadow-sky-900">
        <Text className="text-white text-sm font-semibold tracking-wide leading-relaxed">
          {question.text}
        </Text>
      </View>
      <Text>QuestionItem</Text>
    </View>
  );
};

export default QuestionItem;
