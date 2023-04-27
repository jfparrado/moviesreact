//sacado de https://www.youtube.com/watch?v=ZXiJdEWVcqY&ab_channel=LatteAndCode
import { createContext, useContext, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../fb";
import PropTypes from "prop-types";
import { useState, useMemo } from "react";

export const AuthContext = createContext(); //es un objeto que adentro tiene un provider

export function AuthContextProvider({ children }) {
  const [user,setUser]=useState({})
  const crearUsario = (email, password) => {
    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((usuarioFirebase) => {
        props.setUsuario(usuarioFirebase);
        console.log("registrado");
      });
  };
  const loginUsario = (email, password) => {
    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((usuarioFirebase) => {
        this.props.setUsuario(usuarioFirebase);
      });
  };
  const loginGoogle = () => {
    const provider = new GoogleAuthProvider();
    app.auth().signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  
  function logOut() {
    app.auth().signOut();
    setUser(null)
  }
  useEffect(()=>{
    const unsubscribe = app.auth().onAuthStateChanged((currentUser)=>{
      console.log("currentUser:",currentUser);
      setUser(currentUser)
    })
    return ()=>{
      unsubscribe();
    }
  },[])
  const value = useMemo(
    () => ({
      loginGoogle,
      user,
      crearUsario,
      loginUsario,
      logOut,
      setUser,
    }),
    [
      loginGoogle,
      user,
      crearUsario,
      loginUsario,
      logOut,
    ]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
AuthContextProvider.propTypes = {
  children: PropTypes.object,
};
export function useAuthContext() {
  return useContext(AuthContext);
}