import React from "react";
import {
  Image,
  Platform,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Layout from "../components/Layout";
import { useFirebase } from "../context/FirebaseContext";
import { UserProfile_DEFAULT } from "../data/images";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { ActivityIndicator } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";
import Toast from "react-native-toast-message";

const colorIdx = Math.floor(Math.random() * 7) + 1;

const colors = [
  "#e52165",
  "#0d1137",
  "#d72631",
  "#077b8a",
  "#e2d810",
  "#d9138a",
  "#322e2f",
];

const Profile = () => {
  const { currentUser, updateUser, loading } = useFirebase();

  const { curTheme } = useTheme();

  const [data, setData] = React.useState({
    displayName: currentUser?.displayName ?? "",
    email: currentUser?.email ?? "",
  });

  const handleChange = (input, value) => {
    setData((prev) => ({ ...prev, [input]: value }));
  };

  const onSubmit = async () => {
    await updateUser(currentUser, data);
    showToast();
  };

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "👋 Votre modification a ete prise en charge.",
    });
  };

  const renderProfileImage = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <View
          className="relative w-full h-24"
          style={{ backgroundColor: colors[colorIdx] }}
        >
          <View className="absolute -bottom-10 left-0 right-0 justify-center items-center">
            <Image
              source={currentUser?.photoURL ?? UserProfile_DEFAULT}
              className="w-20 h-20 rounded-full"
              borderRadius={10}
              resizeMethod="auto"
              resizeMode="cover"
            />
          </View>
        </View>
        <View className="py-1.5 mt-10 mb-2">
          <Text
            className="font-semibold text-lg"
            style={{ color: curTheme.secondary }}
          >
            {currentUser?.email}
          </Text>
        </View>
      </View>
    );
  };

  const renderChangeProfile = () => {
    return (
      <View>
        <View className="mt-5">
          <Text
            className="my-1.5 py-1.5 text-lg font-bold"
            style={{ color: curTheme.secondary }}
          >
            Changer Mon Profile
          </Text>

          <View className="flex-row my-4 border-b border-gray-400 pb-2">
            <FontAwesome name="user-o" color={curTheme.primary} size={20} />
            <TextInput
              placeholder={currentUser?.displayName ?? ""}
              className={`pl-2.5 outline-none placeholder-gray-400 ${
                Platform.OS === "ios" ? "mt-0" : "-mt-3"
              }`}
              autoCapitalize="none"
              onChangeText={(val) => handleChange("displayName", val)}
              // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
              style={{ flex: 1, color: curTheme.secondaryHigh }}
            />
            {data?.displayName >= 6 ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
        </View>

        <View className="flex-row my-4 border-b border-gray-400 pb-2">
          <Feather name="at-sign" color={curTheme.primary} size={20} />
          <TextInput
            placeholder={
              currentUser?.isAnonymous
                ? "Utilisateur Anonyme"
                : currentUser.email
            }
            className={`pl-2.5 outline-none placeholder-gray-400 ${
              Platform.OS === "ios" ? "mt-0" : "-mt-3"
            }`}
            autoCapitalize="none"
            onChangeText={(val) => handleChange("email", val)}
            // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            style={{ flex: 1, color: curTheme.secondary }}
          />
          {currentUser?.emailVerified ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>

        <View className="w-full my-4 items-center justify-center rounded-md">
          <TouchableOpacity
            className="w-1/2 items-center justify-center h-auto"
            onPress={onSubmit}
          >
            <LinearGradient
              colors={[curTheme.primary, "#7f1d1d"]}
              className="w-full px-10 items-center justify-center rounded-full shadow-lg"
              style={{ height: Platform.OS === "ios" ? 50 : 35 }}
            >
              {loading ? (
                <ActivityIndicator animating={true} color={"#fff"} />
              ) : (
                <Text
                  className="font-semibold text-base"
                  style={{ color: "#fff" }}
                >
                  Editer
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Layout>
      <View style={{ flex: 1 }}>
        {renderProfileImage()}
        <View className="p-2">{renderChangeProfile()}</View>
      </View>
    </Layout>
  );
};

export default Profile;
