'use strict';

import React, {Component} from "react";
import {push} from "redux-router";
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class LoginHeader extends Component {

  gotoCustomerListing(){
    this.props.routeDispatch(push("/home/customers"));
  }

  render() {

    return (
      <Navbar inverse fixedTop fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <img src="img/logo.png" alt="" className="logo"/>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} onClick={this.gotoCustomerListing.bind(this)}>Customers</NavItem>
            <NavItem eventKey={2} href="#">Configurations</NavItem>
            <NavItem eventKey={3} href="#">Merge Scenarios</NavItem>
            <NavItem eventKey={4} href="#">Admin</NavItem>
            <NavItem eventKey={5} href="#">Profile</NavItem>
            <NavItem eventKey={6} href="#">Logout</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

  }

}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  routeDispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginHeader);

