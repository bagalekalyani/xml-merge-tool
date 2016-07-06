'use strict';

import React, {Component} from "react";
import {push} from "redux-router";
import {Navbar, NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as headerActionCreators from "../actions/header";

class LoginHeader extends Component {

  gotoCustomerListing(){
    this.props.routeDispatch(push("/home/customers"));
    this.props.headerActions.setHeaderActiveTab('customers');
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
            <NavItem eventKey={1} onClick={this.gotoCustomerListing.bind(this)} className={this.props.headerActiveTab == 'customers' ? 'active' : ''}>Customers</NavItem>
            <NavDropdown eventKey={2} title="Customers" id="basic-nav-dropdown">
              <MenuItem eventKey={2.1}>Add New Customer</MenuItem>
              <MenuItem eventKey={2.2}>Customer List</MenuItem>
            </NavDropdown>
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
  headerActiveTab: state.header.headerActiveTab,
});

const mapDispatchToProps = (dispatch) => ({
  routeDispatch: dispatch,
  headerActions: bindActionCreators(headerActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginHeader);

