'use strict';

import React, {Component, View} from "react";
import {Panel, Input, Glyphicon, Grid, Row, Col, Button, Jumbotron} from "react-bootstrap";

class Dashboard extends Component {

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

export default Dashboard;
