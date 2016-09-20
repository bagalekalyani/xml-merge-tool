'use strict';

import React, {Component, View} from "react";
import Loader from "./Loader";

class AppMaskLoader extends React.Component {

    render() {

        var displayStyle = this.props.show ? {display: 'block'} : {display: 'none'};

        return (
            <div className="app-mask" style={displayStyle}>
                <Loader />
            </div>
        )

    }

}

export default AppMaskLoader;
