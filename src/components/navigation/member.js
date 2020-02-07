import React from "react";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { inject, observer } from "mobx-react";

import Sidebar from "react-sidebar";
import SidebarContent from "./sidemenu/sidebar_content";

@inject("user", "account", "globalparams")
@observer
class Member extends React.Component {
  signOut = e => {
    e.preventDefault();
    const { user } = this.props;
    user.destroySession();
  };

  handleChange = e => {
    e.preventDefault();
    let account_id = this.refs.account_id.value;
    this.props.account.hasAccount(account_id);
  };

  render() {
    const { user } = this.props;

    const sidebar = <SidebarContent />;
    const sidebarProps = {
      sidebar,
      open: this.props.globalparams.isSidebarOpen,
      pullRight: true
    };
    return (
      <div className="d-flex flex-column bg-white ">
        <div className="d-none d-block d-sm-block d-md-block d-lg-none">
          <Sidebar {...sidebarProps} />
        </div>

        <div className="d-flex border-bottom">
          <div className="px-4 py-3 d-none d-xs-none d-sm-none d-md-none d-lg-block">
            <Link className="nav-link text-uppercase" to="/welcome">
              <strong>
                <span className="text-uppercase ">Nemeton</span>
              </strong>
            </Link>
          </div>
          <div className="ml-auto px-2 d-flex ">
            <div className="px-3 py-3 d-none d-xs-none d-sm-none d-md-none d-lg-block">
              <div className="d-flex">
                <div className="px-3 nav-link">
                  <Link className=" liens " to="/welcome">
                    <i className="fas fa-home fa-x"></i>
                  </Link>
                </div>

                <div className="px-3 nav-link">
                  <Link className=" liens " to="/network">
                    <i className="fas fa-users fa-x"></i>
                  </Link>
                </div>
                <div className="px-3 nav-link">
                  <Link className=" liens " to="/explorer">
                    <i className="fas fa-search fa-x"></i>
                  </Link>
                </div>
                <div className="px-3 nav-link">
                  <Link className=" liens " to="/my-notifications">
                    <i className="fas fa-bell fa-x"></i>
                  </Link>
                </div>
                <div className="px-3 nav-link">
                  <Link className=" liens " to="/users/chatrooms">
                    <i className="fas fa-comments fa-x"></i>
                  </Link>
                </div>

                <div>
                  <NavDropdown
                    alignRight
                    className="accountNav"
                    title={
                      <span>
                        <i className="fas fa-user fa-x"></i>
                        <span className="pl-2">{user.account_id}</span>
                      </span>
                    }
                  >
                    <div className="p-3">
                      <div className="d-flex flex-column">
                        <div>
                          <Link
                            className="dropdown-item text-center"
                            to="/users/my-profile"
                          >
                            View profile
                          </Link>
                        </div>
                      </div>
                      <hr />
                      <div>
                        <Link className="dropdown-item" to="/settings">
                          <i className=" pr-2 fas fa-user-cog"></i>Account
                          management
                        </Link>
                      </div>
                      <div>
                        <Link className="dropdown-item" to="/organizations">
                          <i className=" pr-2 fas fa-sitemap"></i> Organizations
                        </Link>
                      </div>
                      <div>
                        <Link to="/settings" className="dropdown-item">
                          <i className=" pr-2 fas fa-bookmark"></i> Saved
                        </Link>
                      </div>
                      <div>
                        <Link to="/settings" className="dropdown-item">
                          <i className=" pr-2 fas fa-newspaper"></i> Posts
                        </Link>
                      </div>
                      <div>
                        <Link to="/settings" className="dropdown-item">
                          <i className=" pr-2 fas fa-user-plus"></i> Add Account
                        </Link>
                      </div>
                      <div>
                        <Link to="/organizations" className="dropdown-item">
                          <i className=" pr-2 fas fa-id-badge"></i> Add
                          Organization
                        </Link>
                      </div>
                      <NavDropdown.Divider />
                      <div>
                        <Link to="/settings" className="dropdown-item">
                          <i className="pr-2 fas fa-question-circle"></i> Help
                        </Link>
                      </div>

                      <div>
                        <Link to="/settings" className="dropdown-item">
                          <i className="pr-2 fas fa-exclamation-circle"></i>{" "}
                          About
                        </Link>
                      </div>
                      <NavDropdown.Divider />
                      <div>
                        <Link to="/settings" className="dropdown-item">
                          <i className=" pr-2 fas fa-toggle-on"></i> Switch
                          account
                        </Link>
                      </div>

                      <div>
                        <Link
                          to="#"
                          className="dropdown-item"
                          onClick={this.signOut}
                        >
                          <i className="pr-2 fas fa-sign-out-alt"></i> Log Out
                          All accounts
                        </Link>
                      </div>
                    </div>
                  </NavDropdown>
                </div>
              </div>
            </div>
          </div>

          <div className="menuCellphone d-none d-block d-sm-block d-md-block d-lg-none bg-white fixed-bottom">
            <div className="border-top"></div>
            <div className="d-flex justify-content-around">
              <div className="p-3 nav-link">
                <Link className=" liens " to="/welcome">
                  <i className="fas fa-home fa-x"></i>
                </Link>
              </div>
              <div className="p-3 nav-link">
                <Link className=" liens " to="/network">
                  <i className="fas fa-users fa-x"></i>
                </Link>
              </div>

              <div className="p-3 nav-link">
                <Link className=" liens " to="/explorer">
                  <i className="fas fa-search fa-x"></i>
                </Link>
              </div>

              <div className="p-3 nav-link">
                <Link className=" liens " to="/my-notifications">
                  <i className="fas fa-bell fa-x"></i>
                </Link>
              </div>
              <div className="d-flex">
                <div className=" p-3 nav-link">
                  <Link className=" liens " to="/users/chatrooms">
                    <i className="fas fa-comments fa-x"></i>
                  </Link>
                </div>
              </div>
              <div className="p-3 nav-link">
                <Link
                  className=" liens "
                  to="#"
                  onClick={() =>
                    this.props.globalparams.setSidebar(
                      !this.props.globalparams.isSidebarOpen
                    )
                  }
                >
                  <i className="fas fa-user-circle fa-x"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Member;
