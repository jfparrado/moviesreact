import React , {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { getLatestMovies } from "../../actions/movies";
import loading from "../../assets/loading.gif";

function Estrenos (){
  const dispatch =useDispatch()
  const latestMovies =  useSelector((state)=>state?.latestMovies)
  useEffect(() => {
    if (latestMovies.length===0) {
      dispatch(getLatestMovies());
    }
  }, [dispatch]);
  const moviesWithPosters = latestMovies.filter((movie) => movie.poster_path);
    return (
        <div>
          <h2>Estrenos</h2>
          <section className="image-section">

          {moviesWithPosters.lenght!==0 ? (
          <>
            {
            moviesWithPosters?.slice(0, 5).map((video)=>(
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
export default Estrenos

