import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLatestMovies } from "../../actions/movies";
import TemplateMany from "../TemplateMany/TemplateMany";


function EstrenosPage (){
    const dispatch =useDispatch()
    const latestMovies =  useSelector((state)=>state?.latestMovies)
    useEffect(() => {
      if (latestMovies.length===0) {
        dispatch(getLatestMovies());
      }
    }, [dispatch]);
    return (
        <TemplateMany titulo="Estrenos" movies={latestMovies}/>
    )
}
export default EstrenosPage;

