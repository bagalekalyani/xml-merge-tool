'use strict';

import React, {Component} from "react";
import {push} from "redux-router";
import {Table, Glyphicon, Grid, Row, Col, Button, Pagination} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as headerActionCreators from "../../header/actions/header";
import * as userActionCreators from "../actions/user";
import UserItem from "./UserItem";

class UsersList extends Component {

  componentDidMount() {

    let urlPath = this.props.location.pathname;
    let searchText = this.props.location.search;
    let pageNumber = parseInt(searchText.split("=")[1]);
    let {userPageOffset, paginationLimit} = this.props;

    this.props.headerActions.setHeaderActiveTab('users');
    this.props.userActions.saveUserPageOffset(pageNumber);
    this.props.userActions.getUsers(pageNumber, paginationLimit);

  }

  componentWillReceiveProps(nextProps) {

    if(_.size(nextProps.users) == 0 && nextProps.userPageOffset != 1 &&
      nextProps.userPageOffset == this.props.userPageOffset){

      let {paginationLimit} = this.props;
      let pageOffset = nextProps.userPageOffset-1;

      this.props.userActions.paginateUserToNextOffset(pageOffset, paginationLimit);
      this.props.routeDispatch(push("/home/users?page="+pageOffset));

    }

  }

  onPagination(event) {

    let {paginationLimit} = this.props;
    this.props.userActions.paginateUserToNextOffset(event, paginationLimit);
    this.props.routeDispatch(push("/home/users?page="+event));

  }

  goToCreateUser(){

    this.props.routeDispatch(push("/home/user/new"));

  }

  render() {

    let userDetails, pagination = null;
    let {users, userTotalCount, userPageOffset, paginationLimit} = this.props;

    let remainder = userTotalCount % paginationLimit;
    let total = userTotalCount / paginationLimit;

    total = Math.floor(total);
    if (remainder > 0) {
        total = total + 1;
    }

    if (_.size(users) > 0 && userTotalCount > 0) {

     userDetails = _.map(_.keys(users), (key) => {
        var user = users[key];
          return (

            <UserItem user={user} key={user._id} rowId={key}/>

          );
      });

      if(userTotalCount > paginationLimit){
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
            activePage={userPageOffset}
            onSelect={this.onPagination.bind(this)}
            className="top-pagination"/>
      }

    }else{

      userDetails =   <tr>
                        <td colSpan="5" className="record-not-found-block">
                          No Users Found
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
  users: state.user.users,
  userPageOffset: state.user.userPageOffset,
  userTotalCount: state.user.userTotalCount,
  paginationLimit: state.user.paginationLimit
});

const mapDispatchToProps = (dispatch) => ({
  routeDispatch: dispatch,
  headerActions: bindActionCreators(headerActionCreators, dispatch),
  userActions: bindActionCreators(userActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
