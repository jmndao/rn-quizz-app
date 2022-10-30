import { View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";

const Loading = () => {
  const { curTheme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator
        animating={true}
        size={"large"}
        color={curTheme.primary}
      />
    </View>
  );
};

export default Loading;
