'use strict';

import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {push} from "redux-router";
import Header from "../../header/components/Header";
import Footer from "./Footer";

class Home extends Component {

  render() {

    return (
      <div>
        <Header />

        <div>
            {this.props.children}
        </div>

        <Footer />
      </div>
    );

  }

}

export default Home;
