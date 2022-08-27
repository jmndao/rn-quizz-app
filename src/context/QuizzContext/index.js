import React from "react";
import { Animated, View } from "react-native";
import { COLORS } from "../../constants";

const QuizzContext = React.createContext(null);

const QuizzProvider = ({ children }) => {
  const [qstLength, setQstLength] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = React.useState(0);
  const [showScoreModal, setShowScoreModal] = React.useState(false);
  const [progress] = React.useState(new Animated.Value(0));

  const handleNext = () => {
    if (currentQuestionIdx == qstLength - 1) {
      // Show Score Modal
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIdx + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const restartQuizz = () => {
    setShowScoreModal(false);

    setCurrentQuestionIdx(0);
    setScore(0);

    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const addScore = (val) => setScore((prev) => prev + val);

  const progressAnim = progress.interpolate({
    inputRange: [0, qstLength],
    outputRange: ["0%", "100%"],
  });

  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 14,
          borderRadius: 14,
          backgroundColor: "#00000020",
        }}
      >
        <Animated.View
          style={[
            {
              height: 14,
              borderRadius: 14,
              backgroundColor: COLORS.accent,
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };

  return (
    <QuizzContext.Provider
      value={{
        score,
        currentQuestionIdx,
        showScoreModal,
        progress,
        handleNext,
        addScore,
        restartQuizz,
        setQstLength,
        renderProgressBar,
      }}
    >
      {children}
    </QuizzContext.Provider>
  );
};

export default QuizzProvider;
export const useQuizz = () => React.useContext(QuizzContext);