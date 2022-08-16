import { View } from "react-native";
import React from "react";

const Divider = ({ width = 50, customStyle }) => {
  return (
    <View
      className="h-px bg-slate-300"
      style={{ width: `${width}%`, ...customStyle }}
    />
  );
};

export default Divider;
