import React from "react";
import { Link } from "react-router-dom";

class Guest extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column bg-white">
        <div className="d-flex ">
          <div className="p-4">
            <Link className="liens" to="/">
              <strong>
                <span className="text-uppercase ">Nemeton</span>
              </strong>
            </Link>
          </div>
          <div className="ml-auto p-2 d-flex">
            <div className="p-3 d-none d-xs-none d-sm-none d-md-block">
              <span>
                <Link className="liens" to="/users/new-user-registration">
                  Register
                </Link>{" "}
                or
              </span>{" "}
              <span>
                <Link className="liens" to="/users/new-user-session">
                  Sign in
                </Link>
              </span>
            </div>
            <div className="p-2 ">
              <Link
                className="btn btn-outline-dark"
                to="/requests/add-new-request"
              >
                Start a post
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Guest;
