//sacado de https://www.youtube.com/watch?v=ZXiJdEWVcqY&ab_channel=LatteAndCode
import { createContext, useContext, useEffect } from "react";
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
    console.log("auth:",email,password);
    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((usuarioFirebase) => {
        this.props.setUsuario(usuarioFirebase);
      });
  };
  function logOut() {
    app.auth().signOut();
    console.log("logout");
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
      user,
      crearUsario,
      loginUsario,
      logOut,
      setUser,
    }),
    [
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