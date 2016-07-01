import React from "react";
import {connect} from "react-redux";

var ReactToastr = require("react-toastr");

class App extends React.Component {

  render() {

    return (
      <div className="container-fluid">
        {this.props.children}
      </div>
    );

  }

}

const mapStateToProps = (state) => ({
});


export default connect(mapStateToProps)(App);
