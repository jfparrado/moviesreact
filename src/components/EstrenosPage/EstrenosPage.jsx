import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getLatestMovies } from "../../actions/movies";
import loading from "../../assets/loading.gif";
import "./EstrenosPage.css";

function EstrenosPage (){
    const dispatch =useDispatch()
    const latestMovies =  useSelector((state)=>state?.latestMovies)
    useEffect(() => {
      if (latestMovies.length===0) {
        dispatch(getLatestMovies());
      }
    }, [dispatch]);
    return (
        <div>
            <br />
            <h2>Estrenos</h2>
            {latestMovies.lenght!==0 ? (
            <>
                {[...Array(4)].map((_, index) => (
                <section className="image-section">
                    {latestMovies?.slice(index * 5, (index + 1) * 5).map((video) => (
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
export default EstrenosPage;

