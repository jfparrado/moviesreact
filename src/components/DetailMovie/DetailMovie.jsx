import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailedMovie } from "../../actions/movies";
import loading from "../../assets/loading.gif";
import "./DetailMovie.css";

export default function DetailMovie() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detailMovie = useSelector((state) => state?.detailMovie);

  useEffect(() => {
    if (Number(detailMovie.id) !== Number(id)) {
      dispatch(getDetailedMovie(id));
    }
  }, [dispatch, detailMovie.id, id]);

  return (
    <div className="detail-movie-container">
      {Number(detailMovie.id) === Number(id) ? (
        <>
          <h2>{detailMovie.original_title}</h2>
          <div className="detail-movie-info-container">
            <img src={`https://image.tmdb.org/t/p/w185/${detailMovie.poster_path}`} alt={`poster of ${detailMovie.original_title}`} className="detail-movie-poster" />
            <div className="detail-movie-text-container">
            <table>
            <tr>
              <td>
                <p><strong>Original Title:</strong> {detailMovie.original_title}</p>
                <p><strong>Original Language:</strong> {detailMovie.original_language}</p>
                <p><strong>Genres:</strong> {detailMovie.genres && detailMovie.genres.map((genre, index) => (
                    <span key={genre}>{genre}{index !== detailMovie.genres.length - 1 ? ', ' : '.'}</span>
                  ))}</p>
                <p><strong>Release Date:</strong> {detailMovie.release_date}</p>
                <p><strong>Duration:</strong> {detailMovie.runtime}</p>
                <p><strong>Homepage:</strong> {detailMovie.homepage}</p>
              </td>
              <td>
                <p><strong>Popularity:</strong> {detailMovie.popularity}</p>
                <p><strong>Budget:</strong> {detailMovie.budget}</p>
                <p><strong>Revenue:</strong> {detailMovie.revenue}</p>
                <p><strong>Spoken Languages:</strong> {detailMovie.spoken_languages && detailMovie.spoken_languages.map((language, index) => (
                    <span key={language}>{language}{index !== detailMovie.spoken_languages.length - 1 ? ', ' : '.'}</span>
                  ))}</p>
                <p><strong>Status:</strong> {detailMovie.status}</p>
                <p><strong>Vote Average:</strong> {detailMovie.vote_average}</p>
              </td>
            </tr>
          </table>
            <p><strong>Overview:</strong> {detailMovie.overview}</p>
            </div>
          </div>
        </>
      ) : (
        <div className="imgContainer">
          <img src={loading} alt="loading" />
        </div>
      )}
    </div>
  );  
}
