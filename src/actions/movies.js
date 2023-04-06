import axios from "axios";
export const GET_ALL_MOVIES = `GET_ALL_MOVIES`;
export const GET_TOP_RANKED = `GET_TOP_RANKED`;
export const GET_LATEST_MOVIES = `GET_LATEST_MOVIES`;
export const GET_DETAIL_MOVIE = `GET_DETAIL_MOVIE`;
export const GET_MOVIE_GENDERS = `GET_MOVIE_GENDERS`;
export const GET_MOVIES_BY_GENDER = `GET_MOVIES_BY_GENDER`;
export const GET_SEARCH_RESULT = `GET_SEARCH_RESULT`;

export function getAllMovies() {
  return async function (dispatch) {
    try {
      const allMovies = await axios.get(`http://localhost:3001/`);
      return dispatch({
        type: GET_ALL_MOVIES,
        payload: allMovies.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getTopRanked() {
  return async function (dispatch) {
    try {
      const topMovies = await axios.get(`http://localhost:3001/topranked`);
      return dispatch({
        type: GET_TOP_RANKED,
        payload: topMovies.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getMovieGenders() {
  return async function (dispatch) {
    try {
      const genders = await axios.get(`http://localhost:3001/moviegenders`);
      return dispatch({
        type: GET_MOVIE_GENDERS,
        payload: genders.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getLatestMovies() {
  return async function (dispatch) {
    try {
      const latestMovies = await axios.get(
        `http://localhost:3001/latestmovies`
      );
      return dispatch({
        type: GET_LATEST_MOVIES,
        payload: latestMovies.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getDetailedMovie(movie_id) {
  return async function (dispatch) {
    try {
      const detailMovie = await axios.get(
        `http://localhost:3001/detailmovie/${movie_id}`
      );
      return dispatch({
        type: GET_DETAIL_MOVIE,
        payload: detailMovie.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getMoviesByGender(gender) {
  return async function (dispatch) {
    try {
      const moviesByGender = await axios.get(
        `http://localhost:3001/moviesbygender/${gender}`
      );
      return dispatch({
        type: GET_MOVIES_BY_GENDER,
        payload: moviesByGender.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getMoviesByName(movie_name) {
  return async function (dispatch) {
    try {
      const moviesByName = await axios.get(
        `http://localhost:3001/search/${movie_name}`
      );
      return dispatch({
        type: GET_SEARCH_RESULT,
        payload: moviesByName.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
