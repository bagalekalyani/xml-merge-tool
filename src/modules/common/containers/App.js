import React from "react";
import {connect} from "react-redux";
import AppMaskLoader from "../../common/components/AppMaskLoader";

class App extends React.Component {

  render() {

    return (
      <div>
        <div className="container-fluid">
          {this.props.children}
          <AppMaskLoader show={this.props.loading}/>
        </div>
      </div>
    );

  }

}

const mapStateToProps = (state) => ({
  loading: state.app.loading
});


export default connect(mapStateToProps)(App);
