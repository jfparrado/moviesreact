import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from "./components/Inicio/Inicio"
import Navbar from "./components/NavBar/Navbar"
import Estrenos from "./components/Estrenos/Estrenos"
import Generos from "./components/Generos/Generos"
import DetailMovie from "./components/DetailMovie/DetailMovie"
import EstrenosPage from "./components/EstrenosPage/EstrenosPage"
import SearchPage from "./components/SearchPage/SearchPage"
import NotFound from "./components/NotFound/NotFound"
import "./App.css"

function App() {
  return (
    <div className='mainrouter'>
      <Router>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Estrenos />} />
          <Route path="/estrenos" element={<EstrenosPage />} />
          <Route path="/peliculas/:gender" element={<Generos />} />
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
    </div>

  );
}


export default App