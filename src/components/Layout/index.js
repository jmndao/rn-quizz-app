import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TabButton = ({ label, icon, isFocused, onPress }) => {
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
          size={22}
          color={isFocused ? "#0369A1" : "#1E293B"}
        />
        <Text
          className={`${isFocused ? "text-sky-700" : "text-slate-800"} text-sm`}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Layout = ({ children }) => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }} className="relative w-full">
      {children}
      {/* Bottom Tabs */}
      <View
        style={{
          height: 100,
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
            height: 100,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        />

        {/* Tabs */}
        <View
          style={{ flex: 1 }}
          className="flex-row justify-around p-5 rounded-t-3xl shadow-xl shadow-neutral-700 bg-white"
        >
          <TabButton
            label={"Accueil"}
            icon={"home"}
            isFocused={true}
            onPress={() => navigation.navigate("Accueil")}
          />

          <TabButton
            label={"Score"}
            icon={"flag"}
            isFocused={false}
            onPress={() => navigation.navigate("Score")}
          />

          <TabButton
            label={"Nouveaute"}
            icon={"new"}
            isFocused={false}
            onPress={() => navigation.navigate("Nouveaute")}
          />

          <TabButton
            label={"Parametre"}
            icon={"cog"}
            isFocused={false}
            onPress={() => navigation.navigate("Settings")}
          />
        </View>
      </View>
    </View>
  );
};

export default Layout;
