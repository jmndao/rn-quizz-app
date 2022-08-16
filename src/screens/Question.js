import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import QuestionItem from "../components/QuestionItem";

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

  return (
    <View style={{ flex: 1 }} className="bg-white py-2 px-3">
      {/* Header */}
      <Header
        leftComponent={<LeftComponent navigation={props.navigation} />}
        title={`${content.questions.length} Questions`}
      />

      <View style={{ alignItems: "flex-end" }} className="my-2.5">
        <Text className="text-white text-lg font-semibold bg-sky-700 rounded-full px-4 py-0.5 shadow-md shadow-sky-800">
          {content.title}
        </Text>
      </View>

      <form className="relative" style={{ flex: 1 }}>
        <FlatList
          data={content.questions}
          keyExtractor={(item) => `${item._id}`}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return <QuestionItem question={item} />;
          }}
        />

        <TouchableOpacity
          onPress={() => console.log("Submitted")}
          className="absolute py-2.5 px-4 bottom-5 right-5 rounded-full bg-sky-700 outline-none border-0 shadow-xl shadow-sky-900"
        >
          <Text className="text-white font-semibold text-sm">Soumettre</Text>
        </TouchableOpacity>
      </form>
    </View>
  );
};

export default Question;
