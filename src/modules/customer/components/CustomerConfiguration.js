'use strict';

import React, {Component} from "react";
import {push} from "redux-router";
import {Table, Glyphicon, Grid, Row, Col, Button, Pagination} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as customerActionCreators from "../actions/customer";
import CustomerConfigurationList from "./CustomerConfigurationList";

class CustomerConfiguration extends Component {

  componentDidMount() {

    let {selectedCustomer, customerConfigurationPageOffset, paginationLimit} = this.props;
    this.props.customerActions.getCustomerConfigurations(selectedCustomer._id, customerConfigurationPageOffset, paginationLimit);

  }

  onPagination(event) {

    let {paginationLimit, selectedCustomer} = this.props;
    this.props.customerActions.paginateCustomerConfigurationToNextOffset(selectedCustomer._id, event, paginationLimit);
    this.props.routeDispatch(push("/home/customer/" + selectedCustomer._id + "/details/configuration?page="+event));

  }

  componentWillReceiveProps(nextProps) {

    if(_.size(nextProps.configurationList) == 0 && nextProps.customerConfigurationPageOffset != 1 && nextProps.customerConfigurationPageOffset == this.props.customerConfigurationPageOffset){

      let {paginationLimit} = this.props;
      let pageOffset = nextProps.customerConfigurationPageOffset-1;

      this.props.customerActions.paginateCustomerConfigurationToNextOffset(nextProps.selectedCustomer._id, pageOffset, paginationLimit);
      this.props.routeDispatch(push("/home/customer/" + nextProps.selectedCustomer._id + "/details/configuration?page="+pageOffset));

    }

  }

  render() {

    let configurationDetails, pagination = null;
    let {configurationList, customerConfigurationTotalCount, customerConfigurationPageOffset, paginationLimit} = this.props;

    let remainder = customerConfigurationTotalCount % paginationLimit;
    let total = customerConfigurationTotalCount / paginationLimit;

    total = Math.floor(total);
    if (remainder > 0) {
        total = total + 1;
    }

    if (_.size(configurationList) > 0 && customerConfigurationTotalCount > 0) {
      configurationDetails = _.map(_.keys(configurationList), (key) => {
        var configuration = configurationList[key];
          return (

            <CustomerConfigurationList configuration={configuration} key={configuration._id}/>

          );
      });

      if(customerConfigurationTotalCount > paginationLimit){
        pagination =
          <Pagination
            prev
            next
            first
            last
            bsSize="small"
            ellipsis
            boundaryLinks
            items={total}
            maxButtons={3}
            activePage={customerConfigurationPageOffset}
            onSelect={this.onPagination.bind(this)}
            className="top-pagination"/>
      }

    }else{
      configurationDetails =  <tr>
                                <td colSpan="5" className="record-not-found-block">
                                  No Configurations Found
                                </td>
                              </tr>
    }

    return (
      <Grid fluid className="top-buffer">

        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Table striped bordered condensed hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {configurationDetails}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={9} lg={9}>
          </Col>
          <Col xs={12} sm={6} md={3} lg={3}>
              <div className="pull-right">{pagination}</div>
          </Col>
        </Row>

      </Grid>
    );

  }

}


const mapStateToProps = (state) => ({
  selectedCustomer: state.customer.selectedCustomer,
  configurationList: state.customer.configurationList,
  customerConfigurationPageOffset: state.customer.customerConfigurationPageOffset,
  paginationLimit: state.customer.paginationLimit,
  customerConfigurationTotalCount: state.customer.customerConfigurationTotalCount
});

const mapDispatchToProps = (dispatch) => ({
  routeDispatch: dispatch,
  customerActions: bindActionCreators(customerActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerConfiguration);
