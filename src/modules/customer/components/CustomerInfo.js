'use strict';

import React, {Component} from "react";
import {push} from "redux-router";
import {Form, FormGroup, ControlLabel, FormControl, Row, Col, Button, Grid, Glyphicon} from 'react-bootstrap';
import * as authActionCreators from "../actions/customer";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class CustomerInfo extends Component {

  goToCustomerListing(){

    this.props.routeDispatch(push("/home/customers?page=" + this.props.customerPageOffset));

  }

  render() {

    return (
      <Grid fluid>
        <Row>
          <Col sm={2} md={2} xs={2}>
            <Glyphicon  glyph="arrow-left pointer back-arrow-icon"
                        className="left-buffer"
                        title="Back"
                        onClick={this.goToCustomerListing.bind(this)}/>
          </Col>
          <Col sm={10} md={10} xs={10}>
            <Form horizontal>
              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ControlLabel} sm={3} md={3} xs={12}>
                  Customer Name:
                </Col>
                <Col sm={9} md={9} xs={12}>
                  <FormControl  type="text"
                                placeholder="Customer Name"
                                disabled="true"
                                value={this.props.selectedCustomer.name} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalComment">
                <Col componentClass={ControlLabel} sm={3} md={3} xs={12}>
                  Comment:
                </Col>
                <Col sm={9} md={9} xs={12}>
                  <FormControl  componentClass="textarea"
                                placeholder="textarea" />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={3} sm={9}>
                  <Button type="submit"
                          bsStyle="primary">
                    Save
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Grid>
    );

  }

}


const mapStateToProps = (state) => ({
  selectedCustomer: state.customer.selectedCustomer,
  customerPageOffset: state.customer.customerPageOffset
});

const mapDispatchToProps = (dispatch) => ({
  routeDispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfo);
