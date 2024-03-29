import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import { useFirebase } from "../context/FirebaseContext";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "../context/ThemeContext";
import Toast from "react-native-toast-message";

const Login = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { login, loading, error } = useFirebase();
  const { curTheme } = useTheme();

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const onSubmit = () => {
    login(data.email, data.password);
  };

  React.useEffect(() => {
    if (error.hasErr) {
      Toast.show({
        type: "error",
        text1: `${error.message} 👋`,
      });
    }
  }, [error]);

  return (
    <View style={{ flex: 1, backgroundColor: curTheme.primary }}>
      <StatusBar backgroundColor={curTheme.primary} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Learning DEC</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: curTheme.neutral,
          },
        ]}
      >
        <Text style={[styles.text_footer, { color: curTheme.secondary }]}>
          Email
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={curTheme.primary} size={20} />
          <TextInput
            placeholder="Email"
            style={[styles.textInput]}
            className="text-gray-800"
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              email must be 4 characters long.
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            { marginTop: 35, color: curTheme.secondary },
          ]}
          className="text-gray-800"
        >
          Mot de Passe
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={curTheme.primary} size={20} />
          <TextInput
            placeholder="Mot de Passe"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[styles.textInput]}
            className="text-gray-800"
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}

        <TouchableOpacity>
          <Text style={{ color: curTheme.primary, marginTop: 15 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={onSubmit}>
            <LinearGradient
              colors={[curTheme.primary, "#7f1d1d"]}
              style={styles.signIn}
            >
              {loading ? (
                <ActivityIndicator animating={true} color={curTheme.primary} />
              ) : (
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: curTheme.neutral,
                    },
                  ]}
                >
                  Se Connecter
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Compte")}
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
              Creer Un Compte
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },
  footer: {
    flex: 3,
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
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "red",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: Platform.OS === "ios" ? 14 : 10,
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
});
