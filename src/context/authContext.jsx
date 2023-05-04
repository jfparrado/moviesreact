import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, useContext, useEffect } from "react";
import { useState, useMemo } from "react";
import Cookies from 'universal-cookie'; 
import jwt_decode from 'jwt-decode';
import PropTypes from "prop-types";
import { app } from "../fb";

export const AuthContext = createContext(); //es un objeto que adentro tiene un provider

export function AuthContextProvider({ children }) {
  const [user,setUser]=useState({})
  const cookies = new Cookies(); 
  
  const setCookies = (userCredential) => {
    const user = userCredential.user;
    user.getIdToken().then((token) => {
      const expires = new Date();
      expires.setDate(expires.getDate() + 1); // la cookie expira en un día
      cookies.set('jwt', token, { path: '/', expires });
    });
    setUser(user);
  };
  const getCookies = () => {
    const token = cookies.get('jwt');
    return token;
  };
  function verifyToken() {
    const token = getCookies()
    const decodedToken = jwt_decode(token); // decodifica el token
    const expirationDate = new Date(decodedToken.exp * 1000); // obtén la fecha de expiración del token
    
    if (expirationDate < new Date()) { // compara la fecha de expiración con la fecha actual
      firebase.auth().currentUser.getIdToken(true)
        .then((newToken) => {
          setCookie('jwt', newToken); // actualiza la cookie con el nuevo token
        })
        .catch((error) => {
          console.error(error);
        });
    }
    
    const expirationDateString = expirationDate.toLocaleString();
    console.log(`El token expirará el ${expirationDateString}`);
  }
  
  
  const crearUsario = (email, password) => {
    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((usuarioFirebase) => {
        props.setUsuario(usuarioFirebase);
      });
  };
  const loginUsuario = (email, password) => {
    app.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setCookies(userCredential)
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const loginGoogle = () => {
    const provider = new GoogleAuthProvider();
    app.auth().signInWithPopup(provider)
      .then((userCredential) => {
        setCookies(userCredential)
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  
  function logOut() {
    cookies.remove('jwt'); 
    app.auth().signOut();
    setUser(null)
  }
  useEffect(()=>{
    const unsubscribe = app.auth().onAuthStateChanged((currentUser)=>{
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
      loginUsuario,
      logOut,
      verifyToken,
    }),
    [
      loginGoogle,
      user,
      crearUsario,
      loginUsuario,
      logOut,
      verifyToken,
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
