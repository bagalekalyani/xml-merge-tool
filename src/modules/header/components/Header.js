'use strict';

import React, {Component} from "react";
import {push} from "redux-router";
import {Navbar, NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as headerActionCreators from "../actions/header";
import * as authActionCreators from "../../login/actions/auth";
import * as customerActionCreators from "../../customer/actions/customer";
import * as userActionCreators from "../../user/actions/user";

class Header extends Component {

  gotoCustomerListing(){

    let customerPageOffset = 1;

    this.props.customerActions.saveCustomerPageOffset(customerPageOffset);
    this.props.routeDispatch(push("/home/customers?page=" + customerPageOffset));
    this.props.headerActions.setHeaderActiveTab('customers');

  }

  goToHome(){

    this.props.routeDispatch(push("/home"));

  }

  logout(){

    this.props.authActions.logout();

  }

  gotoUsersListing(){

    let userPageOffset = 1;

    this.props.userActions.saveUserPageOffset(userPageOffset);
    this.props.routeDispatch(push("/home/users?page=" + userPageOffset));
    this.props.headerActions.setHeaderActiveTab('users');

  }


  render() {

    let role = localStorage.getItem('role');
    let rolesAccessrights = this.props;
    let componentToBeRendered = null;
    componentToBeRendered =
                          <Nav pullRight>
                            {(role && this.props.rolesAccessrights[role]["Header"]["Customers"]) ? <NavItem eventKey={1} onClick={this.gotoCustomerListing.bind(this)} className={this.props.headerActiveTab == 'customers' ? 'active' : ''}>Customers</NavItem> : ''}
                            {(role && this.props.rolesAccessrights[role]["Header"]["Users"]) ? <NavItem eventKey={2} onClick={this.gotoUsersListing.bind(this)}className={this.props.headerActiveTab == 'users' ? 'active' : ''}>Users</NavItem> : ''}
                            {(role && this.props.rolesAccessrights[role]["Header"]["Configuration"]) ? <NavItem eventKey={3} href="#">Configurations</NavItem> : ''}
                            {(role && this.props.rolesAccessrights[role]["Header"]["Merge Scenarios"]) ? <NavItem eventKey={4} href="#">Merge Scenarios</NavItem> : ''}
                            {(role && this.props.rolesAccessrights[role]["Header"]["Admin"]) ? <NavItem eventKey={5} href="#">Admin</NavItem> : ''}
                            {(role && this.props.rolesAccessrights[role]["Header"]["Profile"]) ? <NavItem eventKey={6} href="#">Profile</NavItem> : ''}
                            {(role && this.props.rolesAccessrights[role]["Header"]["Logout"]) ? <NavItem eventKey={7} onClick={this.logout.bind(this)}>Logout</NavItem> : ''}
                          </Nav>
    return (
      <Navbar inverse fixedTop fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <img  src="img/logo.png"
                  className="logo pointer"
                  onClick={this.goToHome.bind(this)}/>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>

            {componentToBeRendered}

        </Navbar.Collapse>
      </Navbar>
    );

  }

}

const mapStateToProps = (state) => ({
  headerActiveTab: state.header.headerActiveTab,
  rolesAccessrights: state.app.rolesAccessrights
});

const mapDispatchToProps = (dispatch) => ({
  routeDispatch: dispatch,
  headerActions: bindActionCreators(headerActionCreators, dispatch),
  authActions: bindActionCreators(authActionCreators, dispatch),
  customerActions: bindActionCreators(customerActionCreators, dispatch),
  userActions: bindActionCreators(userActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
