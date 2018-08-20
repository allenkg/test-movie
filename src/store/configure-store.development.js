import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

const logger = createLogger({
  level: 'info',
  duration: true,
  collapsed: true
});

const router = routerMiddleware(browserHistory);

function configureStore(api) {
  const enhancer = applyMiddleware(thunk.withExtraArgument(api), router, logger);
  const store = createStore(rootReducer, enhancer);

  if(module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer)
    });
  }

  return store;
}

export default configureStore;