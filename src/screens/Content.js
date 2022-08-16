import { FlatList, View } from "react-native";
import React from "react";
import Header from "../components/Header";

const Content = (props) => {
  return (
    <View style={{ flex: 1 }} className="bg-white py-2 px-3">
      {/* Header */}
      <Header
        leftComponent={<LeftComponent navigation={props.navigation} />}
        title={props.route.name}
      />

      <FlatList
        data={content.questions}
        keyExtractor={(item) => `${item._id}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return <QuestionItem question={item} />;
        }}
      />
    </View>
  );
};

export default Content;
