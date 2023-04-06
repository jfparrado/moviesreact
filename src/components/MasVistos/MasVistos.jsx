import React , {useEffect}from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { getTopRanked } from "../../actions/movies";
import "../MasVistos/MasVistos.css"

function MasVisto (){
  const dispatch =useDispatch()
  const topRanked =  useSelector((state)=>state?.topRanked)

  useEffect(() => {
    if (topRanked.length===0) {
      dispatch(getTopRanked());
    }

  }, [dispatch]);
  const moviesWithPosters = topRanked.filter((movie) => movie.poster_path);
    return (
        <div>
          <h2>Mas visto</h2>
          <section className="image-section">
            {
            moviesWithPosters?.slice(0, 5).map((video)=>(
              <div className="image-container">
                <Link to={`/detailmovie/${video.id}`}>
                  <img src={`https://image.tmdb.org/t/p/w185/${video.poster_path}`} alt={`poster of ${video.original_title}`} />
                  <p className="image-text">{video.original_title}</p>
                </Link>
              </div>
            ))}
          </section>
        </div>
    )
}
export default MasVisto