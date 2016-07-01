let React = require('react');
let {Router, Route, IndexRoute} = require('react-router');

import {App} from "./modules/common/containers";
import Login from "./modules/login/components/Login";

var Routes = (

  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>

    </Route>
  </Router>

);

export default Routes;
