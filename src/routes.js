import React from 'react';
import App from "./containers/App";
import { IndexRoute, Route } from "react-router";
import MainPage from './containers/MainPage.container';
import MovieDetailPage from './containers/MovieDetailPage.container';
import NotFoundPage from "./components/NotFoundPage";
import Layout from "./containers/Layout";

export default (
  <Route component={App}>
    <Route path="/" component={Layout}>
        <IndexRoute component={MainPage} />
        <Route path="details/:movieId" component={MovieDetailPage}/>
        <Route path="404" component={NotFoundPage} />
        <Route path="*" component={NotFoundPage} />
    </Route>
  </Route>
)