'use strict';

import React, {Component} from "react";
import {push} from "redux-router";
import {Table, Glyphicon, Grid, Row, Col, Button, Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as customerActionCreators from "../actions/customer";


class CustomerItem extends Component{

  constructor(props) {
    super(props);

    this.state = {
      showDeleteModal: false
    }
  }

  onEditCustomer(customer){

    this.props.customerActions.setSelectedCustomer(customer);
    this.props.routeDispatch(push("/home/customer/" + customer._id + "/edit"));

  }

  onDeleteCustomer(){

    this.setState({showDeleteModal: true});

  }

  deleteCustomer(customerId){

    this.setState({showDeleteModal: false});
    let {customerPageOffset, paginationLimit} = this.props;
    this.props.customerActions.deleteCustomer(customerId, customerPageOffset, paginationLimit);

  }

  closeModal(){

    this.setState({showDeleteModal: false});

  }

  goToCustomerDetails(customer){

    let {customerConfigurationPageOffset} = this.props;
    this.props.customerActions.setSelectedCustomer(customer);
    this.props.routeDispatch(push("/home/customer/" + customer._id + "/details/configuration?page=" + customerConfigurationPageOffset));

  }

  uploadZipFile(customerId, e){

    this.props.customerActions.uploadConfigZipFile(e.target.files[0], customerId);

  }

  render(){

    let {customer, rowId, onEditCustomer} = this.props;

    return(
          <tr key={customer._id}>
            <td>{customer.name}</td>
            <td>{rowId}</td>
            <td>15</td>
            <td>10</td>
            <td>
              <Glyphicon glyph="folder-open actions-icon pointer" title="Customer Details"
                         onClick={this.goToCustomerDetails.bind(this, customer)}/>

              <Glyphicon glyph="open actions-icon pointer" className="fileUpload" title="Upload Configuration File">
                <input  type="file"
                        accept="application/xml"
                        onChange={this.uploadZipFile.bind(this, customer._id)}
                        className="upload" />
              </Glyphicon>

              <Glyphicon glyph="edit actions-icon pointer" className="left-buffer" title="Edit Customer"
                         onClick={this.onEditCustomer.bind(this, customer)}/>

              <Glyphicon glyph="minus-sign actions-icon pointer" className="left-buffer text-red" title="Delete Customer"
                         onClick={this.onDeleteCustomer.bind(this)}/>
            </td>
            <Modal show={this.state.showDeleteModal} onHide={this.closeModal.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Customer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delete <strong> {customer.name} </strong> customer?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.closeModal.bind(this)}>Close</Button>
                <Button bsStyle="danger" onClick={this.deleteCustomer.bind(this, customer._id)}>Delete</Button>
              </Modal.Footer>
            </Modal>
          </tr>
      );
  }
}

const mapStateToProps = (state) => ({
  customerPageOffset: state.customer.customerPageOffset,
  paginationLimit: state.customer.paginationLimit,
  customerConfigurationPageOffset: state.customer.customerConfigurationPageOffset
});

const mapDispatchToProps = (dispatch) => ({
  routeDispatch: dispatch,
  customerActions: bindActionCreators(customerActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerItem);
