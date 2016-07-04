let React = require('react');
let {Router, Route, IndexRoute} = require('react-router');

import {App} from "./modules/common/containers";
import Login from "./modules/login/components/Login";
import Home from "./modules/common/components/Home";
import Dashboard from "./modules/dashboard/components/Dashboard";
import CustomerList from "./modules/customer/components/CustomerList";
import PageNotFoundError from "./modules/common/components/PageNotFoundError";

var Routes = (

  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>

      <Route path="home" component={Home}>
        <IndexRoute component={Dashboard}/>
        <Route path="customers" component={CustomerList}/>
      </Route>

      <Route path="*" component={PageNotFoundError}/>

    </Route>
  </Router>

);

export default Routes;
