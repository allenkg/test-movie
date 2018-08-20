import {push} from 'react-router-redux';

export const CHANGE_FIELD = 'CREATE_PAGE/CHANGE_FIELD';
export const SAVE = 'CREATE_PAGE/SAVE';
export const SAVE_SUCCESS = 'CREATE_PAGE/SAVE_SUCCESS';
export const SAVE_FAILURE = 'CREATE_PAGE/SAVE_FAILURE';
export const CANCEL = 'CREATE_PAGE/CANCEL';

export const GET_MOVIE_DETAILS = 'MOVIE_DETAILS/GET_MOVIE_DETAILS';
export const GET_MOVIE_DETAILS_SUCCESS = 'MOVIE_DETAILS/GET_MOVIE_DETAILS_SUCCESS';
export const GET_MOVIE_DETAILS_FAILURE = 'MOVIE_DETAILS/GET_MOVIE_DETAILS_FAILURE';
export const SHOW_MOVIE = 'MOVIE_DETAILS/SHOW_MOVIE';

export const GET_SIMILAR_MOVIES = 'MOVIE_DETAILS/GET_SIMILAR_MOVIES';
export const GET_SIMILAR_MOVIES_SUCCESS = 'MOVIE_DETAILS/GET_SIMILAR_MOVIES_SUCCESS';
export const GET_SIMILAR_MOVIES_FAILURE = 'MOVIE_DETAILS/GET_SIMILAR_MOVIES_FAILURE';

export const GET_RECOMMENDED_MOVIES = 'MOVIE_DETAILS/GET_RECOMMENDED_MOVIES';
export const GET_RECOMMENDED_MOVIES_SUCCESS = 'MOVIE_DETAILS/GET_RECOMMENDED_MOVIES_SUCCESS';
export const GET_RECOMMENDED_MOVIES_FAILURE = 'MOVIE_DETAILS/GET_RECOMMENDED_MOVIES_FAILURE';

export const GET_MOVIE_CREDITS = 'MOVIE_DETAILS/GET_MOVIE_CREDITS';
export const GET_MOVIE_CREDITS_SUCCESS = 'MOVIE_DETAILS/GET_MOVIE_CREDITS_SUCCESS';
export const GET_MOVIE_CREDITS_FAILURE = 'MOVIE_DETAILS/GET_MOVIE_CREDITS_FAILURE';

export const GET_MOVIE_TRAILER_ID = 'MOVIE_DETAILS/GET_MOVIE_TRAILER_ID';
export const GET_MOVIE_TRAILER_ID_SUCCESS = 'MOVIE_DETAILS/GET_MOVIE_TRAILER_ID_SUCCESS';
export const GET_MOVIE_TRAILER_ID_FAILURE = 'MOVIE_DETAILS/GET_MOVIE_TRAILER_ID_FAILURE';

export const SET_INITIAL_STATE = 'MOVIE_DETAILS/SET_INITIAL_STATE';

function changeField(fieldName, fieldValue) {
  return { type: CHANGE_FIELD, fieldName, fieldValue };
}

function savePerson() {
  return async (dispatch, getState, api) => {
    const {
      fullName,
      birthDate,
      address,
      city,
      phoneNumber
    } = getState().createPage;
    dispatch({ type: SAVE });
    try {
      const person = await api.createPerson({
        fullName,
        birthDate,
        address,
        city,
        phoneNumber
      });
      dispatch({ type: SAVE_SUCCESS, person });
      dispatch(push('/'));
    } catch (e) {
      dispatch({ type: SAVE_FAILURE, errors: e.errors });
    }
  }
}

function cancelCreate() {
  return (dispatch) => {
    dispatch({ type: CANCEL });
    dispatch(push('/'));
  }
}

function showMovie(movieId) {
  return (dispatch) => {
    dispatch({ type: SHOW_MOVIE, movieId })
  }
}

function getMovieDetails(movieId) {
  return async (dispatch, getState, api) => {
    dispatch({ type: GET_MOVIE_DETAILS });
    try {
      const movieDetails = await api.getMovieDetails(movieId);
      const data = JSON.parse(movieDetails);

      dispatch({type: GET_MOVIE_DETAILS_SUCCESS, data});
    } catch (e) {
      dispatch({type: GET_MOVIE_DETAILS_FAILURE, e})
    }
  }
}

function fetchSimilarMovies(movieId) {
  return async (dispatch, getState, api) => {
    dispatch({ type: GET_SIMILAR_MOVIES });
    try {
      const similarMovies = await api.getSimilarMovies(movieId);
      const data = JSON.parse(similarMovies);

      dispatch({ type: GET_SIMILAR_MOVIES_SUCCESS, data });
    } catch (e) {
      dispatch({ type: GET_SIMILAR_MOVIES_FAILURE, e})
    }
  }
}

function fetchRecommendedMovies(movieId) {
  return async (dispatch, getState, api) => {
    dispatch({ type: GET_RECOMMENDED_MOVIES });
    try {
      const recommendedMovies = await api.getRecommendedMovies(movieId);
      const data = JSON.parse(recommendedMovies);

      dispatch({ type: GET_RECOMMENDED_MOVIES_SUCCESS, data });
    } catch (e) {
      dispatch({ type: GET_RECOMMENDED_MOVIES_FAILURE, e })
    }
  }
}

function fetchMovieCredits(movieId) {
  return async (dispatch, getState, api) => {
    dispatch({ type: GET_MOVIE_CREDITS });
    try {
      const credits = await api.getMovieCredits(movieId);
      const data = JSON.parse(credits)
      dispatch({ type: GET_MOVIE_CREDITS_SUCCESS, data});
    } catch (e) {
      dispatch({ type: GET_MOVIE_CREDITS_FAILURE, e})
    }
  }
}

function getMovieTrailer(movieId) {
  return async (dispatch, getState, api) => {
    dispatch({ type: GET_MOVIE_TRAILER_ID });
    try {
      const credits = await api.getTrailerId(movieId);
      const data = JSON.parse(credits);
      dispatch({ type: GET_MOVIE_TRAILER_ID_SUCCESS, data});
    } catch (e) {
      dispatch({ type: GET_MOVIE_TRAILER_ID_FAILURE, e})
    }
  }
}

function setInitialState() {
  return { type: SET_INITIAL_STATE }
}


export default {
  // changeField,
  // savePerson,
  getMovieDetails,
  showMovie,
  fetchSimilarMovies,
  fetchRecommendedMovies,
  fetchMovieCredits,
  getMovieTrailer,
  setInitialState
}