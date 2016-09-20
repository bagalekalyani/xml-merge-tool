'use strict';

import React, {Component} from "react";
import {push} from "redux-router";
import {Panel, Form, FormGroup, FormControl, Col, Button, ControlLabel, Row, Grid, SplitButton, MenuItem, HelpBlock} from 'react-bootstrap';
import * as authActionCreators from "../../customer/actions/customer";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as headerActionCreators from "../../header/actions/header";
import * as customerActionCreators from "../actions/customer";

class CustomerUserCreate extends Component {

  constructor(props) {

    super(props);
    this.state = {
      name: '',
      firstName:'',
      lastName:'',
      password:'',
      customer:'',
      email: '',
      usernameError: '',
      emailError: '',
      firstNameError:'',
      lastNameError:'',
      passwordError:'',
      customerError:'',
      confirmPassword:'',
      confirmPasswordError:'',
      serverErrorMessage: false,
      role:'Role Of User',
      roleError:'',
      value:'',
      passwordNotMatchError:'',
    }

  }

  onUserFirstNameChange(e) {

    this.setState({
      firstName: e.target.value,
      firstNameError: (e.target.value !== "") ? "" : "Firstname name is mandatory",
      serverErrorMessage: false
    });

    if (e.target.value == '' && this.state.serverErrorMessage) {
      this.props.customerActions.clearErrorMessage();
    }

  }

  onUserLastNameChange(e) {

    this.setState({
      lastName: e.target.value,
      lastNameError: (e.target.value !== "") ? "" : "Lastname name is mandatory",
      serverErrorMessage: false
    });

    if (e.target.value == '' && this.state.serverErrorMessage) {
      this.props.customerActions.clearErrorMessage();
    }

  }

  onUserPasswordChange(e) {

    let passwordNotMatchError='';

    if(this.state.password === this.state.confirmPassword){
      passwordNotMatchError='';
    }

    this.setState({
      password: e.target.value,
      passwordNotMatchError: passwordNotMatchError,
      passwordError: (e.target.value !== "") ? "" : "Password is mandatory",
      serverErrorMessage: false
    });

    if (e.target.value == '' && this.state.serverErrorMessage) {
      this.props.customerActions.clearErrorMessage();
    }

  }

  onUserConfirmPasswordChange(e) {

    let passwordNotMatchError='';

    if(this.state.password === this.state.confirmPassword){
      passwordNotMatchError='';
    }

    this.setState({
      confirmPassword: e.target.value,
      passwordNotMatchError: passwordNotMatchError,
      confirmPasswordError: (e.target.value !== "") ? "" : "Confirm Password is mandatory",
      serverErrorMessage: false
    });

    if (e.target.value == '' && this.state.serverErrorMessage) {
      this.props.customerActions.clearErrorMessage();
    }

  }

  onCustomerUserEmailChange(e) {

    this.setState({
      email: e.target.value,
      emailError: (e.target.value !== "") ? "" : "Email is mandatory",
      serverErrorMessage: false
    });

    if (e.target.value == '' && this.state.serverErrorMessage) {
      this.props.customerActions.clearErrorMessage();
    }

  }

  componentDidMount() {

    let urlPath = this.props.location.pathname;
    let urlValues = urlPath.split("/");
    let customeIdFromUrl = urlValues[3];
    let userIdFromUrl = urlValues[6]
    let {selectedCustomer, selectedUser} = this.props;

    this.props.headerActions.setHeaderActiveTab('customers');
    this.props.customerActions.clearErrorMessage();

    if(urlValues[7] == "edit"){

      this.props.customerActions.getSingleCustomerUser(userIdFromUrl);

    }
    if(urlValues[6] == "new"){

      this.setState({
        firstName: this.state.firstName,
        password: this.state.password,
        lastName: this.state.lastName,
        email: this.state.email,
        name: this.state.name,
        role: this.state.role
      });

    }

    if(selectedCustomer == null){

      this.props.customerActions.getSingleCustomer(customeIdFromUrl);

    }

  }

  componentWillReceiveProps(nextProps, nextState) {

    if(this.props.selectedUser != nextProps.selectedUser){
      let roleOfUser = null;
      if(nextProps.selectedUser.role == 'customer_admin'){
        roleOfUser = 'Customer Admin';
      }
      else if (nextProps.selectedUser.role == 'customer_staff') {
        roleOfUser = 'Customer Staff';
      }
      this.setState({
        firstName: nextProps.selectedUser.firstName,
        lastName: nextProps.selectedUser.lastName,
        email: nextProps.selectedUser.email,
        name: nextProps.selectedUser.name,
        role: roleOfUser
      });
    }

  }

  goToUserListing(){

    this.props.routeDispatch(push("/home/customer/" + this.props.selectedCustomer._id + "/details/users"));

  }

  onMenuItemSelect(event){

    let selectedRole = null;
    if(event == 1){
      selectedRole = "Customer Admin";
    }
    else if (event == 2) {
      selectedRole = "Customer Staff";
    }

    this.setState({
      role: selectedRole,
      roleError: ''
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
    let confirmPasswordError = "";
    let passwordNotMatchError = "";

    let urlPath = this.props.location.pathname;
    let urlValues = urlPath.split("/");
    if (this.state.firstName == "") {
      firstNameError = "Firstname is mandatory";
    }

    if (this.state.lastName == "") {
      lastNameError = "Lastname is mandatory";
    }

    if (this.state.email == "") {
      emailError = "Email is mandatory";
    }

    if(urlValues[6] == 'new'){
      if (this.state.password == "") {
        passwordError = "Password is mandatory";
      }

      if(this.state.role == "Role Of User"){
        roleError = "Please Select Role";
      }

      if(this.state.confirmPassword == ""){
        confirmPasswordError = "Confirm Password is mandatory";
      }

      if(this.state.confirmPassword != this.state.password){
        passwordNotMatchError = "Password and Confirm Password does not match"
      }

      if(this.state.confirmPassword == this.state.password ){
        if(this.state.password.length < 5){
          passwordNotMatchError = "Password must be 5 character";
        }
      }
    }

    this.setState({

      firstNameError: firstNameError,
      emailError: emailError,
      lastNameError: lastNameError,
      passwordError: passwordError,
      roleError: roleError,
      confirmPasswordError: confirmPasswordError,
      passwordNotMatchError: passwordNotMatchError
    });

    let roleOfUser = "";

    if(this.state.role == "Customer Admin" || this.state.role == 'customer_admin'){
      roleOfUser = 'customer_admin';
    }
    else if (this.state.role == "Customer Staff" || this.state.role == 'customer_staff') {
      roleOfUser = 'customer_staff';
    }

    if (firstNameError == "" && emailError == "" && lastNameError == "" && roleError == ""){
      if(passwordError == "" && urlValues[6] == "new" && passwordNotMatchError == ""){

        var user = {
          firstName: this.state.firstName,
          email: this.state.email,
          password: this.state.password,
          lastName: this.state.lastName,
          _customer: this.props.selectedCustomer._id,
          role: roleOfUser
        }

        this.props.customerActions.createCustomerUser(user, this.props.selectedCustomer._id);

      }

      else if (urlValues[7] == "edit") {
        var user = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          role: roleOfUser
        }

        this.props.customerActions.updateCustomerUser(user, this.props.selectedUser._id);
      }
    }
  }

  getValidationStateForConfirmPass() {
    const length = this.state.confirmPassword.length;
    if (length > 5 ) return 'success';
    else if (length > 3) return 'warning';
    else if (length > 0) return 'error';
  }

  getValidationStateForPass() {
    const length = this.state.password.length;
    if (length > 5 ) return 'success';
    else if (length > 3) return 'warning';
    else if (length > 0) return 'error';
  }

  render() {

    let {statusText} = this.props;
    let buttonStatus = "Create";
    let panelHeader = "Add User";
    let isEmailShowOrHide = null;

    if (statusText !== null) {
      this.state.serverErrorMessage = true;
    }
    else {
      this.state.serverErrorMessage = false;
    }

    let urlPath = this.props.location.pathname;
    let urlValues = urlPath.split("/");
    let password = null;
    let confirmPassword = null;
    let spanForEmail = null;

    if(urlValues[6] == "new"){
      password= <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationStateForPass()}>
                <Col componentClass={ControlLabel} sm={3}>
                  Password<span className="text-red">*</span>:
                </Col>
                <Col sm={9}>
                  <FormControl
                    type="password"
                    value={this.state.password}
                    placeholder="Enter text"
                    onChange={this.onUserPasswordChange.bind(this)}
                  />
                  <FormControl.Feedback />
                    <div className='text-red'>
                      {this.state.passwordError}
                    </div>
                </Col>
              </FormGroup>

      confirmPassword= <FormGroup
                          controlId="formBasicText"
                          validationState={this.getValidationStateForConfirmPass()}>
                          <Col componentClass={ControlLabel} sm={3}>
                            Confirm Password<span className="text-red">*</span>:
                          </Col>
                          <Col sm={9}>
                            <FormControl
                              type="password"
                              value={this.state.confirmPassword}
                              placeholder="Enter text"
                              onChange={this.onUserConfirmPasswordChange.bind(this)}
                            />
                            <FormControl.Feedback />
                              <div className='text-red'>
                                {this.state.confirmPasswordError}
                              </div>
                          </Col>
                        </FormGroup>

      panelHeader= "Add User";
      buttonStatus = "Create";
      isEmailShowOrHide = false;
      spanForEmail = <span className="text-red">*</span>;
    }

    else if(urlValues[7] == "edit"){
      password= null;
      confirmPassword= null;
      panelHeader= "Edit User";
      buttonStatus = "Update";
      isEmailShowOrHide = true;
      spanForEmail = null;
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
                    <p className="text-red">{this.state.passwordNotMatchError}</p>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}>
                    Role<span className="text-red">*</span> :
                  </Col>
                  <Col sm={9}>
                    <SplitButton title={this.state.role}>
                      <MenuItem eventKey="1" onSelect={this.onMenuItemSelect.bind(this)}>Customer Admin</MenuItem>
                      <MenuItem eventKey="2" onSelect={this.onMenuItemSelect.bind(this)}>Customer Staff</MenuItem>
                    </SplitButton>
                    <div className='text-red'>
                      {this.state.roleError}
                    </div>
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

                {password}

                {confirmPassword}

                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={3}>
                    Email{spanForEmail}:
                  </Col>
                  <Col sm={9}>
                    <FormControl  type="email"
                                  placeholder="Email*"
                                  disabled={isEmailShowOrHide}
                                  value={this.state.email}
                                  onChange={this.onCustomerUserEmailChange.bind(this)} />
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
  selectedCustomer: state.customer.selectedCustomer,
  selectedUser: state.customer.selectedUser,
  statusText: state.customer.statusText
});

const mapDispatchToProps = (dispatch) => ({
  routeDispatch: dispatch,
  headerActions: bindActionCreators(headerActionCreators, dispatch),
  customerActions: bindActionCreators(customerActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerUserCreate);
