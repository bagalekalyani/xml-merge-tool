'use strict';

import React, {Component} from "react";
import {push} from "redux-router";
import {Table, Glyphicon, Grid, Row, Col, Button, Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as customerActionCreators from "../actions/customer";


class CustomerConfigurationList extends Component{

  constructor(props) {
    super(props);

    this.state = {
      showDeleteModal: false
    }
  }

  onDeleteCustomerConfiguration(){

    this.setState({showDeleteModal: true});

  }

  deleteConfiguration(configurationId){

    let {customerConfigurationPageOffset, paginationLimit} = this.props;
    this.setState({showDeleteModal: false});
    this.props.customerActions.deleteCustomerConfiguration(this.props.selectedCustomerId, configurationId, customerConfigurationPageOffset, paginationLimit);

  }

  closeModal(){

    this.setState({showDeleteModal: false});

  }

  onEditConfiguration(configuration){

    this.props.customerActions.setSelectedConfiguration(configuration);
    this.props.routeDispatch(push("/home/customer/" + this.props.selectedCustomerId + "/details/configuration/" + configuration._id + "/edit"));

  }

  render(){

    let {configuration} = this.props;

    return(
          <tr key={configuration._id}>
            <td>{configuration.name}</td>
            <td>
              <Glyphicon glyph="folder-open actions-icon pointer" title="Configuration Details"/>
              <Glyphicon glyph="edit actions-icon pointer" className="left-buffer" title="Edit Configuration"
                         onClick={this.onEditConfiguration.bind(this, configuration)}/>
              <Glyphicon glyph="minus-sign actions-icon pointer" className="left-buffer text-red" title="Delete Customer"
                         onClick={this.onDeleteCustomerConfiguration.bind(this)}/>
            </td>
            <Modal show={this.state.showDeleteModal} onHide={this.closeModal.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Customer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delete <strong> {configuration.name} </strong> configuration file?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.closeModal.bind(this)}>Close</Button>
                <Button bsStyle="danger" onClick={this.deleteConfiguration.bind(this, configuration._id)}>Delete</Button>
              </Modal.Footer>
            </Modal>
          </tr>
      );
  }
}

const mapStateToProps = (state) => ({
  selectedCustomerId: state.customer.selectedCustomerId,
  customerConfigurationPageOffset: state.customer.customerConfigurationPageOffset,
  paginationLimit: state.customer.paginationLimit
});

const mapDispatchToProps = (dispatch) => ({
  routeDispatch: dispatch,
  customerActions: bindActionCreators(customerActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerConfigurationList);
