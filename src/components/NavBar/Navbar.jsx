import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getMovieGenders, getMoviesByName } from "../../actions/movies";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movieGenders = useSelector((state) => state?.movieGenders);
  useEffect(() => {
    if (movieGenders.length === 0) {
      dispatch(getMovieGenders());
    }
  }, [dispatch]);
  const [movieName, setMovieName] = useState("");
  const [isPeliculasExpanded, setIsPeliculasExpanded] = useState(false);
  const [isGenerosPeliculasExpanded, setIsGenerosPeliculasExpanded] =
    useState(false);

  const togglePeliculas = () => setIsPeliculasExpanded(!isPeliculasExpanded);
  const toggleGenerosPeliculas = () =>
    setIsGenerosPeliculasExpanded(!isGenerosPeliculasExpanded);

  const handleMouseEnter = () => setIsGenerosPeliculasExpanded(true);
  const handleMouseLeave = () => setIsGenerosPeliculasExpanded(false);

  function handleInputChange(event) {
    event.preventDefault();
    setMovieName(event.target.value);
  }

  function handleEnter(event) {
    event.preventDefault();
    dispatch(getMoviesByName(movieName)).then(() => {
      navigate(`/search/${movieName}`); // Use navigate function to navigate to the search route
      setMovieName("");
    });
  }

  return (
    <nav id="container-nav">
      <div id="logo-container">
        <img src={logo} alt="logo" />
      </div>
      <div id="options-container">
        <ul>
          <li>
            <a href="/">Inicio</a>
          </li>
          <li onMouseEnter={togglePeliculas} className="opciones">
            Peliculas
            {isPeliculasExpanded && (
              <ul className="dropdown">
                <li>
                  <a href={`/estrenos`}>Estrenos</a>
                </li>
                <li
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="opciones"
                >
                  Generos
                  {isGenerosPeliculasExpanded && (
                    <ul>
                      {movieGenders &&
                        movieGenders.map((gender) => (
                          <li key={gender.id}>
                            <a
                              href={`/generos/${gender.name}`}
                              className="opciones"
                            >
                              {gender.name}
                            </a>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      <div id="search-container">
        <input
          type="text"
          placeholder="Movie Name"
          value={movieName}
          onChange={(event) => handleInputChange(event)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleEnter(event);
            }
          }}
        />
      </div>
    </nav>
  );
}

export default Navbar;
