import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../../../constants";

const QuizzItem = ({ answer, validateAnswer }) => {
  const selected = React.useRef(false);

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
        borderWidth: 3,
        borderColor: renderBorderColor(),
        backgroundColor: renderBgColor(),
        height: 60,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginVertical: 10,
      }}
    >
      <Text className="text-gray-800 text-lg">{answer.option}</Text>

      {/* Show Check Or Cross Icon based on correct answer*/}
      {selected.current ? renderCrossOrCheck() : null}
    </TouchableOpacity>
  );
};

export default QuizzItem;
