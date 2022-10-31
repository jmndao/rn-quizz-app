import React from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { Switch } from "react-native-paper";
import { useTheme } from "../context/ThemeContext";

const LeftComponent = ({ navigation }) => {
  const { curTheme } = useTheme();
  return (
    <TouchableOpacity
      className="rounded-md p-2 border border-gray-200"
      onPress={() => navigation.navigate("Score")}
    >
      <Ionicons
        name="ios-return-up-back"
        size={26}
        color={curTheme.secondary}
      />
    </TouchableOpacity>
  );
};

const Settings = () => {
  const navigation = useNavigation();

  const { changeTheme, curThemeValue, curTheme } = useTheme();

  return (
    <Layout>
      <View style={{ flex: 1 }}>
        {/* Header  */}
        <Header
          leftComponent={<LeftComponent navigation={navigation} />}
          title={"Parametres"}
        />
        <ScrollView
          style={{ paddingHorizontal: Platform.OS === "ios" ? 10 : 8 }}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        >
          {/*  */}
          <Text
            className="text-base font-semibold"
            style={{ color: curTheme.secondary }}
          >
            Theme {`${curThemeValue === "light" ? "Light" : "Dark"}`}
          </Text>
          <View className="flex-row space-x-3 justify-between items-center py-1 border-b border-gray-400">
            <Text className="text-xl" style={{ color: curTheme.secondary }}>
              Light
            </Text>
            <Switch
              value={curThemeValue === "light" ? true : false}
              onValueChange={changeTheme}
            />
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
};

export default Settings;
