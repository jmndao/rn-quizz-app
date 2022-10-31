import React from "react";
import ResponsableProfessionelImg from "../../data/images/responsable-du-professionel.jpg";
import ControleQualiteImg from "../../data/images/ControleQualite.jpg";
import ExerciceProfessionImg from "../../data/images/exercice-de-la-profession.jpg";
import EthiqueDeontologieImg from "../../data/images/ethique-et-deontologie.jpeg";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const images = {
  ResponsableProfessionel: ResponsableProfessionelImg,
  ControleQualite: ControleQualiteImg,
  ExerciceProfession: ExerciceProfessionImg,
  EthiqueDeontologie: EthiqueDeontologieImg,
};

const ThemeCard = ({ item, onPress }) => {
  const { curTheme } = useTheme();

  return item.notions && item.notions.length > 0 ? (
    <TouchableOpacity
      onPress={onPress}
      className="relative mb-3 shadow-lg shadow-red-400 rounded-2xl h-40"
      style={{ backgroundColor: curTheme.secondary }}
    >
      <Image
        source={images[item.imageUrl]}
        resizeMode="cover"
        className="rounded-2xl w-full h-full"
      />

      {/* View Dark Layer */}
      <View
        className="absolute inset-0 w-full h-full rounded-2xl opacity-70"
        style={{ backgroundColor: curTheme.secondary }}
      />

      {/* Content Layer */}
      <View className="absolute inset-0 w-full h-full px-1.5 py-2 z-10">
        {/* Title */}
        <View style={{ alignItems: "flex-end" }}>
          <View
            className="h-auto w-auto rounded-full px-4 py-0.5"
            style={{ backgroundColor: curTheme?.primary }}
          >
            <Text
              className="text-sm font-semibold"
              style={{ color: curTheme.secondary }}
            >
              {item.title}
            </Text>
          </View>
        </View>
        {/* Description */}
        <View className="mt-2.5 mb-1">
          <Text
            className="tracking-wide leading-relaxed"
            style={{ color: curTheme.neutral }}
          >
            {item.description}
          </Text>
        </View>
        {/* Divider */}
        <View className="w-1/6 h-px bg-gray-400 rounded-md my-1" />
        {/* Bottom Section */}
        <View className="flex-row space-x-1 items-end mt-1.5">
          <Text className="font-extrabold" style={{ color: curTheme.neutral }}>
            Notions & Contenus: {item.notions.length}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <View
      className="relative mb-3 shadow-lg shadow-sky-400 rounded-2xl h-40"
      style={{ backgroundColor: curTheme.secondary }}
    >
      <Image
        source={images[item.imageUrl]}
        resizeMode="cover"
        className="rounded-2xl w-full h-full"
      />

      {/* View Dark Layer */}
      <View
        className="absolute inset-0 w-full h-full rounded-2xl opacity-70"
        style={{ backgroundColor: curTheme.secondary }}
      />

      {/* Content Layer */}
      <View className="absolute inset-0 w-full h-full px-1.5 py-2 z-10">
        {/* Title */}
        <View style={{ alignItems: "flex-end" }}>
          <View
            className="h-auto w-auto rounded-full px-4 py-0.5"
            style={{ backgroundColor: curTheme?.primary }}
          >
            <Text
              className="text-sm font-semibold"
              style={{ color: curTheme.secondary }}
            >
              {item.title}
            </Text>
          </View>
        </View>
        {/* Description */}
        <View className="mt-2.5 mb-1">
          <Text
            className="tracking-wide leading-relaxed"
            style={{ color: curTheme.neutral }}
          >
            {item.description}
          </Text>
        </View>
        {/* Divider */}
        <View className="w-1/6 h-px bg-slate-500 rounded-md my-1" />
        {/* Bottom Section */}
        <View className="flex-row space-x-1 items-end mt-1.5">
          <Text className="font-extrabold" style={{ color: curTheme.neutral }}>
            Pas de Contenu !
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ThemeCard;
