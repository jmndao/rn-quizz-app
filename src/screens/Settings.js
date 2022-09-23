import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { Switch } from "react-native-paper";

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

const Settings = () => {
  const navigation = useNavigation();

  const [isLightThemeOn, setIsLightThemeOn] = React.useState(true);

  const onToggleTheme = () => setIsSwitchOn(!isLightThemeOn);

  return (
    <Layout>
      <View style={{ flex: 1 }} className="p-2">
        {/* Header  */}
        <Header
          leftComponent={<LeftComponent navigation={navigation} />}
          title={"Parametres"}
        />
        <ScrollView
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        >
          {/*  */}
          <Text className="text-gray-800 text-base font-semibold">
            Theme (Non Disponible)
          </Text>
          <View className="flex-row space-x-3 justify-between items-center py-1 border-b border-gray-400">
            <Text className="text-xl text-gray-800">Light</Text>
            <Switch
              value={isLightThemeOn}
              disabled={true}
              onValueChange={onToggleTheme}
            />
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
};

export default Settings;
