'use strict';

import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {push} from "redux-router";
import Header from "../../header/components/Header";
import Footer from "./Footer";
import * as authActionCreators from "../../login/actions/auth";

class Home extends Component {

  componentWillMount () {

    this.checkAuth(this.props.isAuthenticated);

  }

  componentWillReceiveProps (nextProps) {

    this.checkAuth(nextProps.isAuthenticated);

  }

  checkAuth (isAuthenticated) {

    if (!isAuthenticated) {

      let redirectAfterLogin = this.props.location.pathname;
      this.props.routeDispatch(push(`/?next=${redirectAfterLogin}`));
      this.props.authActions.setUrlPath(redirectAfterLogin);
    }

  }

  render() {

    let componentToBeRendered = null;
    componentToBeRendered = this.props.isAuthenticated ? this.props.children : '';

    return (
      <div>
        <Header />

        <div>
          {componentToBeRendered}
        </div>

        <Footer />
      </div>
    );

  }

}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  redirectUrlPath: state.auth.redirectUrlPath
});

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(authActionCreators, dispatch),
  routeDispatch: dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
