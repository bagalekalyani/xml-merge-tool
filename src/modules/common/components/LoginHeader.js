'use strict';

import React, {Component} from "react";
import {push} from "redux-router";
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import * as authActionCreators from "../../login/actions/auth";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class LoginHeader extends Component {

  render() {

    return (
      <Navbar inverse fixedTop fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <img src="img/logo.png" alt="" className="logo"/>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );

  }

}

export default LoginHeader;
