import React from "react";
import { Route } from "react-router-dom";

import Landing from "./components/layouts/index";

const Routes = () => (
  <React.Fragment>
    <Route exact path="/" component={Landing} />
  </React.Fragment>
);
export default Routes;
