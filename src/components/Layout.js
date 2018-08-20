import React from 'react';
import PropTypes from 'prop-types';
import TopMenu from "../containers/TopMenu.container"

class Layout extends React.Component {
  static propTypes = {

  };

  render() {
    return (
      <div>
        <TopMenu/>
        <div style={{marginTop: "70px"}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;