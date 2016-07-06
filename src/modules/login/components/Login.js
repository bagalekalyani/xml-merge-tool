'use strict';

import React, {Component} from "react";
import {RouteHandler} from "react-router";
import {connect} from "react-redux";
import {Panel, Input, Glyphicon, Grid, Row, Col, Button, Jumbotron, HelpBlock, FormGroup, ControlLabel, FormControl} from "react-bootstrap";
import {Element} from "react-scroll";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import LoginHeader from "../../common/components/LoginHeader";

class Login extends Component {

  constructor(props) {

        super(props);
        this.state = {
            username: '',
            password: '',
            usernameError: '',
            passwordError: '',
            invalidError: '',
            displayBox: 'block',
            serverErrorMessage: false
        };

    }

  authenticate(e){

    e.preventDefault();
    e.stopPropagation();

    let usernameError = "";
    let passwordError = "";
    let invalidError = "";

    if (this.state.username == "") {
      usernameError = "Username is mandatory";
    }

    if (this.state.password == "") {
      passwordError = "Password is mandatory";
    }

    this.setState({

      usernameError: usernameError,
      passwordError: passwordError,
      invalidError: invalidError

    });

    if (usernameError == "" && passwordError == "" && invalidError == ""){

      // this.props.authActions.authenticateUser(this.state.username, this.state.password, this.props.redirectUrlPath);
      // this.props.authActions.setUrlPath(null);

    }

  }

  onUsernameChange(e) {

    this.setState({
      username: e.target.value,
      usernameError: (e.target.value !== "") ? "" : "Username is mandatory",
      invalidError: (e.target.value !== "") ? "" : "",
      serverErrorMessage: false
    });

    if (e.target.value == '' && this.state.serverErrorMessage) {
      // this.props.authActions.emptyStatuxText();
    }

  }

  onPasswordChange(e) {

    this.setState({
      password: e.target.value,
      passwordError: (e.target.value !== "") ? "" : "Password is mandatory",
      invalidError: (e.target.value !== "") ? "" : "",
      serverErrorMessage: false
    });

    if (e.target.value == '' & this.state.serverErrorMessage) {
      //this.props.authActions.emptyStatuxText();
    }

  }

  render() {

    return (
      <div className="login-screen">

        <LoginHeader />

        <Grid fluid>
          <Row>
            <Jumbotron className="text-center">

              <Grid>
                <form onSubmit={this.authenticate.bind(this)}>
                  <Row>
                    <Col lg={6} lgPush={3} md={6} mdPush={3} sm={8} smPush={2} xs={12} className="login-box">
                      <div className="login-label  text-center">LOGIN</div>
                      <Grid>
                        <Row>
                          <Col xs={12}>
                            <div className="login-tbox">
                              <div className='text-danger text-center'>
                                {this.props.statusText}
                              </div>
                              <Input type="text"
                                     addonBefore={<Glyphicon glyph="user" />}
                                     onChange={this.onUsernameChange.bind(this)}
                                     placeholder="Username"/>
                              <div className='text-danger'>
                                {this.state.usernameError}
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12}>
                            <div className="login-tbox">
                              <Input type="password"
                                     addonBefore={<Glyphicon glyph="lock" />}
                                     onChange={this.onPasswordChange.bind(this)}
                                     placeholder="Password"/>
                              <div className='text-danger'>
                                {this.state.passwordError}
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} sm={12} md={12}>
                            <Button type="submit" bsStyle="warning" bsSize="large"
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
