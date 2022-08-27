import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { ActivityIndicator, Drawer } from "react-native-paper";
import EntypoIcon from "react-native-vector-icons/Entypo";
import Divider from "../shared/Divider";
import { COLORS, menuItems } from "../constants";
import { UserProfile_DEFAULT } from "../data/images";
import { useTab } from "../context/TabContext";
import { useFirebase } from "../context/FirebaseContext";

const ItemDrawer = ({
  title,
  icon,
  isFocused,
  onPress,
  customStyle,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      className={`flex flex-row space-x-2 items-center my-0.5 ${
        isFocused ? "bg-gray-800 opacity-70" : "bg-transparent"
      } rounded-md py-2 px-2.5`}
      onPress={onPress}
      style={{ ...customStyle }}
    >
      {loading ? (
        <ActivityIndicator animating={true} color={COLORS.primary} />
      ) : (
        <EntypoIcon name={icon} size={22} color={COLORS.primary} />
      )}
      <View>
        <Text className="font-semibold text-gray-50">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DrawerContent = ({ navigation }) => {
  const { currentUser, logout, loading } = useFirebase();
  const { curTab, changeTab } = useTab();

  const onLogout = () => {
    logout();
    navigation.closeDrawer();
  };

  return (
    <View style={{ flex: 1 }} className="p-2 bg-sky-600">
      <DrawerContentScrollView
        scrollEnabled={true}
        contentContainerStyle={{ flex: 1 }}
      >
        {/* Close Button */}
        <View className="items-start justify-center">
          <TouchableOpacity
            className="items-center justify-center"
            onPress={() => navigation.closeDrawer()}
          >
            <EntypoIcon name="cross" size={28} color={"#eee"} />
          </TouchableOpacity>
        </View>

        {/* Profile */}
        <TouchableOpacity
          className="flex-row mt-6 items-center space-x-4"
          onPress={() => console.log("Profile")}
        >
          <Image
            source={UserProfile_DEFAULT}
            className="w-10 h-10 rounded-md"
          />
          <View>
            <Text className="font-semibold text-slate-100 text-base">
              {currentUser?.email}
            </Text>
            <Text className="text-slate-200 text-sm">Score total: 202 pts</Text>
          </View>
        </TouchableOpacity>

        <Divider width={60} customStyle={{ marginTop: 10, marginBottom: 20 }} />

        {menuItems.map((item) => {
          return (
            <ItemDrawer
              key={item.id}
              icon={item.icon}
              title={item.label}
              isFocused={curTab === item.path}
              onPress={() => {
                changeTab(item.path);
                navigation.navigate(item.path);
              }}
            />
          );
        })}

        <ItemDrawer
          icon={"leaf"}
          isFocused={curTab === "Upgrade"}
          title={"Upgrade"}
          onPress={() => {
            changeTab("Upgrade");
            console.log("Upgrade");
          }}
        />

        <Divider width={60} customStyle={{ marginTop: 10, marginBottom: 10 }} />

        <ItemDrawer
          icon={"cog"}
          isFocused={curTab === "Settings"}
          title={"Parametre"}
          onPress={() => {
            changeTab("Settings");
            navigation.navigate("Settings");
          }}
        />
        <ItemDrawer
          icon={"typing"}
          isFocused={curTab === "Contact"}
          title={"Nous contacter"}
          onPress={() => {
            changeTab("Contact");
            navigation.navigate("Contact");
          }}
        />
      </DrawerContentScrollView>

      <Drawer.Section>
        <ItemDrawer
          title={"Se Deconnecter"}
          onPress={onLogout}
          loading={loading}
          icon={"log-out"}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;
