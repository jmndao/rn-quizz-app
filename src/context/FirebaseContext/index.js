import React from "react";
import { getDatabase, ref, set } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import firebaseApp from "../../../firebaseApp";

const auth = getAuth(firebaseApp);
const FirebaseContext = React.createContext(null);

const FirebaseProvider = ({ children }) => {
  // States
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({ hasErr: false, message: "" });
  const [currentUser, setCurrentUser] = React.useState(null);

  const storeHighScore = (userId, score) => {
    const db = getDatabase();
    const reference = ref(db, "users/" + userId);
    set(reference, {
      highscore: score,
    });
  };

  const createUser = async (email, password) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setCurrentUser(user);
        setLoading(false);
      })
      .catch((err) => {
        const errorMessage = err.message;
        setError({ hasErr: true, message: errorMessage });
      })
      .finally(() => {
        setLoading(false);
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

  return (
    <FirebaseContext.Provider
      value={{
        login,
        logout,
        createUser,
        storeHighScore,
        currentUser,
        loading,
        error,
        resetErrBag,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
export const useFirebase = () => React.useContext(FirebaseContext);
