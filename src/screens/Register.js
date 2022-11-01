import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "react-native-vector-icons/Feather";
import { ActivityIndicator } from "react-native-paper";
import { COLORS } from "../constants";
import { useFirebase } from "../context/FirebaseContext";
import { useTheme } from "../context/ThemeContext";

const Register = ({ navigation }) => {
  const { loading, createUser } = useFirebase();
  const { curTheme } = useTheme();

  const [data, setData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    checkTextInputChange: false,
    secureTextEntry: true,
    confirmSecureTextEntry: true,
    emailErr: "",
    passwordErr: "",
    confirmPasswordErr: "",
  });

  const isEmailValid = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleChange = (input, val) => {
    setData((prev) => ({ ...prev, [input]: val }));
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirmSecureTextEntry,
    });
  };

  const onCreate = () => {
    if (data.email && data.password && data.password === data.confirmPassword) {
      createUser(data.email, data.password);
    } else if (data.password !== data.confirmPassword) {
      setData({
        ...data,
        passwordErr: "Les mots de passe ne correspondent pas.",
        confirmPasswordErr: "Les mots de passe ne correspondent pas.",
      });
    } else {
      setData({
        ...data,
        emailErr: "Entree incorrecte.",
        passwordErr: "Entree incorrecte.",
        confirmPasswordErr: "Entree incorrecte.",
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: curTheme.primary }}>
      <StatusBar backgroundColor={curTheme.primary} barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.text_header}>Creer Mon Compte!</Text>
      </View>

      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}
        className="bg-white"
      >
        <ScrollView>
          {/* Email Input */}
          <View className="my-1.5">
            <Text className="text-lg" style={{ color: curTheme.secondary }}>
              Email
            </Text>
            <View style={styles.action}>
              <Feather name="at-sign" color="#05375a" size={20} />
              <TextInput
                placeholder="Votre adresse mail"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => handleChange("email", val)}
              />
              {isEmailValid(data.email) ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>
            {data.emailErr ? (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>{data.emailErr}</Text>
              </Animatable.View>
            ) : null}
          </View>

          {/* Password Input */}
          <View className="my-1.5">
            <Text className="text-lg" style={{ color: curTheme.secondary }}>
              Mot de Passe
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Mot de Passe"
                secureTextEntry={data.secureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => handleChange("password", val)}
              />
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirmation Password Input */}
          <View className="my-1.5">
            <Text className="text-lg" style={{ color: curTheme.secondary }}>
              Confirmation Mot de Passe
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Confirmation du Mot de Passe"
                secureTextEntry={data.confirmSecureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => handleChange("confirmPassword", val)}
              />
              <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                {data.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={onCreate}>
              <LinearGradient
                colors={[curTheme.primary, "#7f1d1d"]}
                style={styles.signIn}
              >
                {loading ? (
                  <ActivityIndicator animating={true} color={COLORS.primary} />
                ) : (
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: curTheme.neutral,
                      },
                    ]}
                  >
                    Creer Un Compte
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: curTheme.primary,
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: curTheme.primary,
                  },
                ]}
              >
                Se Connecter
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: Platform.OS === "ios" ? 16 : 12,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "red",
  },
  button: {
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 50 : 35,
  },
  signIn: {
    width: "100%",
    height: Platform.OS === "ios" ? 50 : 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: Platform.OS === "ios" ? 16 : 12,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
});
