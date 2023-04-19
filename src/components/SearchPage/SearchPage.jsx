import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMoviesByName } from "../../actions/movies";
import TemplateMany from "../TemplateMany/TemplateMany";

function SearchPage (){
    const { movie_name } = useParams();
    const dispatch =useDispatch()
    const moviesByName =  useSelector((state)=>state?.moviesByName)
    useEffect(() => {
      if (moviesByName.length===0||moviesByName===undefined) {
        dispatch(getMoviesByName(movie_name));
      }
    }, [dispatch]);
    return (
        <TemplateMany titulo="Resultados" movies={moviesByName}/>
    )
}
export default SearchPage;