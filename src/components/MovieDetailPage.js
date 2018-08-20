import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router";
import ReactPlayer from 'react-player'
import {Carousel} from "react-responsive-carousel";
import Slider from "react-slick";

class MovieDetail extends React.Component {

  static propTypes = {
    movieId: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    similarMovies: PropTypes.array.isRequired,
    recommendedMovies: PropTypes.array.isRequired,
    movieDetails: PropTypes.object.isRequired,
    movieCredits: PropTypes.array.isRequired,
    trailerLinkId: PropTypes.string,
    actions: PropTypes.shape({
      getMovieDetails: PropTypes.func.isRequired,
      showMovie: PropTypes.func.isRequired,
      fetchSimilarMovies: PropTypes.func.isRequired,
      fetchRecommendedMovies: PropTypes.func.isRequired,
      fetchMovieCredits: PropTypes.func.isRequired,
      getMovieTrailer: PropTypes.func.isRequired,
      setInitialState: PropTypes.func.isRequired,
    })
  };

  componentDidMount() {
    this.props.actions.getMovieDetails(this.props.movieId);
    this.props.actions.fetchSimilarMovies(this.props.movieId);
    this.props.actions.fetchMovieCredits(this.props.movieId);
    this.props.actions.getMovieTrailer(this.props.movieId);
  }

  changeMovieToShow = (movieId) => {
    this.props.actions.showMovie(movieId);
    this.props.actions.getMovieDetails(movieId);
    this.props.actions.fetchSimilarMovies(movieId);
    this.props.actions.fetchMovieCredits(movieId);
    this.props.actions.getMovieTrailer(movieId);
  };


  render() {

    const {movieDetails, isLoading, similarMovies, movieCredits, trailerLinkId} = this.props;
    if (isLoading) {
      return (<div className="loader"/>)
    }

    const settings = {
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            centerPadding: '0px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 2
          }
        }
      ]
    };

    return (
      <div className="container">
        <div className="row mt-lg-1">
          <div className="col-md-4 col-xs-12">
            <div className="card">
              <img className="img-thumbnail"
                   src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movieDetails.poster_path}`} alt=""/>
            </div>
            <h2>
              <span className="badge badge-secondary" id="movie-detail-rate">
            <i className="fa fa-star"/> {movieDetails.vote_average}
          </span></h2>
            {
              movieDetails.genres &&
              movieDetails.genres.map((genre, index) =>
                <a href="#" key={index} className="small-text genre-link text-capitalize">{genre.name} &nbsp;/ </a>
              )
            }
          </div>

          <div className="col-md-8 col-xs-12">
            <h3 className="mt-lg-3">{movieDetails.title}</h3>
            <h6 className="text-muted mt-lg-5">Описание</h6>
            <p className="">{movieDetails.overview}</p>

            <ReactPlayer url={`https://www.youtube.com/watch?v=${trailerLinkId}`}/>

            <div className="mt-lg-5">

              <span> В ролях</span>

              <Slider {...settings}>
                {movieCredits.map((actorInfo, index) =>
                  <div key={index}>
                    <img src={`https://image.tmdb.org/t/p/w138_and_h175_face${actorInfo.profile_path}`} alt=""/>
                    <div><span>{actorInfo.name}</span></div>
                    <small className="text-muted">{actorInfo.character}</small>
                  </div>
                )}
              </Slider>
            </div>
          </div>
        </div>

        <div className="col-md-12 col-xs-12">
          <div className="text-left mb-1 mt-lg-4 text-muted"> Похожие фильмы</div>
          {similarMovies.slice(1, 8).map((movie, index) =>
            <Link to={`/details/${movie.id}`}><img
              src={`https://image.tmdb.org/t/p/w138_and_h175_face${movie.poster_path}`} alt=""
              className="rounded related-image m-1" onClick={this.changeMovieToShow.bind(null, movie.id)} key={index}/></Link>
          )}
        </div>
      </div>
    );
  }
}

export default MovieDetail;
