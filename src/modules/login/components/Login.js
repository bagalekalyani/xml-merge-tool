'use strict';

import React, {Component} from "react";
import {RouteHandler} from "react-router";
import {connect} from "react-redux";
import {Panel, Input, Glyphicon, Grid, Row, Col, Button, Jumbotron} from "react-bootstrap";
import {Element} from "react-scroll";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import LoginHeader from "../../common/components/LoginHeader";

class Login extends Component {

  render() {

    return (
      <div className="login-screen">

        <LoginHeader/>

        <Grid fluid>
          <Row>
            <Jumbotron className="text-center">

              <Grid>
                <form>
                  <Row>

                    <Col lg={6} lgPush={3} md={6} mdPush={3} sm={8} smPush={2} xs={12} className="login-box">
                      <div className="login-label text-center">LOGIN</div>
                      <Grid>
                        <Row>
                          <Col xs={12}>
                            <Input type="text"
                                   addonBefore={<Glyphicon glyph="user" />}
                                   placeholder="Username"/>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12}>
                            <Input type="password"
                                   addonBefore={<Glyphicon glyph="lock" />}
                                   placeholder="Password"/>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} sm={12} md={12}>
                            <Button bsStyle="primary" bsSize="large"
                                    className="full-width">
                                LOGIN
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} sm={12} mg={12}>
                              <div className="forgot-password  text-center">
                                  Forgot Password?
                              </div>
                          </Col>
                        </Row>
                      </Grid>
                    </Col>

                  </Row>
                </form>
              </Grid>

            </Jumbotron>
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
