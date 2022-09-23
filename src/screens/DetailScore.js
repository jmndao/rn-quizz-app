import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Header from "../components/Header";
import { COLORS } from "../constants";

const LeftComponent = ({ navigation }) => {
  return (
    <TouchableOpacity
      className="rounded-md p-2 border border-gray-200"
      onPress={() => navigation.navigate("Score")}
    >
      <Ionicons name="ios-return-up-back" size={26} color="#334155" />
    </TouchableOpacity>
  );
};

const Answer = ({ answer }) => {
  return answer.checked ? (
    answer.isCorrect ? (
      <View className="flex-row space-x-1 items-center">
        <Feather name="check-circle" size={18} color={COLORS.accent} />
        <Text className="text-sky-600 text-base py-1.5 font-semibold">
          {answer.option}
        </Text>
      </View>
    ) : (
      <View className="flex-row space-x-1 items-center">
        <Feather name="slash" size={18} color={COLORS.error} />
        <Text className="text-red-600 py-1.5 font-semibold">
          {answer.option}
        </Text>
      </View>
    )
  ) : (
    <View className="flex-row items-center py-0.5 space-x-1">
      <Feather
        name={answer.isCorrect ? "check-circle" : "slash"}
        size={18}
        color={"#6B7280"}
      />
      <Text className="text-gray-500 font-semibold">{answer.option}</Text>
    </View>
  );
};

const DetailScoreItem = ({ item }) => {
  return (
    <View>
      <View className="bg-sky-600 p-2 rounded-md shadow-lg shadow-gray-800 my-1.5">
        <Text className="text-gray-50 text-base">{item.text}</Text>
      </View>
      {item.answers.map((answer, idx) => (
        <Answer key={`ans-4fie-${idx + 14}`} answer={answer} />
      ))}
    </View>
  );
};

const DetailScore = (props) => {
  const { myAnswers } = props.route.params;

  return (
    <View style={{ flex: 1 }} className="p-2">
      {/* Header  */}
      <Header
        leftComponent={<LeftComponent navigation={props.navigation} />}
        title={""}
      />
      {/*  */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {myAnswers.map((myAnswer, idx) => (
          <DetailScoreItem key={`deeta-i-${idx * 2}`} item={myAnswer} />
        ))}
      </ScrollView>
    </View>
  );
};

export default DetailScore;
