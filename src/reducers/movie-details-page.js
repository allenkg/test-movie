import merge from 'xtend';
import createReducer from './create-reducer';
import {
  GET_MOVIE_DETAILS,
  GET_MOVIE_DETAILS_FAILURE,
  GET_MOVIE_DETAILS_SUCCESS,
  SHOW_MOVIE,
  GET_SIMILAR_MOVIES,
  GET_SIMILAR_MOVIES_FAILURE,
  GET_SIMILAR_MOVIES_SUCCESS, GET_RECOMMENDED_MOVIES, GET_RECOMMENDED_MOVIES_SUCCESS, GET_MOVIE_CREDITS,
  GET_MOVIE_CREDITS_SUCCESS, SET_INITIAL_STATE, GET_MOVIE_TRAILER_ID, GET_MOVIE_TRAILER_ID_SUCCESS
} from '../actions/movie-details-page';


const INITIAL_ERRORS_STATE = {};
const INITIAL_STATE = {
  isLoading: false,
  errors: {},
  movieId: '',
  movieDetails: {},
  similarMovies: [],
  recommendedMovies: [],
  movieCredits: [],
  trailerLinkId: ''
};

function parseCast(data) {
  return data.reduce((acc, item) => {
    if (item.cast_id <= 25) {
      acc.push(item)
    }
    return acc
  }, []);
}

function getTrailerLinkId(data) {
  return data.map((item, index) => {
    if (item.type === 'Trailer') {
      return item.key
    }
  })
}

export default createReducer({
  [GET_MOVIE_DETAILS]: (state, action) => merge(state, {
    isLoading: true
  }),
  [SHOW_MOVIE]: (state, action) => merge(state, {
    isLoading: true,
    movieId: action.movieId
  }),
  [GET_MOVIE_DETAILS_SUCCESS]: (state, action) => merge(state, {
    isLoading: false,
    movieDetails: action.data
  }),
  [GET_MOVIE_DETAILS_FAILURE]: (state, action) => merge(state, {
    isLoading: false,
    errors: action.errors
  }),
  [GET_SIMILAR_MOVIES]: (state, action) => merge(state, {
    isLoading: true
  }),
  [GET_SIMILAR_MOVIES_SUCCESS]: (state, action) => merge(state, {
    isLoading: false,
    similarMovies: action.data.results
  }),
  [GET_SIMILAR_MOVIES_FAILURE]: (state, action) => merge(state, {
    isLoading: false,
    errors: action.errors
  }),
  [GET_RECOMMENDED_MOVIES]: (state, action) => merge(state, {
    isLoading: true
  }),
  [GET_RECOMMENDED_MOVIES_SUCCESS]: (state, action) => merge(state, {
    isLoading: false,
    recommendedMovies: action.data.results
  }),
  [GET_MOVIE_CREDITS]: (state, action) => merge(state, {
    isLoading: true
  }),
  [GET_MOVIE_CREDITS_SUCCESS]: (state, action) => merge(state, {
    isLoading: false,
    movieCredits: parseCast(action.data.cast)
  }),
  [SET_INITIAL_STATE]: (state, action) => merge(state, INITIAL_STATE),
  [GET_MOVIE_TRAILER_ID]: (state, action) => merge(state, {
    isLoading: true
  }),
  [GET_MOVIE_TRAILER_ID_SUCCESS]: (state, action) => merge(state, {
    isLoading: false,
    trailerLinkId: getTrailerLinkId(action.data.results)
  })
}, INITIAL_STATE)