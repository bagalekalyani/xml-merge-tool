'use strict';

import React, {Component} from "react";
import {push} from "redux-router";
import {Panel, Form, FormGroup, FormControl, Col, Button, ControlLabel, Row, Grid} from 'react-bootstrap';
import * as authActionCreators from "../actions/customer";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as headerActionCreators from "../../header/actions/header";
import * as customerActionCreators from "../actions/customer";

class CustomerCreate extends Component {

  constructor(props) {

    super(props);
    this.state = {
      name: '',
      email: '',
      usernameError: '',
      emailError: '',
      serverErrorMessage: false,
    }

  }

  onCustomerNameChange(e) {

    this.setState({
      name: e.target.value,
      usernameError: (e.target.value !== "") ? "" : "Customer name is mandatory",
      serverErrorMessage: false
    });

    if (e.target.value == '' && this.state.serverErrorMessage) {
      this.props.customerActions.clearErrorMessage();
    }

  }

  onCustomerEmailChange(e) {

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

    var {routeParams, selectedCustomer} = this.props;
    this.props.headerActions.setHeaderActiveTab('customers');
    this.props.customerActions.clearErrorMessage();

    if(routeParams.customerId && selectedCustomer == null){

      this.props.customerActions.getSingleCustomer(routeParams.customerId);
      this.props.routeDispatch(push("/home/customer/" + routeParams.customerId + "/edit"));

    }
    if(routeParams.customerId && selectedCustomer){

      this.setState({
        name: selectedCustomer.name,
        email: selectedCustomer.email,
      });

    }

  }

  componentWillReceiveProps(nextProps, nextState) {

    if(this.props.selectedCustomer != nextProps.selectedCustomer){
      this.setState({
        name: nextProps.selectedCustomer.name,
        email: nextProps.selectedCustomer.email
      });
    }

  }


  goToCustomerListing(){

    let {customerPageOffset} = this.props;
    this.props.routeDispatch(push("/home/customers?page="+customerPageOffset));

  }


  createNewCustomer(e){

    e.preventDefault();
    e.stopPropagation();

    let usernameError = "";
    let emailError = "";
    let {customerPageOffset} = this.props;

    if (this.state.name == "") {
      usernameError = "Customer name is mandatory";
    }

    if (this.state.email == "") {
      emailError = "Email is mandatory";
    }

    this.setState({

      usernameError: usernameError,
      emailError: emailError,

    });

    if (usernameError == "" && emailError == ""){
      var customer = {
        name: this.state.name,
        email: this.state.email
      }

      if(this.props.routeParams.customerId){
        this.props.customerActions.updateCustomer(customer, this.props.selectedCustomer._id, customerPageOffset);
      }
      else{
        this.props.customerActions.createCustomer(customer, customerPageOffset);
      }
    }
  }

  render() {

    let {statusText} = this.props;
    let buttonStatus = "Create";
    let panelHeader = "Add Customer";

    if (statusText !== null) {
      this.state.serverErrorMessage = true;
    }
    else {
      this.state.serverErrorMessage = false;
    }

    if(this.props.routeParams.customerId){
      buttonStatus = "Update";
      panelHeader = "Edit Customer";
    }

    return (

      <Grid>
        <Row>
          <Col lg={8} lgPush={2} md={8} mdPush={2} sm={8} smPush={2} xs={12}>
            <Panel header={panelHeader} bsStyle="info">
              <Form horizontal onSubmit={this.createNewCustomer.bind(this)}>

                <FormGroup controlId="formHorizontalName">
                  <Col componentClass={ControlLabel} sm={3}>
                  </Col>
                  <Col sm={9}>
                    <p className="text-red top-buffer">{this.props.statusText}</p>
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalName">
                  <Col componentClass={ControlLabel} sm={3}>
                    Customer Name<span className="text-red">*</span>:
                  </Col>
                  <Col sm={9}>
                    <FormControl  type="text"
                                  autoFocus
                                  placeholder="Customer Name*"
                                  value={this.state.name}
                                  onChange={this.onCustomerNameChange.bind(this)} />
                    <div className='text-red'>
                      {this.state.usernameError}
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
                  <Col smOffset={3} sm={9}>
                    <Button bsStyle="primary"
                            type="submit">
                      {buttonStatus}
                    </Button>
                    <Button className="left-buffer"
                            onClick={this.goToCustomerListing.bind(this)}>
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
  statusText: state.customer.statusText,
  customerPageOffset: state.customer.customerPageOffset,
});

const mapDispatchToProps = (dispatch) => ({
  routeDispatch: dispatch,
  headerActions: bindActionCreators(headerActionCreators, dispatch),
  customerActions: bindActionCreators(customerActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerCreate);
