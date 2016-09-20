'use strict';

import React, {Component} from "react";
import {push} from "redux-router";
import {Table, Glyphicon, Grid, Row, Col, Button, Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as headerActionCreators from "../../header/actions/header";
import * as customerActionCreators from "../actions/customer";


class CustomerUserItem extends Component{

  constructor(props) {
    super(props);

    this.state = {
      showDeleteModal: false
    }
  }

  onEditUser(user){

    this.props.customerActions.setSelectedCustomerUser(user);
    this.props.routeDispatch(push("/home/customer/" + this.props.selectedCustomer._id + "/details/user/" + user._id + "/edit"));

  }

  onDeleteUser(){

    this.setState({showDeleteModal: true});

  }

  deleteUser(userId){

    this.setState({showDeleteModal: false});
    this.props.customerActions.deleteCustomerUser(userId, this.props.selectedCustomer._id);

  }

  closeModal(){

    this.setState({showDeleteModal: false});

  }

  render(){

    let {user, rowId} = this.props;
    let roleOfUser = null;
    if(user.role == 'customer_admin'){
      roleOfUser = 'Customer Admin';
    }
    else if (user.role == 'customer_staff') {
      roleOfUser = 'Customer Staff';
    }
    return(
          <tr key={user._id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{roleOfUser}</td>
            <td>
              <Glyphicon glyph="edit actions-icon pointer" className="left-buffer" title="Edit User"
                         onClick={this.onEditUser.bind(this, user)}/>

              <Glyphicon glyph="minus-sign actions-icon pointer" className="left-buffer text-red" title="Delete User"
                         onClick={this.onDeleteUser.bind(this)}/>
            </td>
            <Modal show={this.state.showDeleteModal} onHide={this.closeModal.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Customer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delete <strong> {user.firstName} </strong> user?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.closeModal.bind(this)}>Close</Button>
                <Button bsStyle="danger" onClick={this.deleteUser.bind(this, user._id)}>Delete</Button>
              </Modal.Footer>
            </Modal>
          </tr>
      );
  }
}

const mapStateToProps = (state) => ({
  selectedCustomer: state.customer.selectedCustomer
});

const mapDispatchToProps = (dispatch) => ({
  routeDispatch: dispatch,
  customerActions: bindActionCreators(customerActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerUserItem);
