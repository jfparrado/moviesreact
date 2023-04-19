import React, { useState, useEffect } from 'react';
import logo from "../../assets/logo.png"
import menuIcon from "../../assets/menu-button.png"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./NavBar.css"

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [moviesByName, setMoviesByName] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [isPeliculasExpanded, setIsPeliculasExpanded] = useState(false);
  const [isGenerosPeliculasExpanded, setIsGenerosPeliculasExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/moviegenders')
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMousePeliculas = () => {
    setIsPeliculasExpanded(!isPeliculasExpanded);
  };

  const handleMouseGeneros = () => {
    setIsGenerosPeliculasExpanded(!isGenerosPeliculasExpanded);
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter' && movieName !== '') {
      axios.get(`http://localhost:3001/search/${movieName}`)
        .then(res => {
          setMoviesByName(res.data);
          navigate(`/search/${movieName}`);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  return (
    <nav id="container-nav">
      <div id="logo-container">
        <img src={logo} alt="logo" />
      </div>
      <div className={`navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
        <div className="navbar-nav">
          <div className="column">
            <div id="options-container">
              <a href="/" className="main-item">Inicio</a>
              <a onClick={handleMousePeliculas} className="main-item">Peliculas</a>
              {isPeliculasExpanded && (
                <div className="categorias-container">
                  <a className="justtext" href="/estrenos"> Estrenos </a> 
                  <a onClick={handleMouseGeneros} className="justtext">Generos</a>
                  {isGenerosPeliculasExpanded && (
                    <div id="secondcont">
                      <ul className="generos">
                        {categories.map(category => (
                          <li key={category.id} className="opciones">
                            <a className="opcion" href={`/generos/${category.name}`}>{category.name}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div id="search-container">
              <input
                type="text"
                placeholder="Movie Name"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
                onKeyUp={handleEnter}
              />
            </div>
          </div>
        </div>
      </div>

      <button
        className="navbar-toggler d-lg-none"
        type="button"
        onClick={toggleMenu}
      >
        <img src={menuIcon} alt="Toggle menu icon" />
      </button>
    </nav>
  );
};

export default Navbar;
