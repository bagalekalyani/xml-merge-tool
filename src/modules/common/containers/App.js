import React from "react";
import {connect} from "react-redux";
class App extends React.Component {

  render() {

    return (
      <div>
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    );

  }

}

const mapStateToProps = (state) => ({
});


export default connect(mapStateToProps)(App);
