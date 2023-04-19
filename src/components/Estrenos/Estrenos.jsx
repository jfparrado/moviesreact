import React , {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { getLatestMovies } from "../../actions/movies";
import loading from "../../assets/loading.gif";
import TemplatePreview from "../TemplatePreview/TemplatePreview.jsx";

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
      <TemplatePreview titulo="Estrenos" movies={moviesWithPosters}/>
    )
}
export default Estrenos

