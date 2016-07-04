'use strict';

import React, {Component} from "react";
import {push} from "redux-router";
import {Table, Glyphicon} from 'react-bootstrap';
import * as authActionCreators from "../../login/actions/auth";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class CustomerList extends Component {


  render() {

    return (
      <Table striped bordered condensed hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>No. of Configurations</th>
            <th>No. of Merge Scenarios</th>
            <th>No. of Stories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Customer1</td>
            <td>22</td>
            <td>32</td>
            <td>11</td>
            <td>
              <Glyphicon glyph="folder-open pointer"/>
              <Glyphicon glyph="minus-sign" className="left-buffer"/>
              <Glyphicon glyph="open pointer" className="left-buffer"/>
            </td>
          </tr>
          <tr>
            <td>Customer2</td>
            <td>4</td>
            <td>11</td>
            <td>55</td>
            <td>
              <Glyphicon glyph="folder-open pointer"/>
              <Glyphicon glyph="minus-sign" className="left-buffer"/>
              <Glyphicon glyph="open pointer" className="left-buffer"/>
            </td>
          </tr>
          <tr>
            <td>Customer3</td>
            <td>26</td>
            <td>27</td>
            <td>8</td>
            <td>
              <Glyphicon glyph="folder-open pointer"/>
              <Glyphicon glyph="minus-sign" className="left-buffer"/>
              <Glyphicon glyph="open pointer" className="left-buffer"/>
            </td>
          </tr>
        </tbody>
      </Table>
    );

  }

}

export default CustomerList;
