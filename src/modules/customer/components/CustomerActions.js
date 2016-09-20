'use strict';

import React, {Component} from "react";
import {push} from "redux-router";
import {Nav, NavItem} from 'react-bootstrap';
import * as authActionCreators from "../actions/customer";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import CustomerMergeScenarios from "./CustomerMergeScenarios";
import CustomerStories from "./CustomerStories";
import CustomerUsersList from "./CustomerUsersList";
import CustomerConfiguration from "./CustomerConfiguration";
import * as customerActionCreators from "../actions/customer";

class CustomerActions extends Component {

  goToCustomerConfigurationTab(){

    let {selectedCustomerId, customerConfigurationPageOffset} = this.props;
    this.props.customerActions.setCustomerActiveTab('configuration', selectedCustomerId, 1);
    this.props.routeDispatch(push("/home/customer/" + selectedCustomerId + "/details/configuration?page=" + customerConfigurationPageOffset));

  }

  goToCustomerMergeScenariosTab(){

    this.props.customerActions.setCustomerActiveTab('merge', this.props.selectedCustomerId, 2);
    this.props.routeDispatch(push("/home/customer/" + this.props.selectedCustomerId + "/details/merge"));

  }

  goToCustomerStoriesTab(){

    this.props.customerActions.setCustomerActiveTab('stories', this.props.selectedCustomerId, 3);
    this.props.routeDispatch(push("/home/customer/" + this.props.selectedCustomerId + "/details/stories"));

  }

  goToCustomerUsersTab(){

    this.props.customerActions.setCustomerActiveTab('users', this.props.selectedCustomerId, 4);
    this.props.routeDispatch(push("/home/customer/" + this.props.selectedCustomerId + "/details/users"));

  }

  render() {

    let componentToBeRendered = null;
    let {customerActiveTab, activeKey} = this.props;

    if (customerActiveTab === 'configuration') {
      componentToBeRendered = <CustomerConfiguration />;
    }

    if (customerActiveTab === 'merge') {
      componentToBeRendered = <CustomerMergeScenarios />;
    }

    if (customerActiveTab === 'stories') {
      componentToBeRendered = <CustomerStories />;
    }

    if (customerActiveTab === 'users') {
      componentToBeRendered = <CustomerUsersList />;
    }

    return (
      <div>
        <Nav bsStyle="tabs" activeKey={activeKey}>
          <NavItem  eventKey={1}
                    title="Configuration"
                    onClick={this.goToCustomerConfigurationTab.bind(this)}>
            Configuration
          </NavItem>
          <NavItem  eventKey={2}
                    title="Merge Scenarios"
                    onClick={this.goToCustomerMergeScenariosTab.bind(this)}>
            Merge Scenarios
          </NavItem>
          <NavItem  eventKey={3}
                    title="Stories"
                    onClick={this.goToCustomerStoriesTab.bind(this)}>
            Stories
          </NavItem>
          <NavItem  eventKey={4}
                    title="Users"
                    onClick={this.goToCustomerUsersTab.bind(this)}>
            Users
          </NavItem>
        </Nav>

        {componentToBeRendered}
      </div>
    );

  }

}


const mapStateToProps = (state) => ({
  customerActiveTab: state.customer.customerActiveTab,
  selectedCustomerId: state.customer.selectedCustomerId,
  activeKey: state.customer.activeKey,
  customerConfigurationPageOffset: state.customer.customerConfigurationPageOffset
});

const mapDispatchToProps = (dispatch) => ({
  routeDispatch: dispatch,
  customerActions: bindActionCreators(customerActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerActions);
