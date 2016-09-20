'use strict';

import React, {Component} from "react";
import {push} from "redux-router";
import {Table, Glyphicon, Grid, Row, Col, Button} from 'react-bootstrap';
import * as authActionCreators from "../actions/customer";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import CustomerInfo from "./CustomerInfo";
import CustomerHistory from "./CustomerHistory";
import CustomerActions from "./CustomerActions";
import * as headerActionCreators from "../../header/actions/header";
import * as customerActionCreators from "../actions/customer";

class CustomerDetails extends Component {

  componentDidMount() {

    this.props.headerActions.setHeaderActiveTab('customers');

    let urlPath = this.props.location.pathname;

    let searchText = this.props.location.search;
    let customerConfigurationPageOffset = parseInt(searchText.split("=")[1]);

    let urlValues = urlPath.split("/");
    let customerId = urlValues[3];
    let customeractiveTab = urlValues[5];
    let activeKey = null;

    if(customeractiveTab == 'configuration'){
      activeKey = 1;
    }else if(customeractiveTab == 'merge'){
      activeKey = 2;
    }else if(customeractiveTab == 'stories'){
      activeKey = 3;
    }else if(customeractiveTab == 'users'){
      activeKey = 4;
    }
    this.props.customerActions.setCustomerActiveTab(customeractiveTab, customerId, activeKey);
    this.props.customerActions.getSingleCustomer(customerId);
    this.props.customerActions.saveCustomerConfigurationPageOffset(customerConfigurationPageOffset);
  }

  render() {

    let componentToBeRendered = <div></div>
    if(this.props.selectedCustomer){
      componentToBeRendered = <Row>
                                <Col xs={4}>
                                  <CustomerInfo />
                                  <CustomerHistory />
                                </Col>
                                <Col xs={8}>
                                  <CustomerActions />
                                </Col>
                              </Row>

    }

    return (
      <Grid fluid>
        {componentToBeRendered}
      </Grid>
    );

  }

}


const mapStateToProps = (state) => ({
  selectedCustomerId: state.customer.selectedCustomerId,
  customerActiveTab: state.customer.customerActiveTab,
  selectedCustomer: state.customer.selectedCustomer
});

const mapDispatchToProps = (dispatch) => ({
  routeDispatch: dispatch,
  headerActions: bindActionCreators(headerActionCreators, dispatch),
  customerActions: bindActionCreators(customerActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetails);
