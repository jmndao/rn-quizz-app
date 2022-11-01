import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import Quizz from "../components/Quizz";
import { useQuizz } from "../context/QuizzContext";
import { useTheme } from "../context/ThemeContext";

const LeftComponent = ({ navigation }) => {
  const { curTheme } = useTheme();
  return (
    <TouchableOpacity
      className="rounded-md p-2 border border-slate-200"
      onPress={() => navigation.goBack()}
      style={{ backgroundColor: curTheme.neutral }}
    >
      <Ionicons name="ios-return-up-back" size={26} color={curTheme.secondary} />
    </TouchableOpacity>
  );
};

const Question = (props) => {
  const { content } = props.route.params;
  const navigate = useNavigation();

  const { renderProgressBar } = useQuizz();
  const { curTheme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header */}
      <Header
        leftComponent={<LeftComponent navigation={props.navigation} />}
        title={`${content.title}`}
      />
      <View className="px-3 py-3" style={{ backgroundColor: curTheme.neutral }}>
        {renderProgressBar()}
        {/* Quizz */}
        <Quizz questions={content.qa} nav={navigate} />
      </View>
    </SafeAreaView>
  );
};

export default Question;
