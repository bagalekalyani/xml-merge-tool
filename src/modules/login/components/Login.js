'use strict';

import React, {Component} from "react";
import {RouteHandler} from "react-router";
import {connect} from "react-redux";
import {Panel, Input, Glyphicon, Grid, Row, Col, Button} from "react-bootstrap";
import {Element} from "react-scroll";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import LoginHeader from "../../common/components/LoginHeader";

class Login extends Component {

  render() {

    return (
      <div>

        <LoginHeader/>
      
        <Grid>
          <Row>
            <Col md={4} mdPush={4} sm={8} smPush={1} xs={12}>
              <form>
                <Row>
                  <Col>
                    <Input type="text"
                           addonBefore={<Glyphicon glyph="user" />}
                           placeholder="Username"/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Input type="text"
                           addonBefore={<Glyphicon glyph="lock" />}
                           placeholder="Password"/> 
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button type="submit" bsStyle="primary">
                        LOGIN
                    </Button>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </Grid>

      </div>
    );

  }

}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
