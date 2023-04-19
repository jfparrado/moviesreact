import React , {useEffect}from "react";
import {useDispatch, useSelector} from "react-redux";
import { getTopRanked } from "../../actions/movies";
import TemplatePreview from "../TemplatePreview/TemplatePreview";
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
      <TemplatePreview titulo="Mas vistos" movies={moviesWithPosters}/>
    )
}
export default MasVisto