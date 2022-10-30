import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { COLORS } from "../constants";
import { useTab } from "../context/TabContext";
import { useFirebase } from "../context/FirebaseContext";
import Loading from "../components/Loading";
import { useTheme } from "../context/ThemeContext";

const ScoreListItem = ({ item, onPress }) => {
  const { curTheme } = useTheme();

  return (
    <View
      className="rounded-md my-2 p-2 shadow-lg shadow-sky-600"
      style={{ backgroundColor: curTheme.secondary }}
    >
      <Text className="text-lg font-bold text-gray-50">{item.title}</Text>

      <View className="flex-row items-start my-1.5 justify-between">
        <Text
          className="text-base font-semibold"
          style={{ color: curTheme.neutral }}
        >{`- ${item.notion}`}</Text>
        {item.score > Math.floor(parseInt(item.totalScore) / 2) + 1 ? (
          <View className="flex-row items-center space-x-3">
            <View className="flex-row">
              <Text className="text-green-400 text-xl font-bold">
                {item.score} /{" "}
              </Text>
              <Text className="text-base" style={{ color: curTheme.neutral }}>
                {item.totalScore}
              </Text>
            </View>
            <Feather name="award" size={22} color={COLORS.success} />
          </View>
        ) : (
          <View className="flex-row items-center space-x-3">
            <View className="flex-row">
              <Text className="text-red-400 text-xl font-bold">
                {item.score} /{" "}
              </Text>
              <Text className="text-lg text-gray-50">{item.totalScore}</Text>
            </View>
            <Feather name="frown" size={22} color={"#991B1B"} />
          </View>
        )}
      </View>
      <TouchableOpacity onPress={onPress} className="flex-row justify-end">
        <View
          className="w-40 flex-row justify-center space-x-2 items-center rounded-2xl px-4 py-1"
          style={{ backgroundColor: curTheme.secondaryHigh }}
        >
          <Text className="text-gray-50 text-sm font-semibold">
            Voir Details
          </Text>
          <Feather name="arrow-right" size={20} color={curTheme.secondary} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const LeftComponent = ({ navigation }) => {
  const { changeTab } = useTab();

  const navigate = () => {
    changeTab("Accueil");
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      className="rounded-md p-2 border border-gray-200"
      onPress={() => navigate()}
    >
      <Ionicons name="ios-return-up-back" size={26} color="#334155" />
    </TouchableOpacity>
  );
};

const Score = () => {
  const navigation = useNavigation();
  const { fetchMyAnswersAll, allMyAnswers, loading } = useFirebase();

  React.useEffect(() => {
    fetchMyAnswersAll();
  }, []);

  return (
    <Layout>
      <View style={{ flex: 1 }}>
        {/* Some Text */}
        {/* Header  */}
        <Header
          leftComponent={<LeftComponent navigation={navigation} />}
          title={"Revoir Mon Score"}
        />
        <View className="px-2 py-3" style={{ flex: 1 }}>
          {/* List of Scores */}
          {loading ? (
            <Loading />
          ) : (
            <FlatList
              data={allMyAnswers}
              keyExtractor={(item) => `${item.id}`}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
              renderItem={({ item }) => {
                return (
                  <ScoreListItem
                    item={item}
                    onPress={() =>
                      navigation.navigate("Detail", {
                        answers: Object.keys(item.answers).map((id) => {
                          return { id, ...item.answers[id] };
                        }),
                      })
                    }
                  />
                );
              }}
            />
          )}
        </View>
      </View>
    </Layout>
  );
};

export default Score;
