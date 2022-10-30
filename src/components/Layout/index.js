import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import EntypoIcon from "react-native-vector-icons/Entypo";
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useTab } from "../../context/TabContext";
import { useTheme } from "../../context/ThemeContext";

const TabButton = ({ label, icon, onPress }) => {
  const route = useRoute();

  const { curTheme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EntypoIcon
          name={icon}
          size={Platform.OS === "ios" ? 22 : 18}
          color={route.name === label ? curTheme.primary : curTheme.secondary}
        />
        <Text
          style={{
            fontSize: 10,
            color: route.name === label ? curTheme.primary : curTheme.secondary,
          }}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Layout = ({ children }) => {
  const navigation = useNavigation();
  const { changeTab } = useTab();

  const { curTheme } = useTheme();

  const navigate = (path) => {
    changeTab(path);
    navigation.navigate(path);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: curTheme.neutral }}
      className="relative w-full"
    >
      {children}
      {/* Bottom Tabs */}
      <View
        style={{
          height: Platform.OS === "ios" ? 70 : 50,
        }}
        className="absolute bottom-0 left-0 w-full"
      >
        {/* Linear Gradient Here */}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 4 }}
          colors={["transparent", "rgba(0, 0, 0, 0.7)"]}
          style={{
            position: "absolute",
            top: -10,
            left: 0,
            right: 0,
            height: Platform.OS === "ios" ? 70 : 50,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        />

        {/* Tabs */}
        <View
          style={{ flex: 1, backgroundColor: curTheme.neutral }}
          className="flex-row justify-around p-1 rounded-t-3xl shadow-xl shadow-neutral-700"
        >
          <TabButton
            label={"Accueil"}
            icon={"home"}
            onPress={() => navigate("Accueil")}
          />

          <TabButton
            label={"Score"}
            icon={"flag"}
            onPress={() => navigate("Score")}
          />

          <TabButton
            label={"Articles"}
            icon={"new"}
            onPress={() => navigation.navigate("Articles")}
          />

          <TabButton
            label={"Parametre"}
            icon={"cog"}
            onPress={() => navigate("Parametre")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Layout;
