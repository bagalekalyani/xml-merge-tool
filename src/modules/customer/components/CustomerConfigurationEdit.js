'use strict';

import React, {Component} from "react";
import {push} from "redux-router";
import {Panel, Form, FormGroup, FormControl, Col, Button, ControlLabel, Row, Grid} from 'react-bootstrap';
import * as authActionCreators from "../actions/customer";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as headerActionCreators from "../../header/actions/header";
import * as customerActionCreators from "../actions/customer";

class CustomerConfigurationEdit extends Component {

  constructor(props) {

    super(props);
    this.state = {
      name: null,
      configurationNameError: ''
    }

  }

  onCustomerConfigurationNameChange(e) {

    this.setState({
      name: e.target.value,
      configurationNameError: (e.target.value !== "") ? "" : "Configuration name is mandatory"
    });

    if (e.target.value == '') {
      this.props.customerActions.clearErrorMessage();
    }

  }

  componentDidMount() {

    var {selectedCustomer, selectedConfiguration} = this.props;
    this.props.customerActions.clearErrorMessage();

    let urlPath = this.props.location.pathname;
    let urlValues = urlPath.split("/");
    let customerId = urlValues[3];
    let configurationId = urlValues[6];

    if(selectedCustomer == null || selectedConfiguration == null){

      this.props.customerActions.getSingleCustomer(customerId);
      this.props.customerActions.getSingleCustomerConfiguration(customerId, configurationId);
      this.props.routeDispatch(push("/home/customer/" + customerId + "/details/configuration/" + configurationId + "/edit"));

    }

    if(selectedConfiguration) {
      this.setState({
        name: selectedConfiguration.name
      });
    }

  }

  componentWillReceiveProps(nextProps) {

    if(this.props.selectedConfiguration != nextProps.selectedConfiguration){
      this.setState({
        name: nextProps.selectedConfiguration.name
      });
    }

  }

  goToCustomerDetails(){

    let {selectedCustomer, customerConfigurationPageOffset} = this.props;
    this.props.routeDispatch(push("/home/customer/" + selectedCustomer._id + "/details/configuration?page=" + customerConfigurationPageOffset));

  }


  editCustomerConfiguration(e){

    e.preventDefault();
    e.stopPropagation();

    let configurationNameError = "";
    let {selectedCustomer, selectedConfiguration, customerConfigurationPageOffset} = this.props;

    if (this.state.name == "") {
      configurationNameError = "Configuration name is mandatory";
    }

    this.setState({
      configurationNameError: configurationNameError
    });

    if (configurationNameError == ""){
      var configuration = {
        name: this.state.name,
      }

      this.props.customerActions.updateCustomerConfiguration(configuration, selectedCustomer._id, selectedConfiguration._id, customerConfigurationPageOffset);
    }
  }


  render() {

    return (

      <Grid>
        <Row>
          <Col lg={8} lgPush={2} md={8} mdPush={2} sm={8} smPush={2} xs={12}>
            <Panel header="Edit Configuration" bsStyle="info">
              <Form horizontal onSubmit={this.editCustomerConfiguration.bind(this)}>

                <FormGroup controlId="formHorizontalName">
                  <Col componentClass={ControlLabel} sm={3}>
                  </Col>
                  <Col sm={9}>
                    <p className="text-red top-buffer">{this.props.statusText}</p>
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalName">
                  <Col componentClass={ControlLabel} sm={3}>
                    Configuration Name<span className="text-red">*</span>:
                  </Col>
                  <Col sm={9}>
                    <FormControl  type="text"
                                  autoFocus
                                  placeholder="Configuration Name*"
                                  value={this.state.name}
                                  onChange={this.onCustomerConfigurationNameChange.bind(this)} />
                    <div className='text-red'>
                      {this.state.configurationNameError}
                    </div>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={3} sm={9}>
                    <Button bsStyle="primary"
                            type="submit">
                      Update
                    </Button>
                    <Button className="left-buffer"
                            onClick={this.goToCustomerDetails.bind(this)}>
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
  selectedConfiguration: state.customer.selectedConfiguration,
  customerConfigurationPageOffset: state.customer.customerConfigurationPageOffset
});

const mapDispatchToProps = (dispatch) => ({
  routeDispatch: dispatch,
  customerActions: bindActionCreators(customerActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerConfigurationEdit);
