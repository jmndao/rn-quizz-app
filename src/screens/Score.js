import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Layout from "../components/Layout";
import { COLORS } from "../constants";
import { myScore } from "../data";

const ScoreListItem = ({ item, onPress }) => {
  return (
    <View className="bg-sky-600 rounded-md my-2 p-2 shadow-lg shadow-sky-600">
      <Text className="text-xl font-bold text-gray-50">{item.title}</Text>

      <View className="flex-row items-start my-1.5 justify-between">
        <Text className="text-base font-semibold text-gray-300">{`- Questions repondues: ${item.myAnswers?.length}`}</Text>
        {item.score > Math.floor(parseInt(item.totalScore) / 2) + 1 ? (
          <View className="flex-row items-center space-x-3">
            <View className="flex-row">
              <Text className="text-green-400 text-3xl font-bold">
                {item.score} /{" "}
              </Text>
              <Text className="text-xl text-gray-50">{item.totalScore}</Text>
            </View>
            <Feather name="award" size={22} color={COLORS.success} />
          </View>
        ) : (
          <View className="flex-row items-center space-x-3">
            <View className="flex-row">
              <Text className="text-red-400 font-bold">{item.score} / </Text>
              <Text className="text-lg">{item.totalScore}</Text>
            </View>
            <Feather name="frown" size={22} color={COLORS.success} />
          </View>
        )}
      </View>
      <TouchableOpacity onPress={onPress} className="flex-row justify-end">
        <View className="w-40 flex-row justify-center space-x-2 items-center rounded-full bg-gray-800 px-4 py-1">
          <Text className="text-gray-50 text-base font-semibold underline">
            Voir Details
          </Text>
          <Feather name="arrow-right" size={20} color={COLORS.primary} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Score = () => {
  const navigation = useNavigation();

  return (
    <Layout>
      <View style={{ flex: 1, paddingHorizontal: 5, paddingVertical: 4 }}>
        {/* Some Text */}
        <Text className="text-2xl font-extrabold text-gray-800 py-4">
          Revoir Mon Score
        </Text>

        {/* List of Scores */}
        <FlatList
          data={myScore}
          keyExtractor={(item) => `${item._id}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => {
            return (
              <ScoreListItem
                item={item}
                onPress={() =>
                  navigation.navigate("Detail", { myAnswers: item.myAnswers })
                }
              />
            );
          }}
        />
      </View>
    </Layout>
  );
};

export default Score;
