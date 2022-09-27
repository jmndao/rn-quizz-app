import React from "react";
import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
// Screens Import
import Score from "../screens/Score";
import Settings from "../screens/Settings";
import Articles from "../screens/Articles";
//
import DrawerContent from "../components/DrawerContent";
//
import Home from "../screens/Home";
import Theme from "../screens/Theme";
import Question from "../screens/Question";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Profile from "../screens/Profile";
import { useFirebase } from "../context/FirebaseContext";
import DetailScore from "../screens/DetailScore";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
//

const HomeStackNavigator = () => {
  const { currentUser } = useFirebase();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Accueil"
    >
      {currentUser ? (
        <>
          <Stack.Screen name="Accueil" component={Home} />
          <Stack.Screen name="Theme" component={Theme} />
          <Stack.Screen name="Question" component={Question} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Parametre" component={Settings} />
          <Stack.Screen name="Detail" component={DetailScore} />
        </>
      ) : (
        <>
          <Stack.Screen name="Connexion" component={Login} />
          <Stack.Screen name="Compte" component={Register} />
        </>
      )}
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
        <Drawer.Screen name="Articles" component={Articles} />
        <Drawer.Screen name="Parametre" component={Settings} />
        <Drawer.Screen name="Score" component={Score} />
      </Drawer.Navigator>
    </View>
  );
};

export { DrawerNavigator };
