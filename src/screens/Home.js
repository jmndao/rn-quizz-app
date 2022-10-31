import React from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import ThemeCard from "../components/ThemeCard";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import { useFirebase } from "../context/FirebaseContext";
import Loading from "../components/Loading";
import { useTheme } from "../context/ThemeContext";

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
  const { themes, loading, fetchThemes, setCurTheme } = useFirebase();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchThemes();
    setRefreshing(false);
  }, [fetchThemes]);

  const { curTheme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: curTheme.neutral }}>
      {/* Header */}
      <Header
        leftComponent={<LeftComponent navigation={props.navigation} />}
        title={props.route.name}
      />

      <View className="w-full px-3 py-2" style={{ flex: 1 }}>
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={themes}
            keyExtractor={(item) => `${item.slug}`}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => {
              return (
                <ThemeCard
                  item={item}
                  onPress={() => {
                    setCurTheme(item);
                    props.navigation.navigate("Theme", { theme: item.slug });
                  }}
                />
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
