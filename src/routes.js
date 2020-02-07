import React from "react";
import { Route, Switch } from "react-router-dom";

import AddRequest from "./components/Requests/new";
import RequestCollections from "./components/Requests/collections";
import ShowOrganization from "./components/dashboard/network/organization/show";

import Login from "./components/Sessions/signin";
import Signup from "./components/Sessions/register";
import ForgotPassword from "./components/Sessions/passwordForgot";
import Profile from "./components/Sessions/profile";

import Landing from "./components/landing";
import Dashboard from "./components/dashboard/dashboard";

import Messaging from "./components/chatrooms/index";
import Network from "./components/dashboard/network/index";
import Settings from "./components/dashboard/accounts/settings";
import Organization from "./components/dashboard/organizations/new"
import Explorer from "./components/dashboard/explorer";
import Notifications from "./components/dashboard/notifications";
import ShowAll from "./components/dashboard/network/organization";





const Routes = () => (
  
  <Switch>
    <Route path="/" exact component={Landing} />
    <Route path="/welcome" component={Dashboard} />
    <Route path="/requests/add-new-request" component={AddRequest} />
    <Route
      path="/requests/requests-collections"
      component={RequestCollections}
    />

    <Route path="/users/new-user-session" component={Login} />
    <Route path="/users/my-profile" component={Profile} />
    <Route path="/users/new-user-registration" component={Signup} />
    <Route path="/users/password-reset" component={ForgotPassword} />

    <Route path="/users/chatrooms" component={Messaging} />

    <Route path="/settings" component={Settings}/>
    <Route path='/new-organization' component={Organization}/>


    <Route path='/network' component={Network}/>
    <Route path="/explorer" component={Explorer}/>
    <Route path="/my-notifications" component={Notifications} />

    <Route path="/organizations/:orgName" component={ShowOrganization}/>
    <Route path="/organizations" component={ShowAll}/>
  </Switch>
);
export default Routes;
