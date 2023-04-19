import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMoviesByGender } from "../../actions/movies";
import "./Generos.css";
import TemplateMany from "../TemplateMany/TemplateMany";

function Generos (){
    const { gender } = useParams();
    const dispatch = useDispatch();
    const moviesByGender = useSelector((state) => state?.moviesByGender);
    useEffect(() => {
        dispatch(getMoviesByGender(gender));
    }, [dispatch,gender]);
    return (
        <TemplateMany titulo={gender} movies={moviesByGender}/>
    )
}
export default Generos;
