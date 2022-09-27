import React from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getDocs, collection, getFirestore } from "firebase/firestore";
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
const db = getFirestore(firebaseApp);
const rdb = getDatabase(firebaseApp);
const FirebaseContext = React.createContext(null);

const FirebaseProvider = ({ children }) => {
  // States
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({ hasErr: false, message: "" });
  const [showErrModal, setShowErrModal] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [curTheme, setCurTheme] = React.useState(null);
  const [trackingScore, setTrackingScore] = React.useState({ answers: [] });

  const [allMyAnswers, setAllMyAnswers] = React.useState({});

  // Datas
  const [themes, setThemes] = React.useState([]);

  const storeHighScore = (userId, score) => {
    const db = getDatabase();
    const reference = ref(db, "users/" + userId);
    set(reference, {
      highscore: score,
    });
  };

  // Firebase register method
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

  // Firebase update user info method
  const updateUser = async (user, data) => {
    setLoading(true);
    updateProfile(user, data)
      .then(() => {
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

  // Firebase login method
  const login = async (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        // Signed in
        const user = userCred.user;
        setCurrentUser(user);
        // -----
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

  // Firebase log out method
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

  // Firebase fetch themes method from firestore
  const fetchThemes = async () => {
    setLoading(true);
    getDocs(collection(db, "themes"))
      .then((themes) => {
        themes.forEach((doc) => {
          setThemes((prev) => [doc.data(), ...prev]);
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const saveScore = async (score, nav, restartQuizz) => {
    if (trackingScore.slug && trackingScore.id) {
      setLoading(true);
      set(
        ref(rdb, "users/" + currentUser.uid + "/scores/" + trackingScore.id),
        {
          score,
          ...trackingScore,
        }
      )
        .then(() => {
          setLoading(false);
          restartQuizz();
          nav("Score");
        })
        .catch((err) => {
          nav("Accueil");
        })
        .finally(() => {
          setLoading(false);
          restartQuizz();
        });
    }
  };

  // Fetch my Score
  const fetchMyAnswersAll = async () => {
    setLoading(true);
    let formattedData;
    const scoreRef = ref(rdb, "users/" + currentUser.uid + "/scores");
    onValue(scoreRef, (snapshot) => {
      const myAnswers = snapshot.val();
      formattedData = Object.keys(myAnswers).map((id) => {
        return { id, ...myAnswers[id] };
      });
      setAllMyAnswers(formattedData);
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
        curTheme,
        setCurTheme,
        loading,
        error,
        resetErrBag,
        themes,
        fetchThemes,
        fetchMyAnswersAll,
        trackingScore,
        setTrackingScore,
        saveScore,
        allMyAnswers,
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
                Veuillez reessayer plutard.
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
