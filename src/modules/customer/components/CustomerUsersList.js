'use strict';

import React, {Component} from "react";
import {push} from "redux-router";
import {Table, Glyphicon, Grid, Row, Col, Button, Modal, Pagination} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as headerActionCreators from "../../header/actions/header";
import * as customerActionCreators from "../actions/customer";
import CustomerUserItem from "./CustomerUserItem";

class CustomerUsersList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      activePage:1,
    }
  }

  componentDidMount() {

    this.props.headerActions.setHeaderActiveTab('customers');
    this.props.customerActions.getCustomerUsers(this.props.selectedCustomer._id);

  }

  goToCreateUser(){

    this.props.routeDispatch(push("/home/customer/" + this.props.selectedCustomer._id + "/details/user/new"));

  }

  handleSelect(eventKey) {

    this.setState({
      activePage: eventKey
    });

  }

  render() {

    let userDetails = null;
    let users = this.props.users.docs;
    let totalPage = this.props.users.pages;
    let pagination = null;

    if (_.size(users) > 0) {

      pagination= <Pagination
                    className="pull-right"
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={totalPage}
                    maxButtons={5}
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect.bind(this)} />

                  userDetails = _.map(_.keys(users), (key) => {
        var user = users[key];
          return (

            <CustomerUserItem user={user} key={user._id} rowId={key}/>

          );
      });
    }else{

      pagination = null;
      userDetails =  <tr>
        <td colSpan="5" className="record-not-found-block">
        No users Found
        </td>
        </tr>
      }

    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Button bsStyle="success"
              className="pull-right top-buffer bottom-buffer"
              onClick={this.goToCreateUser.bind(this)}>
              <Glyphicon glyph="plus"/> Add User
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>

          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Table bordered hover responsive>
              <thead>
                <tr className="table-header">
                  <th>Firstname</th>
                  <th>LastName</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userDetails}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>

          </Col>
        </Row>
      </Grid>
    );

  }

}

const mapStateToProps = (state) => ({
  selectedCustomer: state.customer.selectedCustomer,
  users: state.customer.users,
});

const mapDispatchToProps = (dispatch) => ({
  routeDispatch: dispatch,
  headerActions: bindActionCreators(headerActionCreators, dispatch),
  customerActions: bindActionCreators(customerActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerUsersList);
