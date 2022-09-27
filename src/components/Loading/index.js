import { View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { COLORS } from "../../constants";

const Loading = () => {
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
        color={COLORS.accent}
      />
    </View>
  );
};

export default Loading;
