import React, { useState, useEffect, useContext, createContext } from "react";

import firebase from "../libs/firebase";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const localUserData = localStorage.getItem("logicl-user-local");
  const [user, setUser] = useState(localUserData ? JSON.parse(localUserData) : null);
  const [loading, setLoading] = useState(false);

  const handleUser = async (rawUser) => {
    setLoading(true);
    if (rawUser) {
      const user = await formatUser(rawUser);
      setUser(user);
      setLoading(false);
      localStorage.setItem("logicl-user-local", JSON.stringify(user));
      return user;
    } else {
      localStorage.removeItem("logicl-user-local");
      setUser(false);
      setLoading(false);
      return false;
    }
  };

  const signinWithGitHub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(async (response) => {
        if (response.additionalUserInfo.isNewUser) {
          const formattedUserData = await formatUser(response.user);
          const user = {
            ...formattedUserData,
            createdAt: new Date().toISOString(),
            sharedIdeas: [],
            interactedIdeas: [],
          };
          await firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .set(user);
        }
        handleUser(response.user);
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGitHub,
    signout,
    loading,
  };
}

const formatUser = async (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    photoUrl: user.photoURL,
  };
};
