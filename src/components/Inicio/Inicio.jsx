import React from "react";
import banner from "../../assets/banner.jpg";
import MasVisto from "../MasVistos/MasVistos"; 
import Estrenos from "../Estrenos/Estrenos";
import loading from "../../assets/loading.gif";
import "./Inicio.css"
function Inicio (){
    return (
    <div>
      <div className="banner-container">
        <br />
        <img className="mainimage" src={banner} alt="Banner Photo"/>
      </div>
      <MasVisto/>
      <Estrenos/>
    </div>
    )
}
export default Inicio
