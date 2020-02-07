import React from "react";
import { Link } from "react-router-dom";

class Guest extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column bg-white p-3">
        <div className="d-flex ">
          <div className="px-4">
            <Link className="liens" to="/">
              <strong>
                <span className="text-uppercase ">Nemeton</span>
              </strong>
            </Link>
          </div>
          <div className="ml-auto px-2 d-flex">
            <div className="px-3 d-none d-xs-none d-sm-none d-md-block">
              <span>
                <Link className="liens px-2" to="/users/new-user-session">
                  Log in
                </Link>
              </span>
              <span>
                <Link className="liens px-2" to="/users/new-user-registration">
                  Sign up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Guest;
