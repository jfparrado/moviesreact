import React from "react";
import { Link } from "react-router-dom";
import loading from "../../assets/loading.gif";


function TemplateMany (props){
    const { titulo, movies } = props;
    return (
        <div>
            <br />
            <h2>{titulo}</h2>
            {movies.lenght!==0 ? (
            <>
                {[...Array(4)].map((_, index) => (
                <section className="image-section">
                    {movies?.slice(index * 5, (index + 1) * 5).map((video) => (
                        <div className="image-container">
                            <Link to={`/detailmovie/${video.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w185/${video.poster_path}`} alt={`poster of ${video.original_title}`}/>
                                <p className="image-text">{video.original_title}</p>
                            </Link>
                        </div>
                    ))}
                </section>
            ))}
            </>
            ) : (
            <div className="imgContainer">
                <img src={loading} alt="loading" />
            </div>
            )}
        </div>
    )
}
export default TemplateMany;

