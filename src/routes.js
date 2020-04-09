import React from "react";
import { Route, Switch } from "react-router-dom";

import OrgModel from './collections/Organizations/show'

import Login from "./components/Sessions/signin";
import Signup from "./components/Sessions/register";
import ForgotPassword from "./components/Sessions/passwordForgot";
import Profile from "./components/Sessions/profile";

import Landing from "./components/landing";
import Dashboard from "./components/dashboard/dashboard";

import Messaging from "./components/chatrooms/index";
import Settings from "./components/dashboard/accounts/settings";
import Notifications from "./components/dashboard/notifications";
import OrgCollections from "./collections/Organizations/index";
import Network from "./components/Network";
import Discussion from "./collections/Discussions/show";
import AccountSetting from "./components/Settings/Account";





const Routes = () => (
  
  <Switch>
    <Route path="/" exact component={Landing} />
    <Route path="/welcome" component={Dashboard} />

    <Route path="/users/new-user-session" component={Login} />
    <Route path="/users/my-profile" component={Profile} />
    <Route path="/users/new-user-registration" component={Signup} />
    <Route path="/users/password-reset" component={ForgotPassword} />

    <Route path="/users/chatrooms" component={Messaging} />

    <Route path="/settings" component={AccountSetting}/>


    <Route path='/network' component={Network}/>
    <Route path="/my-notifications" component={Notifications} />

    <Route path="/show/:organization_slug" component={OrgModel}/>
    <Route path="/organizations" component={OrgCollections}/>

    <Route path="/discussion/:title/:id" component={Discussion}/>
  </Switch>
);
export default Routes;
