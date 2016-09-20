'use strict';

import React, {Component} from "react";
import {push} from "redux-router";
import {Table, Glyphicon, Grid, Row, Col, Button} from 'react-bootstrap';
import * as authActionCreators from "../actions/customer";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class CustomerHistory extends Component {

  componentDidMount() {

  }

  render() {

    return (
      <Grid fluid>
        <hr/>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <h4 className="text-blue">History</h4>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Table striped bordered condensed hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>No. of Configurations</th>
                  <th>No. of Merge Scenarios</th>
                  <th>No. of Stories</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Customer1</td>
                  <td>22</td>
                  <td>32</td>
                  <td>11</td>
                </tr>
                <tr>
                  <td>Customer2</td>
                  <td>4</td>
                  <td>11</td>
                  <td>55</td>
                </tr>
                <tr>
                  <td>Customer3</td>
                  <td>26</td>
                  <td>27</td>
                  <td>8</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Grid>
    );

  }

}


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerHistory);

