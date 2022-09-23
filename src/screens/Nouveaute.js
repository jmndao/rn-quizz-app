import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { COLORS } from "../constants";
import { useTab } from "../context/TabContext";

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

const Nouveaute = () => {
  const navigation = useNavigation();

  return (
    <Layout>
      <View className="p-2">
        {/* Header  */}
        <Header
          leftComponent={<LeftComponent navigation={navigation} />}
          title={"Nouveaute"}
        />
      </View>
      <View
        className="p-2"
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Entypo name="new" size={40} color={COLORS.secondary} />
        <Text className="text-gray-800 font-light text-center text-3xl py-1.5">
          There is no new content for the moment.
        </Text>
      </View>
    </Layout>
  );
};

export default Nouveaute;
