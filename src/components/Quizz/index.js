import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
} from "react-native";
import { COLORS } from "../../constants";
import { useFirebase } from "../../context/FirebaseContext";
import { useQuizz } from "../../context/QuizzContext";
import QuizzItem from "./QuizzItem";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";

const Quizz = ({ questions, nav }) => {
  const {
    handleNext,
    restartQuizz,
    setShowScoreModal,
    score,
    addScore,
    showScoreModal,
    currentQuestionIdx,
    setQstLength,
  } = useQuizz();

  const { trackingScore, setTrackingScore, loading, saveScore } = useFirebase();

  const [countSelected, setCountSelected] = React.useState(0);

  const totalScore = questions.reduce((prev, cur) => prev + cur.score, 0);

  const { curTheme } = useTheme();

  const renderQuestion = () => {
    return (
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
        }}
      >
        {/* Question Counter */}
        <View className="flex-row items-end">
          <Text
            className="mr-2"
            style={{
              color: curTheme.secondary,
              fontSize: Platform.OS === "ios" ? 18 : 14,
            }}
          >
            {currentQuestionIdx + 1}
          </Text>
          <Text className="text-gray-800 mr-2">/ {questions.length}</Text>
        </View>

        {/* Question */}
        <Text
          style={{
            color: curTheme.secondaryHigh,
            fontSize: Platform.OS === "ios" ? 16 : 12,
          }}
        >
          {questions[currentQuestionIdx]?.question}
        </Text>
      </View>
    );
  };

  const validateAnswer = (answer) => {
    let curQst = questions[currentQuestionIdx];
    let checked = false;

    curQst.answers.forEach((ans) => {
      if (ans.id === answer.id) {
        checked = true;
      }

      setTrackingScore((prev) => ({
        ...prev,
        totalScore,
        answers: {
          [ans.id]: {
            ...ans,
            checked,
            question: questions[currentQuestionIdx].question,
            questionIdx: currentQuestionIdx,
          },
          ...prev?.answers,
        },
      }));
    });

    setCountSelected((prev) => prev + 1);
    if (answer.isCorrect) {
      addScore(Math.floor(curQst?.score / curQst?.isCorrectCount));
    }
  };

  const renderAnswers = () => {
    return (
      <View>
        {questions[currentQuestionIdx].answers.map((answer) => (
          <QuizzItem
            key={answer.id}
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
          backgroundColor: curTheme.primary,
          padding: Platform.OS === "ios" ? 8 : 6,
        }}
        className="mt-5 rounded-full shadow-md"
      >
        <Text className="text-lg text-center" style={{ color: "#fff" }}>
          Suivant
        </Text>
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
    setQstLength(questions.length);
  }, []);

  React.useEffect(() => {
    if (countSelected === questions[currentQuestionIdx].isCorrectCount) {
      setTimeout(() => {
        handleNext();
      }, 100);
      setCountSelected(0);
    }
  }, [currentQuestionIdx, countSelected]);

  return (
    <ScrollView
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: curTheme.neutral,
        position: "relative",
      }}
      contentContainerStyle={{
        paddingBottom: 40,
        paddingHorizontal: 8,
      }}
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
            backgroundColor: curTheme.primary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: curTheme.neutral,
              width: "90%",
              borderRadius: 20,
              padding: 20,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: curTheme.secondary,
              }}
            >
              {score > totalScore / 2 ? "Felicitations !" : "Oops!"}
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
                  fontWeight: "600",
                  fontSize: Platform.OS === "ios" ? 46 : 30,
                  color: score > totalScore / 2 ? COLORS.success : COLORS.error,
                }}
              >
                {score}
              </Text>
              <Text
                style={{
                  fontSize: Platform.OS === "ios" ? 26 : 20,
                  color: curTheme.secondary,
                }}
              >
                / {totalScore}
              </Text>
            </View>
            {/* Retry Quiz button */}
            <View className="flex flex-row space-x-2 w-11/12">
              <TouchableOpacity
                onPress={restartQuizz}
                style={{
                  backgroundColor: curTheme.primary,
                  padding: 10,
                }}
                className="rounded-full w-1/2 shadow-md"
              >
                <Text className="text-neutral-50 text-sm text-center whitespace-nowrap font-bold">
                  Recommencer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  saveScore(score, nav.navigate, restartQuizz);
                }}
                style={{
                  backgroundColor: curTheme.secondaryHigh,
                  padding: 10,
                }}
                className="rounded-full shadow-md w-1/2 flex flex-row justify-center items-center space-x-2"
              >
                {loading ? (
                  <ActivityIndicator animating={true} color={COLORS.primary} />
                ) : (
                  <Text
                    className="text-sm text-center whitespace-nowrap font-bold"
                    style={{ color: curTheme.neutral }}
                  >
                    Enregistrer
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Quizz;
