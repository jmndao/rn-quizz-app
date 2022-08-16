import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { UserProfile_DEFAULT } from "../../data/images";

const Header = ({ leftComponent, title }) => {
  return (
    <View className="flex-row py-1 items-center justify-between mb-2">
      {/* Custom Open Drawer */}
      {leftComponent}

      {/* Title */}
      <View>
        <Text className="text-xl font-bold text-sky-600">{title}</Text>
      </View>

      {/* Profile Button */}
      <TouchableOpacity onPress={() => console.log("Profile")}>
        <Image source={UserProfile_DEFAULT} className="w-10 h-10 rounded-md" />{" "}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
