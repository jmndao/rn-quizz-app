import React from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants";
import { UserProfile_DEFAULT } from "../../data/images";

const Header = ({ leftComponent, title }) => {
  return (
    <View className="flex-row py-1 items-center justify-between my-2">
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
      <TouchableOpacity onPress={() => console.log("Profile")}>
        <Image source={UserProfile_DEFAULT} className="w-8 h-8 rounded-md" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
