import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router";
import swal from 'sweetalert2';
import InfiniteScroll from 'react-infinite-scroller';
import MovieItem from "./MovieItem";


class MainPage extends React.Component {

  static propTypes = {
    genres: PropTypes.object.isRequired,
    movies: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasSearchResult: PropTypes.bool.isRequired,
    pageNumber: PropTypes.number.isRequired,
    actions: PropTypes.shape({
      fetchGenres: PropTypes.func.isRequired,
      fetchMovies: PropTypes.func.isRequired,
      searchForMovies: PropTypes.func.isRequired
    })
  };

  componentDidMount() {
    this.props.actions.fetchGenres();
  }

  loadMovies(page) {
    if (this.props.hasSearchResult && this.props.pageNumber < this.props.totalPages) {
      this.props.actions.searchForMovies(page)
    } else if (!this.props.hasSearchResult && !this.props.isLoading) {
      this.props.actions.fetchMovies(page);
    }
  }

  hasMore = () => {
    return (this.props.totalPages - this.props.pageNumber) > 0
  };

  render() {
    const {movies, genres} = this.props;

    return (
      <div className="container">
        <div>
          <InfiniteScroll
            pageStart={this.props.pageNumber}
            loadMore={this.loadMovies.bind(this)}
            hasMore={this.hasMore}
            loader={<div className="loader"/>}
          >
            <div className="row">
              {movies.map((movie, index) =>
                <MovieItem movie={movie} genres={genres} key={index}/>
              )}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    );
  }


}

export default MainPage;
