import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

const router = routerMiddleware(browserHistory);

function configureStore(api) {
  const enhancer = applyMiddleware(thunk.withExtraArgument(api), router);
  return createStore(rootReducer, enhancer);
}

export default configureStore;