import React from "react";
import { FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import ThemeCard from "../components/ThemeCard";
import { themes } from "../data";
import AntDesignIcons from "react-native-vector-icons/AntDesign";

const LeftComponent = ({ navigation }) => {
  return (
    <TouchableOpacity
      className="rounded-md p-2 border border-slate-200"
      onPress={() => navigation.openDrawer()}
    >
      <AntDesignIcons name="menu-fold" size={22} color="#334155" />
    </TouchableOpacity>
  );
};

const Home = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white py-2 px-1">
      {/* Header */}
      <Header
        leftComponent={<LeftComponent navigation={props.navigation} />}
        title={props.route.name}
      />

      <FlatList
        data={themes}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => {
          return (
            <ThemeCard
              item={item}
              onPress={() =>
                props.navigation.navigate("Theme", { theme: item })
              }
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
