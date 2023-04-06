import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getMoviesByGender } from "../../actions/movies";
import loading from "../../assets/loading.gif";
import "./Generos.css";

function Generos (){
    const { gender } = useParams();
    const dispatch = useDispatch();
    const moviesByGender = useSelector((state) => state?.moviesByGender);
    useEffect(() => {
        dispatch(getMoviesByGender(gender));
    }, [dispatch,gender]);
    return (
        <div>
            <br />
            <h2>{gender}</h2>
            {moviesByGender.lenght!==0 ? (
            <>
                {[...Array(4)].map((_, index) => (
                        <section className="image-section">
                            {moviesByGender?.slice(index * 5, (index + 1) * 5).map((video) => (
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
export default Generos;
