import React from "react";
import { Link } from "react-router-dom";
import loading from "../../assets/loading.gif";

function TemplatePreview (props){
    const { titulo, movies } = props;
      return (
        <div>
          <h2>{titulo}</h2>
          <section className="image-section">

          {movies.lenght!==0 ? (
          <>
            {
            movies?.slice(0, 5).map((video)=>(
              <div className="image-container">
              <Link to={`/detailmovie/${video.id}`}>
                <img src={`https://image.tmdb.org/t/p/w185/${video.poster_path}`} alt={`poster of ${video.original_title}`}/>
                <p className="image-text">{video.original_title}</p>
              </Link>
            </div>
            ))}
          </>
        ) : (
          <div className="imgContainer">
            <img src={loading} alt="loading" />
          </div>
          )}
          </section>
        </div>
    )
}
export default TemplatePreview

