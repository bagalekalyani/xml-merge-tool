'use strict';

import React, {Component, View} from "react";

class PageNotFoundError extends Component {

    render() {

        return (
            <div className="wrap">
                <div className="logo-404">
                    <h1>404</h1>
                    <p>Error occured! - Page not found</p>
                    <div className="sub">
                        <p><a href="#">Back</a></p>
                    </div>
                </div>
            </div>
        );

    }

}

export default PageNotFoundError;
