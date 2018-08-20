import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Layout from "../components/Layout";
import MainPageActions from '../actions/main-page';

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(MainPageActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)