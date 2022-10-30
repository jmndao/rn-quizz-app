import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../../../constants";
import { useTheme } from "../../../context/ThemeContext";

const QuizzItem = ({ answer, validateAnswer }) => {
  const selected = React.useRef(false);

  const { curTheme } = useTheme();

  const renderBorderColor = () => {
    if (selected.current) {
      return answer.isCorrect ? COLORS.success : COLORS.error;
    }
    return COLORS.secondary + "40";
  };

  const renderBgColor = () => {
    if (selected.current) {
      return answer.isCorrect ? COLORS.success + "20" : COLORS.error + "20";
    }
    return COLORS.secondary + "20";
  };

  const renderCrossOrCheck = () => {
    return answer.isCorrect ? (
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 30 / 2,
          backgroundColor: COLORS.success,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="check"
          style={{
            color: COLORS.white,
            fontSize: 20,
          }}
        />
      </View>
    ) : (
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 30 / 2,
          backgroundColor: COLORS.error,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="close"
          style={{
            color: COLORS.white,
            fontSize: 20,
          }}
        />
      </View>
    );
  };

  const handleValidation = () => {
    selected.current = true;
    validateAnswer(answer);
  };

  return (
    <TouchableOpacity
      onPress={handleValidation}
      style={{
        borderWidth: 2,
        borderColor: renderBorderColor(),
        backgroundColor: renderBgColor(),
        height: "auto",
        minHeight: Platform.OS === "ios" ? 60 : 40,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: Platform.OS === "ios" ? 18 : 10,
        marginVertical: 10,
      }}
    >
      <Text
        style={{
          color: curTheme.secondary,
          fontSize: Platform.OS === "ios" ? 14 : 12,
        }}
      >
        {answer.option}
      </Text>

      {/* Show Check Or Cross Icon based on correct answer*/}
      {selected.current ? renderCrossOrCheck() : null}
    </TouchableOpacity>
  );
};

export default QuizzItem;
