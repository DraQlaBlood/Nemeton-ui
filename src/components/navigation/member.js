import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { inject, observer } from "mobx-react";

@inject("user")
@observer
class Member extends React.Component {
  signOut = e => {
    e.preventDefault();
    const { user } = this.props;
    user.destroySession();
  };

  render() {
    const { user } = this.props;
    return (
      <div className="d-flex flex-column bg-white">
        <div className="d-flex ">
          <div className="p-4">
            <Link className="nav-link text-uppercase" to="/welcome">
              <strong>
                <span className="text-uppercase ">Nemeton</span>
              </strong>
            </Link>
          </div>
          <div className="ml-auto p-2 d-flex">
            <div className="p-3 d-none d-xs-none d-sm-none d-md-block">
              <div className="d-flex">
                <div className="p-2 nav-link text-uppercase">
                  <i className="fas fa-comments fa-x"></i>
                  <Link className="pl-2 liens " to="/users/chatrooms">
                    Messaging
                  </Link>
                </div>
                <div className="p-2 nav-link text-uppercase">
                  <i className="fas fa-bell fa-x"></i>
                  <span>Notifications</span>
                </div>
                <div>
                  <NavDropdown
                    className="dropdown-menu-left"
                    title={<i className="fas fa-user fa-x"></i>}
                    id="basic-nav-dropdown"
                  >
                    <div className="p-3">
                      <div className="d-flex flex-column">
                        <div className="p-2">{user.email}</div>
                        <div className="p-2">
                          <Link
                            className="dropdown-item"
                            to="/users/my-profile"
                          >
                            View profile
                          </Link>
                        </div>
                      </div>
                      <hr />
                      <NavDropdown.Item href="#action/3.2">
                        Account settings
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        Something
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#signout" onClick={this.signOut}>
                        Sign Out
                      </NavDropdown.Item>
                    </div>
                  </NavDropdown>
                </div>
                <div className="ml-5">
                  <Link
                    className="btn btn-outline-dark "
                    to="/requests/add-new-request"
                  >
                    Start a post
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-start bg-light mr-md-auto ml-md-auto">
          <Navbar expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link className="nav-link text-uppercase" to="/welcome">
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
                    <a href="#signout" onClick={this.signOut}>
                      Sign Out
                    </a>
                  </span>
                  ||
                  <span>
                    <Link className="liens" to="/">
                      {this.props.user.email}
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
export default Member;
