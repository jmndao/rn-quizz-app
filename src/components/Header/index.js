import React from "react";
import {
  Image,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserProfile_DEFAULT } from "../../data/images";
import { useTheme } from "../../context/ThemeContext";

const Header = ({ leftComponent, title }) => {
  const navigation = useNavigation();

  const { curTheme } = useTheme();

  const ellipsis = (str) => {
    return str.length > 24 ? str.substring(0, 24) + "..." : str;
  };

  return (
    <View className="flex-row py-1.5 px-2 items-center justify-between mb-4 border-b border-gray-300 shadow-md shadow-gray-800">
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        backgroundColor={curTheme?.primary}
      />

      {/* Custom Open Drawer */}
      {leftComponent}

      {/* Title */}
      <View className="text-center flex-1">
        <Text
          className="text-lg font-bold text-center"
          style={{
            color: curTheme.primary,
            fontSize: Platform.OS === "ios" ? 18 : 14,
          }}
        >
          {ellipsis(title)}
        </Text>
      </View>

      {/* Profile Button */}
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Image
          source={UserProfile_DEFAULT}
          className="w-8 h-8 rounded-md"
          style={{ tintColor: curTheme.secondary }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
