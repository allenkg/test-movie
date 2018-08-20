import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import MainPageActions from "../actions/main-page";
import TopMenu from "../components/TopMenu";

function mapStateToProps(state) {
  return state.mainPage
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MainPageActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu)