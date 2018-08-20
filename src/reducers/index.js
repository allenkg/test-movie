import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import mainPage from './main-page';
import movieDetails from './movie-details-page';

export default combineReducers({
  routing,
  mainPage,
  movieDetails
})