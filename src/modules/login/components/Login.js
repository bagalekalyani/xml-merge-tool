'use strict';

import React, {Component} from "react";
import {RouteHandler} from "react-router";
import {Grid, Row} from "react-bootstrap";
import {connect} from "react-redux";

class Login extends Component {

  render() {

    return (
      <Grid fluid>
        <Row>
          Hello !!!
        </Row>
      </Grid>
    );

  }

}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
