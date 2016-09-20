'use strict';

import React, {Component} from "react";
import {push} from "redux-router";
import {Panel, Form, FormGroup, FormControl, Col, Button, ControlLabel, Row, Grid, SplitButton, MenuItem} from 'react-bootstrap';
import * as authActionCreators from "../../customer/actions/customer";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as headerActionCreators from "../../header/actions/header";
import * as userActionCreators from "../actions/user";

class UserCreate extends Component {

  constructor(props) {

    super(props);
    this.state = {
      name: '',
      firstName:'',
      lastName:'',
      password:'',
      email: '',
      usernameError: '',
      emailError: '',
      firstNameError:'',
      lastNameError:'',
      passwordError:'',
      serverErrorMessage: false,
      role:'Role Of User',
      roleError:''
    }

  }

  onUserFirstNameChange(e) {

    this.setState({
      firstName: e.target.value,
      firstNameError: (e.target.value !== "") ? "" : "Firstname name is mandatory",
      serverErrorMessage: false
    });

    if (e.target.value == '' && this.state.serverErrorMessage) {
      // this.props.userActions.clearErrorMessage();
    }

  }

  onUserLastNameChange(e) {

    this.setState({
      lastName: e.target.value,
      lastNameError: (e.target.value !== "") ? "" : "Lastname name is mandatory",
      serverErrorMessage: false
    });

    if (e.target.value == '' && this.state.serverErrorMessage) {
      // this.props.userActions.clearErrorMessage();
    }

  }

  onUserPasswordChange(e) {

    this.setState({
      password: e.target.value,
      passwordError: (e.target.value !== "") ? "" : "Password name is mandatory",
      serverErrorMessage: false
    });

    if (e.target.value == '' && this.state.serverErrorMessage) {
      // this.props.userActions.clearErrorMessage();
    }

  }

  onCustomerEmailChange(e) {

    this.setState({
      email: e.target.value,
      emailError: (e.target.value !== "") ? "" : "Email is mandatory",
      serverErrorMessage: false
    });

    if (e.target.value == '' && this.state.serverErrorMessage) {
      // this.props.userActions.clearErrorMessage();
    }

  }

  componentDidMount() {

    this.props.headerActions.setHeaderActiveTab('users');
    var {routeParams, selectedUser} = this.props;
    this.props.userActions.clearErrorMessage();

    if(routeParams.userId && selectedUser == null){

      this.props.userActions.getSingleCustomer(routeParams.userId);
      this.props.routeDispatch(push("/home/user/" + routeParams.userId + "/edit"));

    }
    if(routeParams.userId && selectedUser){

      this.setState({
        firstName: selectedUser.firstName,
        password: selectedUser.password,
        lastName: selectedUser.lastName,
        email: selectedUser.email,
        name: selectedUser.name,
        role: selectedUser.role
      });
    }

  }

  // componentWillReceiveProps(nextProps, nextState) {
  //   if(this.props.selectedCustomer != nextProps.selectedCustomer){
  //     this.setState({
  //       name: nextProps.selectedCustomer.name,
  //       email: nextProps.selectedCustomer.email,
  //     });
  //   }
  // }


  goToUserListing(){

    this.props.routeDispatch(push("/home/users?page=" + this.props.userPageOffset));

  }

  onMenuItemSelect(event){

    let selectedRole = null;
    if(event == 1){
      selectedRole = "Super Admin";
    }
    else if (event == 2) {
      selectedRole = "Centric User";
    }

    this.setState({
      role: selectedRole
    });

  }

  createNewUser(e){

    e.preventDefault();
    e.stopPropagation();

    let firstNameError = "";
    let lastNameError=""
    let emailError = "";
    let passwordError= "";
    let roleError="";

    if (this.state.firstName == "") {
      firstNameError = "Firstname is mandatory";
    }

    if (this.state.lastName == "") {
      lastNameError = "Lastname is mandatory";
    }

    if (this.state.email == "") {
      emailError = "Email is mandatory";
    }

    if (this.state.email == "") {
      passwordError = "Password is mandatory";
    }

    if(this.state.role == "Role Of User"){
      roleError = "Please Select Role";
    }

    this.setState({

      firstNameError: firstNameError,
      emailError: emailError,
      lastNameError: lastNameError,
      passwordError: passwordError,
      roleError: roleError

    });

    let roleOfUser = "";

    if(this.state.role == "Super Admin" || this.state.role == 'super_admin'){
      roleOfUser = 'super_admin';
    }
    else if (this.state.role == "Centric User" || this.state.role == 'centric_user') {
      roleOfUser = 'centric_user';
    }

    if (firstNameError == "" && emailError == "" && lastNameError == "" && passwordError == ""){
      var user = {
        firstName: this.state.firstName,
        email: this.state.email,
        password: this.state.password,
        lastName: this.state.lastName,
        role: roleOfUser
      }

      // if(this.props.routeParams.customerId){
      //   this.props.userActions.updateCustomer(user, this.props.selectedCustomer._id);
      // }
      // else{
        this.props.userActions.createUser(user, this.props.userPageOffset);
      // }
    }
  }

  render() {

    let {statusText} = this.props;
    let buttonStatus = "Create";
    let panelHeader = "Add User";

    if (statusText !== null) {
      this.state.serverErrorMessage = true;
    }
    else {
      this.state.serverErrorMessage = false;
    }

    if(this.props.routeParams.customerId){
      buttonStatus = "Update";
      panelHeader = "Edit User";
    }

    return (

      <Grid>
        <Row>
          <Col lg={8} lgPush={2} md={8} mdPush={2} sm={8} smPush={2} xs={12}>
            <Panel header={panelHeader} bsStyle="info">
              <Form horizontal onSubmit={this.createNewUser.bind(this)}>

                <FormGroup controlId="formHorizontalName">
                  <Col componentClass={ControlLabel} sm={3}>
                  </Col>
                  <Col sm={9}>
                    <p className="text-red">{this.props.statusText}</p>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}>
                    Role<span className="text-red">*</span> :
                  </Col>
                  <Col sm={9}>
                    <SplitButton title={this.state.role} pullRight id="split-button-pull-right" >
                      <MenuItem eventKey="1" onSelect={this.onMenuItemSelect.bind(this)}>Super Admin</MenuItem>
                      <MenuItem eventKey="2" onSelect={this.onMenuItemSelect.bind(this)}>Centric User</MenuItem>
                    </SplitButton>
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalName">
                  <Col componentClass={ControlLabel} sm={3}>
                    Firstname<span className="text-red">*</span>:
                  </Col>
                  <Col sm={9}>
                    <FormControl  type="text"
                                  placeholder="Firstname*"
                                  value={this.state.firstName}
                                  onChange={this.onUserFirstNameChange.bind(this)} />
                    <div className='text-red'>
                      {this.state.firstNameError}
                    </div>
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalName">
                  <Col componentClass={ControlLabel} sm={3}>
                    Lastname<span className="text-red">*</span>:
                  </Col>
                  <Col sm={9}>
                    <FormControl  type="text"
                                  placeholder="Lastname*"
                                  value={this.state.lastName}
                                  onChange={this.onUserLastNameChange.bind(this)} />
                    <div className='text-red'>
                      {this.state.lastNameError}
                    </div>
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={3}>
                    Password<span className="text-red">*</span>:
                  </Col>
                  <Col sm={9}>
                    <FormControl  type="password"
                                  placeholder="Password*"
                                  value={this.state.password}
                                  onChange={this.onUserPasswordChange.bind(this)} />
                    <div className='text-red'>
                      {this.state.passwordError}
                    </div>
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={3}>
                    Email<span className="text-red">*</span>:
                  </Col>
                  <Col sm={9}>
                    <FormControl  type="email"
                                  placeholder="Email*"
                                  value={this.state.email}
                                  onChange={this.onCustomerEmailChange.bind(this)} />
                    <div className='text-red'>
                      {this.state.emailError}
                    </div>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={3} sm={12}>
                    <Button bsStyle="primary"
                            type="submit">
                      {buttonStatus}
                    </Button>
                    <Button className="left-buffer"
                            onClick={this.goToUserListing.bind(this)}>
                      Back
                    </Button>
                  </Col>
                </FormGroup>

              </Form>
            </Panel>
          </Col>
        </Row>
      </Grid>

    );

  }

}


const mapStateToProps = (state) => ({
  selectedUser: state.user.selectedUser,
  statusText: state.user.statusText,
  userPageOffset: state.user.userPageOffset,
});

const mapDispatchToProps = (dispatch) => ({
  routeDispatch: dispatch,
  headerActions: bindActionCreators(headerActionCreators, dispatch),
  userActions: bindActionCreators(userActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserCreate);
