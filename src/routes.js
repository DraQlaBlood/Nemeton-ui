import React from "react";
import { Route, Switch } from "react-router-dom";

import AddRequest from "./components/Requests/new";
import RequestCollections from "./components/Requests/collections";
import Show from "./components/Requests/show";

import Login from "./components/Sessions/signin";
import Signup from "./components/Sessions/register";
import ForgotPassword from "./components/Sessions/passwordForgot";
import Profile from "./components/Sessions/profile";

import Landing from "./components/landing";
import Layout from "./components/layout";

import Messaging from "./components/chatrooms/index";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Landing} />
    <Route path="/welcome" component={Layout} />
    <Route path="/requests/add-new-request" component={AddRequest} />
    <Route
      path="/requests/requests-collections"
      component={RequestCollections}
    />
    <Route path="/requests/show-req-details/:id" component={Show} />

    <Route path="/users/new-user-session" component={Login} />
    <Route path="/users/my-profile" component={Profile} />
    <Route path="/users/new-user-registration" component={Signup} />
    <Route path="/users/password-reset" component={ForgotPassword} />

    <Route path="/users/chatrooms" component={Messaging} />
  </Switch>
);
export default Routes;
