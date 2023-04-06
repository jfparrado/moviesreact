import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMoviesByName } from "../../actions/movies";
import loading from "../../assets/loading.gif";
import "./SearchPage.css";

function SearchPage (){
    const dispatch =useDispatch()
    const moviesByName =  useSelector((state)=>state?.moviesByName)
    useEffect(() => {
      if (moviesByName.length===0||moviesByName===undefined) {
        dispatch(getMoviesByName());
      }
    }, [dispatch]);
    return (
        <div>
            <br />
            <h2>Resultados</h2>
            <div>
            {
            moviesByName.length!==0?
            [...Array(4)].map((_, index) => (
                <section className="image-section">
                    {moviesByName?.slice(index * 5, (index + 1) * 5).map((video) => (
                        <div className="image-container">
                            <Link to={`/detailmovie/${video.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w185/${video.poster_path}`} alt={`poster of ${video.original_title}`}/>
                                <p className="image-text">{video.original_title}</p>
                            </Link>
                        </div>
                    ))}
                </section>
            ))
            :<img src={loading} alt="loading" />
        }</div>
        </div>
    )
}
export default SearchPage;