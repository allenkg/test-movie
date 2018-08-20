import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router";

class MovieItem extends React.Component {
  static propTypes = {
    movie: PropTypes.object.isRequired,
    genres: PropTypes.object.isRequired

  };

  getGenreName = (id) => {
    const name = this.props.genres[id].name;
    return (
      <div className="category-genre"> {name} &nbsp; </div>
    )
  };

  render() {
    const { movie, genres } = this.props;
    if (Object.values(genres).length === 0 ) {
      return (<div className="sk-spinner sk-spinner-rotating-plane" />)
    }
    return (
      <div className="card-movie">
          <div className="card">
            <Link to={`/details/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt="" className="image"/>

              <div className="overlay">
                <div className="ml-1"><div className="row ">
                  <span className="movie-title text-center">{movie.title}</span>
                </div>
                <div className="row movie-rate">{movie.vote_average}</div>
                <div className="row movie-genre">
                  <div className="col-md-12 mb-1">
                    <div className="text">
                      <div id="hover-title">Жанр</div>
                      {movie.genre_ids.map((genreId, index) =>
                        <span style={{display: "inline-block"}} key={index}> {this.getGenreName(genreId)} </span>
                      )}
                    </div>
                  </div>
                </div></div>
              </div>
            </Link>
          </div>
        </div>
    );
  }
}

export default MovieItem;