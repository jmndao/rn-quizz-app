import React from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { COLORS } from "../../constants";
import { useQuizz } from "../../context/QuizzContext";
import QuizzItem from "./QuizzItem";

const Quizz = ({ questions }) => {
  const {
    handleNext,
    restartQuizz,
    score,
    addScore,
    showScoreModal,
    currentQuestionIdx,
    setQstLength,
  } = useQuizz();

  const [countSelected, setCountSelected] = React.useState(0);

  const renderQuestion = () => {
    return (
      <View
        style={{
          marginVertical: 20,
        }}
      >
        {/* Question Counter */}
        <View className="flex-row items-end">
          <Text className="text-gray-600 text-lg opacity-60 mr-2">
            {currentQuestionIdx + 1}
          </Text>
          <Text className="text-gray-800 opacity-60 mr-2">
            / {questions.length}
          </Text>
        </View>

        {/* Question */}
        <Text className="text-gray-800 text-xl">
          {questions[currentQuestionIdx]?.question}
        </Text>
      </View>
    );
  };

  const validateAnswer = (answer) => {
    setCountSelected((prev) => prev + 1);
    if (answer.isCorrect) {
      addScore(1);
    }
  };

  const renderAnswers = () => {
    return (
      <View>
        {questions[currentQuestionIdx].answers.map((answer) => (
          <QuizzItem
            key={answer._id}
            answer={answer}
            validateAnswer={validateAnswer}
          />
        ))}
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <TouchableOpacity
        onPress={handleNext}
        style={{
          width: "100%",
          backgroundColor: COLORS.accent,
          padding: 10,
        }}
        className="mt-5 rounded-lg"
      >
        <Text className="text-neutral-50 text-lg text-center">Suivant</Text>
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
    //   Set questions length to higher component
    setQstLength(questions.length);
  }, []);

  React.useEffect(() => {
    if (countSelected === questions[currentQuestionIdx].goodAnswers) {
      setTimeout(() => {
        handleNext();
      }, 100);
      setCountSelected(0);
    }
  }, [currentQuestionIdx, countSelected]);

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 8,
        backgroundColor: "transparent",
        position: "relative",
      }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Question */}
      {renderQuestion()}

      {/* Options */}
      {renderAnswers()}

      {/* Next Button */}
      {renderNextButton()}

      {/* Score Modal */}
      <Modal animationType="slide" transparent={true} visible={showScoreModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.accent,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.white,
              width: "90%",
              borderRadius: 20,
              padding: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              {score > questions.length / 2 ? "Felicitations !" : "Oops!"}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  color:
                    score > questions.length / 2
                      ? COLORS.success
                      : COLORS.error,
                }}
              >
                {score}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: COLORS.black,
                }}
              >
                / {questions.length}
              </Text>
            </View>
            {/* Retry Quiz button */}
            <TouchableOpacity
              onPress={restartQuizz}
              style={{
                backgroundColor: COLORS.accent,
                padding: 20,
                width: "100%",
              }}
              className="rounded-md"
            >
              <Text className="text-neutral-50 text-lg text-center">
                Recommencer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Quizz;
