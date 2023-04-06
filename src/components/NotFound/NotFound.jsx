import React from "react";
import notFound from "../../assets/not_found.png";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="NotFound">
      <img src={notFound} alt="page not found" />
    </div>
  );
}

export default NotFound;
