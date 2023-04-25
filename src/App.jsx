import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from "./components/Inicio/Inicio"
import Navbar from "./components/NavBar/Navbar"
import Estrenos from "./components/Estrenos/Estrenos"
import Generos from "./components/Generos/Generos"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import DetailMovie from "./components/DetailMovie/DetailMovie"
import EstrenosPage from "./components/EstrenosPage/EstrenosPage"
import SearchPage from "./components/SearchPage/SearchPage"
import NotFound from "./components/NotFound/NotFound"
import "./App.css"
import { app } from "./fb";
import { useEffect, useState } from 'react';
import { AuthContextProvider } from './context/authContext';

function App() {
  const [usuario,setUsario]=useState(null)
  useEffect(()=>{
    app.auth().onAuthStateChanged((usuarioFirebase)=>{
      setUsario(usuarioFirebase)
    })
    console.log("usuario conectado: ",usuario);
  },[])
  return (
    <div className='mainrouter'>
      <AuthContextProvider>
        <Router>
        <Navbar />
          <Routes>
            <Route exact path="/" element={<Inicio />} />
            <Route path="/inicio" element={<Estrenos />} />
            <Route path="/estrenos" element={<EstrenosPage />} />
            <Route path="/login" element={<Login setUsario={setUsario}/>} />
            <Route path="/register" element={<Register setUsario={setUsario}/>} />
            <Route path="/generos/:gender" element={<Generos />} />
            <Route
              path="/detailmovie/:id"
              element={<DetailMovie />}
            />
            <Route
              path="/search/:movie_name"
              element={<SearchPage />}
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>

  );
}


export default App