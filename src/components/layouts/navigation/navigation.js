import React from "react";
import { Link } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";

class Navigation extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column bg-white">
        <div className="d-flex ">
          <div className="p-4">
            <strong>
              <span className="text-uppercase ">Nemeton</span>
            </strong>
          </div>
          <div className="ml-auto p-2 d-flex">
            <div className="p-3 d-none d-xs-none d-sm-none d-md-block">
              <span>
                <Link className="liens" to="/">
                  Register
                </Link>{" "}
                or
              </span>{" "}
              <span>
                <Link className="liens" to="/">
                  Sign in
                </Link>
              </span>
            </div>
            <div className="p-2">
              <Button variant="outline-dark">Post ad</Button>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-start bg-light mr-md-auto ml-md-auto">
          <Navbar expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link className="nav-link text-uppercase" to="/">
                  Home
                </Link>
                <Link className="nav-link text-uppercase" to="/">
                  About
                </Link>
                <Link className="nav-link text-uppercase" to="/">
                  Contact
                </Link>
              </Nav>
              <Nav className="d-sm-none ">
                <div>
                  <span>
                    <Link className="liens" to="/">
                      Register
                    </Link>{" "}
                    OR
                  </span>{" "}
                  <span>
                    <Link className="liens" to="/">
                      Sign in
                    </Link>
                  </span>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}
export default Navigation;
