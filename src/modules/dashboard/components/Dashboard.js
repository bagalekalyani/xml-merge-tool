'use strict';

import React, {Component, View} from "react";
import {Panel, Input, Glyphicon, Grid, Row, Col, Button, Jumbotron} from "react-bootstrap";
import * as headerActionCreators from "../../header/actions/header";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class Dashboard extends Component {

  componentDidMount() {

    this.props.headerActions.setHeaderActiveTab('');

  }

  render() {

    return (

      <Jumbotron>
        <h1>Welcome to XML Merge Tool!</h1>
        <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <p><Button bsStyle="primary">Learn more</Button></p>
      </Jumbotron>

    );

  }

}

const mapStateToProps = (state) => ({
  headerActiveTab: state.header.headerActiveTab,
});

const mapDispatchToProps = (dispatch) => ({
  headerActions: bindActionCreators(headerActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

