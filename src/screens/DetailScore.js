import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Header from "../components/Header";
import { COLORS } from "../constants";
import _ from "underscore";

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
  let question = item[0].question;
  return (
    <View>
      <View className="bg-sky-600 p-2 rounded-md shadow-lg shadow-gray-800 my-1.5">
        <Text className="text-gray-50 text-base">{question}</Text>
      </View>
      {item.map((answer, idx) => (
        <Answer key={`ans-4fie-${idx + 14}`} answer={answer} />
      ))}
    </View>
  );
};

const DetailScore = (props) => {
  const { answers } = props.route.params;

  let newAnswers = _.groupBy(answers, "questionIdx");

  return (
    <View style={{ flex: 1 }}>
      {/* Header  */}
      <Header
        leftComponent={<LeftComponent navigation={props.navigation} />}
        title={""}
      />
      {/*  */}
      <ScrollView
        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {Object.keys(newAnswers).map((id) => (
          <DetailScoreItem key={id} item={newAnswers[id]} />
        ))}
      </ScrollView>
    </View>
  );
};

export default DetailScore;
