import merge from 'xtend';
import createReducer from './create-reducer';
import _ from "lodash";

import {
  REQUEST,
  REQUEST_SUCCESS,
  FETCH_GENRES_FAILURE,
  FETCH_GENRES_SUCCESS,
  FETCH_GENRES,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIES,
  FETCH_MOVIES_SUCCESS, CHANGE_SEARCH_QUERY, FETCH_SEARCH_MOVIES_SUCCESS, FETCH_SEARCH_MOVIES_FAILURE
} from '../actions/main-page';

const INITIAL_STATE = {
  genres: {},
  isLoading: false,
  movies: [],
  pageNumber: 0,
  totalPages: 0,
  searchQuery: '',
  hasSearchResult: false

};

function parseGenre(data) {
  return _.keyBy(data.genres, 'id');
}


export default createReducer({
  [FETCH_MOVIES]: (state, action) => merge(state, {
    isLoading: true
  }),
  [FETCH_GENRES]: (state, action) => merge(state, {
    isLoading: true
  }),
  [FETCH_GENRES_SUCCESS]: (state, action) => merge(state, {
    isLoading: false,
    genres: parseGenre(action.data)
  }),
  [FETCH_MOVIES_SUCCESS]: (state, action) => merge(state, {
    isLoading: false,
    movies: state.movies.concat(action.data.results),
    pageNumber: action.data.page,
    totalPages: action.data.total_pages,
  }),
  [CHANGE_SEARCH_QUERY]: (state, action) => merge(state, {
    searchQuery: action.searchQuery,
    movies: []
  }),
  [FETCH_SEARCH_MOVIES_SUCCESS]: (state, action) => merge(state, {
    hasSearchResult: true,
    movies: state.movies.concat(action.data.results),
    pageNumber: action.data.page,
    totalPages: action.data.total_pages,
  }),
  [FETCH_SEARCH_MOVIES_FAILURE]: (state, action) => merge(state, {
    hasSearchResult: false
  })
}, INITIAL_STATE)