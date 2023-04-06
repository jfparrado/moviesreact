import {
  GET_ALL_MOVIES,
  GET_TOP_RANKED,
  GET_LATEST_MOVIES,
  GET_MOVIE_GENDERS,
  GET_DETAIL_MOVIE,
  GET_MOVIES_BY_GENDER,
  GET_SEARCH_RESULT,
} from "../actions/movies";

const initialState = {
  allMovies: [],
  topRanked: [],
  latestMovies: [],
  movieGenders: [],
  moviesByGender: [],
  moviesByName: [],
  detailMovie: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_MOVIES:
      return {
        ...state,
        allMovies: action.payload,
      };
    case GET_TOP_RANKED:
      return {
        ...state,
        topRanked: action.payload,
      };
    case GET_LATEST_MOVIES:
      return {
        ...state,
        latestMovies: action.payload,
      };
    case GET_DETAIL_MOVIE:
      return {
        ...state,
        detailMovie: action.payload,
      };
    case GET_MOVIE_GENDERS:
      return {
        ...state,
        movieGenders: action.payload,
      };
    case GET_MOVIES_BY_GENDER:
      return {
        ...state,
        moviesByGender: action.payload,
      };
    case GET_SEARCH_RESULT:
      return {
        ...state,
        moviesByName: action.payload,
      };
    default:
      return { ...state };
  }
}
