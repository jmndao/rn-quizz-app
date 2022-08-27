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
import { COLORS } from "../constants";
import { ActivityIndicator } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const Profile = () => {
  const { currentUser, updateUser, loading } = useFirebase();

  const [data, setData] = React.useState({
    displayName: currentUser?.displayName ?? "",
    email: currentUser?.email ?? "",
  });

  const handleChange = (input, value) => {
    setData((prev) => ({ ...prev, [input]: value }));
  };

  const onSubmit = () => {
    updateUser(currentUser, data);
  };

  const renderProfileImage = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <View
          className="relative w-full h-24"
          style={{ backgroundColor: COLORS.accent }}
        >
          <View className="absolute -bottom-10 left-0 right-0 justify-center items-center">
            <Image
              source={currentUser?.photoURL ?? UserProfile_DEFAULT}
              className="w-20 h-20 rounded-full"
              blurRadius={10}
              resizeMethod="auto"
              resizeMode="cover"
            />
          </View>
        </View>
        <View className="py-1.5 mt-10 mb-2">
          <Text className="font-semibold text-lg text-sky-600">
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
          <Text className="my-1.5 py-1.5 text-lg font-bold text-gray-800">
            Changer Mon Profile
          </Text>

          <View className="flex-row my-4 border-b border-gray-800 pb-2">
            <FontAwesome name="user-o" color={COLORS.accent} size={20} />
            <TextInput
              placeholder={currentUser?.displayName ?? ""}
              className={`pl-2.5 text-sky-600 outline-none placeholder-gray-700 ${
                Platform.OS === "ios" ? "mt-0" : "-mt-3"
              }`}
              autoCapitalize="none"
              onChangeText={(val) => handleChange("displayName", val)}
              // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
              style={{ flex: 1 }}
            />
            {data?.displayName >= 6 ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
        </View>

        <View className="flex-row my-4 border-b border-gray-800 pb-2">
          <Feather name="at-sign" color={COLORS.accent} size={20} />
          <TextInput
            placeholder={
              currentUser?.isAnonymous
                ? "Utilisateur Anonyme"
                : currentUser.email
            }
            className={`pl-2.5 text-sky-600 outline-none placeholder-gray-700 ${
              Platform.OS === "ios" ? "mt-0" : "-mt-3"
            }`}
            autoCapitalize="none"
            onChangeText={(val) => handleChange("email", val)}
            // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            style={{ flex: 1 }}
          />
          {currentUser?.emailVerified ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>

        <TouchableOpacity
          className="w-full h-10 mt-5 items-center justify-center rounded-md"
          onPress={onSubmit}
        >
          <LinearGradient
            colors={["#38BDF8", "#0284C7"]}
            className="w-full h-14 items-center justify-center rounded-md"
          >
            {loading ? (
              <ActivityIndicator animating={true} color={COLORS.primary} />
            ) : (
              <Text className="text-gray-50 font-semibold text-lg">Editer</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
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