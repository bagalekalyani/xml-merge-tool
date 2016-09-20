'use strict';

import React, {Component} from "react";
import {push} from "redux-router";
import {Table, Glyphicon, Grid, Row, Col, Button, Modal, Pagination} from 'react-bootstrap';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as headerActionCreators from "../../header/actions/header";
import * as customerActionCreators from "../actions/customer";
import CustomerItem from "./CustomerItem";

class CustomerList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      alertType: null
    }
  }

  goToCreateCustomer() {

    this.props.routeDispatch(push("/home/customer/new"));

  }

  componentDidMount() {

    let urlPath = this.props.location.pathname;
    let searchText = this.props.location.search;
    let pageNumber = parseInt(searchText.split("=")[1]);
    let {customerPageOffset, paginationLimit} = this.props;

    this.props.headerActions.setHeaderActiveTab('customers');
    this.props.customerActions.saveCustomerPageOffset(pageNumber);
    this.props.customerActions.getCustomers(pageNumber, paginationLimit);

  }

  closeModal(){

    this.setState({showModal: false});
    this.props.customerActions.emptyStatusText();

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.statusText != null) {

      if(nextProps.statusType == "success"){
        this.setState({
          alertType: "success-msg",
          showModal: true
        });

      }else if(nextProps.statusType == "danger"){
        this.setState({
          alertType: "danger-msg",
          showModal: true
        });
      }

    }

    if(_.size(nextProps.customers) == 0 && nextProps.customerPageOffset != 1 &&
      nextProps.customerPageOffset == this.props.customerPageOffset){

      let {paginationLimit} = this.props;
      let pageOffset = nextProps.customerPageOffset-1;

      this.props.customerActions.paginateCustomerToNextOffset(pageOffset, paginationLimit);
      this.props.routeDispatch(push("/home/customers?page="+pageOffset));

    }

  }

  onPagination(event) {

    let {paginationLimit} = this.props;
    this.props.customerActions.paginateCustomerToNextOffset(event, paginationLimit);
    this.props.routeDispatch(push("/home/customers?page="+event));

  }

  render() {

    let customerDetails, pagination = null;
    let {customers, customerTotalCount, customerPageOffset, paginationLimit} = this.props;

    let remainder = customerTotalCount % paginationLimit;
    let total = customerTotalCount / paginationLimit;

    total = Math.floor(total);
    if (remainder > 0) {
        total = total + 1;
    }

    if (_.size(customers) > 0 && customerTotalCount > 0) {
      customerDetails = _.map(_.keys(customers), (key) => {
        var customer = customers[key];
          return (

            <CustomerItem customer={customer} key={customer._id} rowId={key}/>

          );
      });

      if(customerTotalCount > paginationLimit){
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
            activePage={customerPageOffset}
            onSelect={this.onPagination.bind(this)}
            className="top-pagination"/>
      }

    }else{
      customerDetails = <tr>
                          <td colSpan="5" className="record-not-found-block">
                            No Customers Found
                          </td>
                        </tr>
    }


  return (

    <Grid fluid>
      <Row>
        <Col xs={12} sm={6} md={9} lg={9}>
            {pagination}
        </Col>
        <Col xs={12} sm={6} md={3} lg={3}>
          <Button bsStyle="success"
            className="bottom-buffer-20 pull-right"
            onClick={this.goToCreateCustomer.bind(this)}>
            <Glyphicon glyph="plus"/> Add Customer
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Table bordered hover responsive>
            <thead>
              <tr className="table-header">
                <th>Name</th>
                <th>No. of Configurations</th>
                <th>No. of Merge Scenarios</th>
                <th>No. of Stories</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customerDetails}
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
      <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Configuration File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className={this.state.alertType}>{this.props.statusText}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeModal.bind(this)} bsStyle="primary">OK</Button>
        </Modal.Footer>
      </Modal>
    </Grid>
    );

  }

}

const mapStateToProps = (state) => ({
  selectedCustomerId: state.customer.selectedCustomerId,
  customerActiveTab: state.customer.customerActiveTab,
  customers: state.customer.customers,
  statusText: state.customer.statusText,
  statusType: state.customer.statusType,
  customerPageOffset: state.customer.customerPageOffset,
  customerTotalCount: state.customer.customerTotalCount,
  paginationLimit: state.customer.paginationLimit
});

const mapDispatchToProps = (dispatch) => ({
  routeDispatch: dispatch,
  headerActions: bindActionCreators(headerActionCreators, dispatch),
  customerActions: bindActionCreators(customerActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
