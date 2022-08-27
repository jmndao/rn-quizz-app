import React from "react";
import { getDatabase, ref, set } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import firebaseApp from "../../../firebaseApp";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants";

const auth = getAuth(firebaseApp);
const FirebaseContext = React.createContext(null);

const FirebaseProvider = ({ children }) => {
  // States
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({ hasErr: false, message: "" });
  const [showErrModal, setShowErrModal] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);

  const storeHighScore = (userId, score) => {
    const db = getDatabase();
    const reference = ref(db, "users/" + userId);
    set(reference, {
      highscore: score,
    });
  };

  const createUser = async (email, password) => {
    let createdUser;
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        createdUser = userCredential.user;
        // Adding username to user
        setCurrentUser(createdUser);
        setLoading(false);
      })
      .catch((err) => {
        setError({ hasErr: true, message: err.message });
        setShowErrModal(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateUser = async (user, data) => {
    setLoading(true);
    updateProfile(user, data)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setError({ hasErr: true, message: err.message });
        setShowErrModal(true);
      });
  };

  const login = async (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        // Signed in
        const user = userCred.user;
        setCurrentUser(user);
        setLoading(false);
      })
      .catch((err) => {
        const errorMessage = err.message;
        setError({ hasErr: true, message: errorMessage });
        setShowErrModal(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = async () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        // An error happened.
        setError({ hasErr: true, message: err.message });
        setShowErrModal(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setCurrentUser(user);
      } else {
        // User is signed out
        setCurrentUser(null);
      }
    });
  }, []);

  const resetErrBag = () => setError({ hasErr: false, message: "" });

  const closeErrModal = () => {
    resetErrBag();
    setShowErrModal(false);
  };

  return (
    <FirebaseContext.Provider
      value={{
        login,
        logout,
        createUser,
        updateUser,
        storeHighScore,
        currentUser,
        loading,
        error,
        resetErrBag,
      }}
    >
      {children}

      {/* Modal */}
      {error.hasErr && (
        <Modal animationType="slide" visible={showErrModal} transparent={true}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
            className="shadow-lg shadow-gray-800"
          >
            <View
              style={{
                backgroundColor: COLORS.accent,
                width: "90%",
                borderRadius: 20,
                padding: 20,
                alignItems: "center",
                zIndex: 20,
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold" }}
                className="text-red-200 py-2"
              >
                {`Oops ! Connexion echouee.`}
              </Text>
              <Text className="text-gray-50 font-semibold py-1.5 text-lg">
                {error.message}
              </Text>
              <TouchableOpacity
                onPress={closeErrModal}
                style={{
                  backgroundColor: COLORS.primary,
                  padding: 10,
                  width: "100%",
                }}
                className="rounded-md"
              >
                <Text className="text-sky-600 text-lg text-center">Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
export const useFirebase = () => React.useContext(FirebaseContext);
