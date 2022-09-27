import React from "react";
import ResponsableProfessionelImg from "../../data/images/responsable-du-professionel.jpg";
import ControleQualiteImg from "../../data/images/ControleQualite.jpg";
import ExerciceProfessionImg from "../../data/images/exercice-de-la-profession.jpg";
import EthiqueDeontologieImg from "../../data/images/ethique-et-deontologie.jpeg";
import { Text, TouchableOpacity, Image, View } from "react-native";

const images = {
  ResponsableProfessionel: ResponsableProfessionelImg,
  ControleQualite: ControleQualiteImg,
  ExerciceProfession: ExerciceProfessionImg,
  EthiqueDeontologie: EthiqueDeontologieImg,
};

const ThemeCard = ({ item, onPress }) => {
  return item.notions && item.notions.length > 0 ? (
    <TouchableOpacity
      onPress={onPress}
      className="relative mb-3 bg-slate-50 shadow-lg shadow-sky-400 rounded-md h-40"
    >
      <Image
        source={images[item.imageUrl]}
        resizeMode="cover"
        className="rounded-md w-full h-full"
      />

      {/* View Dark Layer */}
      <View className="absolute inset-0 w-full h-full rounded-md bg-black opacity-70" />

      {/* Content Layer */}
      <View className="absolute inset-0 w-full h-full px-1.5 py-2 z-10">
        {/* Title */}
        <View style={{ alignItems: "flex-end" }}>
          <Text
            className="text-white text-sm font-semibold bg-sky-600 rounded-full px-4 py-0.5"
            style={{ borderRadius: "50%" }}
          >
            {item.title}
          </Text>
        </View>
        {/* Description */}
        <View className="mt-2.5 mb-1">
          <Text className="text-slate-100 tracking-wide leading-relaxed">
            {item.description}
          </Text>
        </View>
        {/* Divider */}
        <View className="w-1/6 h-px bg-slate-500 rounded-md my-1" />
        {/* Bottom Section */}
        <View className="flex-row space-x-1 items-end mt-1.5">
          <Text className="text-white font-extrabold">
            Notions & Contenus: {item.notions.length}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <View className="relative mb-3 bg-slate-50 shadow-lg shadow-sky-400 rounded-md h-40">
      <Image
        source={images[item.imageUrl]}
        resizeMode="cover"
        className="rounded-md w-full h-full"
      />

      {/* View Dark Layer */}
      <View className="absolute inset-0 w-full h-full rounded-md bg-black opacity-70" />

      {/* Content Layer */}
      <View className="absolute inset-0 w-full h-full px-1.5 py-2 z-10">
        {/* Title */}
        <View style={{ alignItems: "flex-end" }}>
          <Text className="text-white text-sm font-semibold bg-sky-600 rounded-full px-4 py-0.5">
            {item.title}
          </Text>
        </View>
        {/* Description */}
        <View className="mt-2.5 mb-1">
          <Text className="text-slate-100 tracking-wide leading-relaxed">
            {item.description}
          </Text>
        </View>
        {/* Divider */}
        <View className="w-1/6 h-px bg-slate-500 rounded-md my-1" />
        {/* Bottom Section */}
        <View className="flex-row space-x-1 items-end mt-1.5">
          <Text className="text-white font-extrabold">Pas de Contenu !</Text>
        </View>
      </View>
    </View>
  );
};

export default ThemeCard;
