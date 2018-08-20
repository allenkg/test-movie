import {push} from "react-router-redux";

export const FETCH_MOVIES = 'MAIN_PAGE/FETCH_MOVIES';
export const FETCH_MOVIES_SUCCESS = 'MAIN_PAGE/FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'MAIN_PAGE/FETCH_MOVIES_FAILURE';

export const FETCH_GENRES = 'MAIN_PAGE/FETCH_GENRES';
export const FETCH_GENRES_SUCCESS = 'MAIN_PAGE/FETCH_GENRES_SUCCESS';
export const FETCH_GENRES_FAILURE = 'MAIN_PAGE/FETCH_GENRES_FAILURE';

export const CHANGE_SEARCH_QUERY = 'MAIN_PAGE/CHANGE_SEARCH_QUERY';

export const FETCH_SEARCH_MOVIES = 'MAIN_PAGE/FETCH_SEARCH_MOVIES';
export const FETCH_SEARCH_MOVIES_SUCCESS = 'MAIN_PAGE/FETCH_SEARCH_MOVIES_SUCCESS';
export const FETCH_SEARCH_MOVIES_FAILURE = 'MAIN_PAGE/FETCH_SEARCH_MOVIES_FAILURE';

function fetchMovies(page) {
  return async (dispatch, getState, api) => {
    dispatch({type: FETCH_MOVIES});

    try {
      const moviesData = await api.getMovies(page);
      const data = JSON.parse(moviesData);

      dispatch({type: FETCH_MOVIES_SUCCESS, data});
    } catch (e) {
      dispatch({type: FETCH_MOVIES_FAILURE, e})
    }
  }
}

function fetchGenres() {
  return async (dispatch, getState, api) => {
    dispatch({type: FETCH_GENRES});
    try {
      const genresData = await api.getGenres();
      const data = JSON.parse(genresData);
      dispatch({type: FETCH_GENRES_SUCCESS, data});
    } catch (e) {
      dispatch({type: FETCH_GENRES_FAILURE, e})
    }
  }
}

let searchTimeOut = null;

function changeSearchQuery(searchQuery) {
  clearTimeout(searchTimeOut);
  return (dispatch, getState) => {
    dispatch({type: CHANGE_SEARCH_QUERY, searchQuery});
    const pageNumber = 1;
    searchTimeOut = setTimeout(() => {
      if (searchQuery.length > 0) {
        dispatch(searchForMovies(pageNumber));
      } else {
        dispatch(fetchMovies(pageNumber))
      }
      clearTimeout(searchTimeOut);
    }, 1000)
  }
}

export function searchForMovies(page) {
  return async (dispatch, getState, api) => {
    dispatch({ type: FETCH_SEARCH_MOVIES });
    const { searchQuery, pageNumber } = getState().mainPage;
    const number = page?page: pageNumber;
    try {
      const movies = await api.getSearchMovies(searchQuery, number);

      const data = JSON.parse(movies);
      dispatch({ type: FETCH_SEARCH_MOVIES_SUCCESS, data});
      dispatch(push('/'));
    } catch (e) {
      dispatch({ type: FETCH_SEARCH_MOVIES_FAILURE, e});
    }
  }
}

export default {
  fetchMovies,
  fetchGenres,
  changeSearchQuery,
  searchForMovies
}