import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Router } from "react-router-dom";

import history from "./history";
import { Provider } from "mobx-react";

import { ActionCableProvider } from "react-actioncable-provider";

import { API_WS_ROOT } from "./lib/helpers/api/index";

import stores from "./stores";

ReactDOM.render(
  <BrowserRouter>
    <Provider {...stores}>
      <ActionCableProvider url={API_WS_ROOT}>
        <Router history={history}>
          <App />
        </Router>
      </ActionCableProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
