import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import AuthContext from "./AuthContext";
import { auth } from "../../firebase/firebase.init";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  // all states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // google provider
  const googleProvider = new GoogleAuthProvider();

  // to create user with email and pass
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // to sing in user with email and pass
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // to sing in with google
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // to update user profile
  const updateUserProfile = (profileData)=>{
    return updateProfile(auth.currentUser, profileData)
  }

  //   to logout user
  const logOut = () => {
    return signOut(auth);
  };

  // observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  // this is for all values
  const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    googleSignIn,
    updateUserProfile,
    logOut,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
