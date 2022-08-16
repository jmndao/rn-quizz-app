import React from "react";
import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
// Screens Import
import Score from "../screens/Score";
import Settings from "../screens/Settings";
import Nouveaute from "../screens/Nouveaute";
//
import DrawerContent from "../components/DrawerContent";
//
import Home from "../screens/Home";
import Theme from "../screens/Theme";
import Question from "../screens/Question";
import Result from "../screens/Result";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
//

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Accueil"
    >
      <Stack.Screen name="Accueil" component={Home} />
      <Stack.Screen name="Theme" component={Theme} />
      <Stack.Screen name="Question" component={Question} />
      <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
      className="bg-sky-500"
    >
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Layout"
        drawerContent={(props) => {
          return <DrawerContent navigation={props.navigation} />;
        }}
      >
        <Drawer.Screen name="Home" component={HomeStackNavigator} />
        <Drawer.Screen name="Nouveaute" component={Nouveaute} />
        <Drawer.Screen name="Parametre" component={Settings} />
        <Drawer.Screen name="Score" component={Score} />
      </Drawer.Navigator>
    </View>
  );
};

export { DrawerNavigator };
