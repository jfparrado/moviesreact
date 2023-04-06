import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index"; //traemos el reducer, el cual no puede realizar operaciones asincronas
import thunkMiddleware from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//es una sintaxis que sirve para hacer peticiones asincronas y trabajar con redux dev tools

const store = createStore(
  rootReducer, //hasta aca seria si no tocara cosas asincronas
  composeEnhancer(
    //esto permite anidar funciones
    applyMiddleware(thunkMiddleware)
  ) // esto nos permite hacer operaciones asincronas
);
export default store;
