import React from "react";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import Quizz from "../components/Quizz";
import { useQuizz } from "../context/QuizzContext";

const LeftComponent = ({ navigation }) => {
  return (
    <TouchableOpacity
      className="rounded-md p-2 border border-slate-200"
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="ios-return-up-back" size={26} color="#334155" />
    </TouchableOpacity>
  );
};

const Question = (props) => {
  const { content } = props.route.params;

  const { renderProgressBar } = useQuizz();

  return (
    <View style={{ flex: 1 }} className="bg-white py-2 px-3">
      {/* Header */}
      <Header
        leftComponent={<LeftComponent navigation={props.navigation} />}
        title={`${content.title}`}
      />
      {renderProgressBar()}

      {/* Quizz */}
      <Quizz questions={content.questions} />
    </View>
  );
};

export default Question;
