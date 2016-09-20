'use strict';

import React, {Component} from "react";
import {RouteHandler} from "react-router";
import {connect} from "react-redux";
import {push} from "redux-router";
import {Panel, Input, Glyphicon, Grid, Row, Col, Button, Jumbotron} from "react-bootstrap";
import {Element} from "react-scroll";
import {bindActionCreators} from "redux";
import * as authActionCreators from "../actions/auth";

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

  componentWillMount () {

    let baseUrl = this.props.location.pathname;
    let searchURL = this.props.location.search;
    let redirectAfterLogin = searchURL.split("next=");

    if(baseUrl == '/' && searchURL != ''){
      this.props.routeDispatch(push(`/?next=${redirectAfterLogin[1]}`));
      this.props.authActions.setUrlPath(redirectAfterLogin[1]);
    }

  }

  authenticate(e){

    e.preventDefault();
    e.stopPropagation();

    let usernameError = "";
    let passwordError = "";
    let invalidError = "";

    if (this.state.username == "") {
      usernameError = "Email is mandatory";
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

      let credentials = null;
      credentials = {
        email: this.state.username,
        password: this.state.password
      }

      this.props.authActions.authenticateUser(credentials, this.props.redirectUrlPath);
      this.props.authActions.setUrlPath(null);

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
      this.props.authActions.emptyStatuxText();
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
      this.props.authActions.emptyStatuxText();
    }

  }

  render() {

    let {statusText} = this.props;

    if (statusText !== null) {
      this.state.serverErrorMessage = true;
    }
    else {
      this.state.serverErrorMessage = false;
    }

    return (
      <div className="login-screen">

        <Grid fluid>
          <Row>
            <Jumbotron className="text-center">

              <Grid>
                <form onSubmit={this.authenticate.bind(this)}>
                  <Row>
                    <Col lg={6} lgPush={3} md={6} mdPush={3} sm={8} smPush={2} xs={12} className="login-box">
                      <img src="img/logo.png" alt="" className="text-center login-logo-img"/>
                      <Grid>
                        <Row>
                          <Col xs={12}>
                            <div className="login-tbox">
                              <div className='text-danger text-center'>
                                {this.props.statusText}
                              </div>
                              <Input  type="email"
                                      addonBefore={<Glyphicon glyph="user" />}
                                      onChange={this.onUsernameChange.bind(this)}
                                      autoFocus
                                      placeholder="Email"/>
                              <div className='text-danger'>
                                {this.state.usernameError}
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12}>
                            <div className="login-tbox">
                              <Input  type="password"
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
  statusText: state.auth.statusText,
  redirectUrlPath: state.auth.redirectUrlPath
});

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(authActionCreators, dispatch),
  routeDispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
