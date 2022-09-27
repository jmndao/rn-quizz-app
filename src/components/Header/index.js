import React from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserProfile_DEFAULT } from "../../data/images";
import { COLORS } from "../../constants";

const Header = ({ leftComponent, title }) => {
  const navigation = useNavigation();

  return (
    <View className="flex-row py-1.5 px-2 items-center justify-between mt-2 mb-4 border-b border-gray-300 shadow-md shadow-gray-800">
      <StatusBar barStyle="light-content" backgroundColor={COLORS.accent} />

      {/* Custom Open Drawer */}
      {leftComponent}

      {/* Title */}
      <View className="text-center flex-1">
        <Text className="text-lg font-bold text-sky-600 break-words text-center">
          {title}
        </Text>
      </View>

      {/* Profile Button */}
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Image source={UserProfile_DEFAULT} className="w-8 h-8 rounded-md" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
