import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import MovieDetailsActions from '../actions/movie-details-page';
import MovieDetail from "../components/MovieDetailPage";


function mapStateToProps(state, ownProps) {
  return {
    ...state.movieDetails,
    movieId: ownProps.params.movieId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MovieDetailsActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail)