let React = require('react');
let {Router, Route, IndexRoute} = require('react-router');

import {App} from "./modules/common/containers";
import Login from "./modules/login/components/Login";
import Home from "./modules/common/components/Home";
import Dashboard from "./modules/dashboard/components/Dashboard";
import CustomerList from "./modules/customer/components/CustomerList";
import CustomerCreate from "./modules/customer/components/CustomerCreate";
import CustomerDetails from "./modules/customer/components/CustomerDetails";
import CustomerActions from "./modules/customer/components/CustomerActions";
import PageNotFoundError from "./modules/common/components/PageNotFoundError";
import UsersList from "./modules/user/components/UsersList";
import CustomerUserCreate from "./modules/customer/components/CustomerUserCreate";
import UserCreate from "./modules/user/components/UserCreate";
import CustomerConfigurationEdit from "./modules/customer/components/CustomerConfigurationEdit";

var Routes = (

  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>

      <Route path="home" component={Home}>
        <IndexRoute component={Dashboard}/>
        <Route path="customers" component={CustomerList}/>
        <Route path="customer/new" component={CustomerCreate}/>
        <Route path="customer/:customerId/edit" component={CustomerCreate}/>

        <Route path="customer/:customerId/details/user/new" component={CustomerUserCreate}/>
        <Route path="customer/:customerId/details/user/:userId/edit" component={CustomerUserCreate}/>
        <Route path="customer/:customerId/details/configuration/:configurationId/edit" component={CustomerConfigurationEdit}/>

        <Route path="customer/:customerId/details" component={CustomerDetails}>
          <Route path=":activeTab" component={CustomerActions}/>
        </Route>

        <Route path="users" component={UsersList} />
        <Route path="user/new" component={UserCreate}/>
        <Route path="user/:userId/edit" component={UserCreate}/>


      </Route>

      <Route path="*" component={PageNotFoundError}/>

    </Route>
  </Router>

);

export default Routes;
