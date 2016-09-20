'use strict';

import React, {Component} from "react";
import {push} from "redux-router";
import {Table, Glyphicon, Grid, Row, Col, Button} from 'react-bootstrap';
import * as authActionCreators from "../actions/customer";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class CustomerStories extends Component {

  componentDidMount() {

  }

  render() {

    return (
      <Grid fluid className="top-buffer">

        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Table striped bordered condensed hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>No. of Stories</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Customer1</td>
                  <td>11</td>
                  <td>
                    <Glyphicon glyph="folder-open pointer"/>
                    <Glyphicon glyph="minus-sign pointer" className="left-buffer"/>
                    <Glyphicon glyph="open pointer" className="left-buffer"/>
                  </td>
                </tr>
                <tr>
                  <td>Customer2</td>
                  <td>55</td>
                  <td>
                    <Glyphicon glyph="folder-open pointer"/>
                    <Glyphicon glyph="minus-sign pointer" className="left-buffer"/>
                    <Glyphicon glyph="open pointer" className="left-buffer"/>
                  </td>
                </tr>
                <tr>
                  <td>Customer3</td>
                  <td>8</td>
                  <td>
                    <Glyphicon glyph="folder-open pointer"/>
                    <Glyphicon glyph="minus-sign pointer" className="left-buffer"/>
                    <Glyphicon glyph="open pointer" className="left-buffer"/>
                  </td>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerStories);



