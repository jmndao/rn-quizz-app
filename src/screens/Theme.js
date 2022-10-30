import React from "react";
import {
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ContentCard from "../components/ContentCard";
import Header from "../components/Header";
import Layout from "../components/Layout";
import SubHeader from "../components/SubHeader";
import ResponsableProfessionelImg from "../data/images/responsable-du-professionel.jpg";
import ControleQualiteImg from "../data/images/ControleQualite.jpg";
import ExerciceProfessionImg from "../data/images/exercice-de-la-profession.jpg";
import EthiqueDeontologieImg from "../data/images/ethique-et-deontologie.jpeg";
import { useFirebase } from "../context/FirebaseContext";
import { useTheme } from "../context/ThemeContext";

const images = {
  ResponsableProfessionel: ResponsableProfessionelImg,
  ControleQualite: ControleQualiteImg,
  ExerciceProfession: ExerciceProfessionImg,
  EthiqueDeontologie: EthiqueDeontologieImg,
};

const LeftComponent = ({ navigation }) => {
  return (
    <TouchableOpacity
      className="rounded-md p-2 border border-slate-200"
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="ios-return-up-back" size={26} color="#334155" />
    </TouchableOpacity>
  );
};

const Theme = (props) => {
  const { curTheme, setTrackingScore } = useFirebase();

  const { curTheme: styleCurTheme } = useTheme();

  let totalScore = 0;
  curTheme.notions.forEach((notion) => {
    totalScore += notion.qa.reduce((prev, cur) => prev + cur.score, 0);
  });

  let totalQuestions = curTheme.notions.reduce(
    (prev, cur) => prev + cur.qa.length,
    0
  );

  const initTracking = (id, notion) => {
    let title = curTheme.title;
    let slug = curTheme.slug;
    setTrackingScore({ id, title, totalScore, slug, notion });
  };

  return (
    <Layout>
      <Header
        leftComponent={<LeftComponent navigation={props.navigation} />}
        title={""}
      />
      <View style={{ flex: 1 }} className="py-2 px-3">
        {/* SubHeader */}
        <SubHeader title={curTheme.title ?? "Theme"} />

        {/* Description */}
        <View className="mb-2">
          <Text
            className="font-bold text-sm pb-2"
            style={{ color: styleCurTheme.primary }}
          >
            Sens & Portee d'etude
          </Text>
          <Text
            style={{
              fontSize: Platform.OS === "ios" ? 14 : 12,
              color: styleCurTheme.secondary,
            }}
          >
            {curTheme.description ?? "Description courte du theme."}
          </Text>
        </View>

        {/* Image Card */}
        <View
          className="relative rounded-md my-2 shadow-lg shadow-sky-900"
          style={{ maxHeight: Platform.OS === "ios" ? 256 : 180 }}
        >
          <Image
            source={images[curTheme.imageUrl]}
            className="absolute inset-0 w-full h-full rounded-md"
            resizeMode="cover"
          />
          <View
            className="opacity-60 absolute inset-0 w-full h-full rounded-md"
            style={{ backgroundColor: styleCurTheme.primary }}
          />

          <View className="py-3 px-4">
            <Text
              className="font-extrabold text-xl"
              style={{ color: styleCurTheme.neutral }}
            >
              {totalScore}
            </Text>
            <Text
              className="font-semibold text-sm"
              style={{ color: styleCurTheme.neutral }}
            >
              Scores
            </Text>
            <Text className="text-red-200 font-extrabold">{`${
              totalQuestions ?? 0
            } Questions`}</Text>
          </View>
        </View>

        {/* Details Contenu */}
        <View className="mb-2">
          <Text
            className="font-bold text-sm pb-2"
            style={{ color: styleCurTheme.primary }}
          >
            Notions & Contenus ({curTheme.notions.length ?? 0})
          </Text>
        </View>

        {/* List of Contenus */}
        <FlatList
          data={curTheme.notions}
          keyExtractor={(item) => `${item.id}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => {
            return (
              <ContentCard
                item={item}
                onPress={() => {
                  initTracking(item.id, item.title);
                  props.navigation.navigate("Question", { content: item });
                }}
              />
            );
          }}
        />
      </View>
    </Layout>
  );
};

export default Theme;
