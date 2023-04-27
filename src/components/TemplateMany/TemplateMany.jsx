import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import loading from "../../assets/loading.gif";

function TemplateMany(props) {
  const { titulo, movies } = props;
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [movies]);

  return (
    <div className="mainrouter principal-container">
      <br />
      <h2>{titulo}</h2>
      {movies.length !== 0 ? (
        <>
          {[...Array(4)].map((_, index) => (
            <section className="image-section">
              {movies?.slice(index * 5, (index + 1) * 5).map((video) => (
                <div className="image-container">
                  <Link to={`/detailmovie/${video.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w185/${video.poster_path}`}
                      alt={`poster of ${video.original_title}`}
                    />
                    <p className="image-text">{video.original_title}</p>
                  </Link>
                </div>
              ))}
            </section>
          ))}
        </>
      ) : (
        showLoading && (
          <div className="imgContainer">
            <img src={loading} alt="loading" />
          </div>
        )
      )}
      {movies.length === 0 && !showLoading && (
        <p id="noResults">No se encontraron resultados</p>
      )}
    </div>
  );
}

export default TemplateMany;
