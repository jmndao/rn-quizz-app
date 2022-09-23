import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ContentCard from "../components/ContentCard";
import Header from "../components/Header";
import Layout from "../components/Layout";
import SubHeader from "../components/SubHeader";

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

const Theme = (props) => {
  const { theme } = props.route.params;

  const countAllQst = theme.contents.reduce(
    (prev, cur) => prev + cur.questions.length,
    0
  );

  return (
    <Layout>
      <View style={{ flex: 1 }} className="bg-white py-2 px-3">
        <Header
          leftComponent={<LeftComponent navigation={props.navigation} />}
          title={""}
        />

        {/* SubHeader */}
        <SubHeader title={theme.title} />

        {/* Description */}
        <View className="mb-2">
          <Text className="text-sky-600 font-bold text-sm pb-2">
            Sens & Portee d'etude
          </Text>
          <Text>{theme.description}</Text>
        </View>

        {/* Image Card */}
        <View className="relative max-h-64 rounded-md my-2 shadow-lg shadow-sky-900">
          <Image
            source={theme.cover}
            className="absolute inset-0 w-full h-full rounded-md"
            resizeMode="cover"
          />
          <View className="bg-sky-700 opacity-70 absolute inset-0 w-full h-full rounded-md" />

          <View className="py-3 px-4">
            <Text className="text-white font-extrabold text-xl">210</Text>
            <Text className="text-white font-semibold text-sm">Scores</Text>
            <Text className="text-sky-200 font-extrabold">{`${countAllQst} Questions`}</Text>
          </View>
        </View>

        {/* Details Contenu */}
        <View className="mb-2">
          <Text className="text-sky-600 font-bold text-sm pb-2">
            Notions & Contenus
          </Text>
        </View>

        {/* List of Contenus */}
        <FlatList
          data={theme.contents}
          keyExtractor={(item) => `${item._id}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => {
            return (
              <ContentCard
                item={item}
                onPress={() =>
                  props.navigation.navigate("Question", { content: item })
                }
              />
            );
          }}
        />
      </View>
    </Layout>
  );
};

export default Theme;
