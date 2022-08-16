import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import Layout from "../components/Layout";

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

const CustomButton = ({ onPress, label, btnStyle, labelStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...btnStyle,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ ...labelStyle, fontWeight: "bold" }}>{label}</Text>
    </TouchableOpacity>
  );
};

const Result = (props) => {
  return (
    <Layout>
      <View style={{ flex: 1 }} className="bg-white px-3 py-2">
        {/* Header */}
        <Header
          leftComponent={<LeftComponent navigation={props.navigation} />}
          title={`Ethique & Deontologie`}
        />
        <View style={{ flex: 1 }} className="items-center justify-center ">
          <FontAwesome name="legal" size={50} color={"#334155"} />
          <Text className="text-xl font-bold tracking-wide leading-relaxed">
            Total Reponses 12/30
          </Text>
          <Text className="text-3xl font-extrabold text-sky-700">
            Score: 209 pts
          </Text>
          {/*  */}
          <View className="flex-row w-full items-center justify-around space-x-3 mt-20">
            <CustomButton
              label={"Recommencer"}
              onPress={() => console.log("Recommencer")}
              labelStyle={{
                color: "#0369A1",
              }}
            />
            <CustomButton
              label={"Enregistrer"}
              onPress={() => console.log("Enregistrer")}
              btnStyle={{
                borderRadius: 12,
                backgroundColor: "#0369A1",
              }}
              labelStyle={{
                color: "white",
              }}
            />
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default Result;
