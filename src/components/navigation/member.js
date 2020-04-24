import React from "react";
import { Link } from "react-router-dom";
import { NavDropdown, Modal, Form, Row, Col } from "react-bootstrap";
import { inject, observer } from "mobx-react";

import Sidebar from "react-sidebar";
import SidebarContent from "./sidemenu/sidebar_content";
import AddAccount from "../dashboard/accounts/new";
import { ActionCableConsumer } from "react-actioncable-provider";
import Cable from "../chatrooms/Cables";

@inject("user", "account", "views", "messaging")
@observer
class Member extends React.Component {

  componentDidMount=async()=>{
    await this.props.account.fetchAll();
    await this.props.account.find();
  }
  
  signOut = (e) => {
    e.preventDefault();
    const { user } = this.props;
    user.destroySession();
  };

  handleReceivedConversation = (response) => {
    const { conversation } = response;
    const { account } = this.props.account;
    if (account.id !== conversation.account.id) {
      this.props.messaging.setNotification(true);
    }
  };

  handleReceivedMessage = (response) => {
    const { message } = response;
    const { account} = this.props.account;

    console.log(message.account.id, account.id)

    if (account.id !== message.account.id) {
      this.props.messaging.setNotification(true);
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    let account_id = this.refs.account_id.value;
    this.props.account.hasAccount(account_id);
  };

  handleClose = async () => {
    await this.props.account.setShowModal(false);
  };
  handleShow = async () => {
    await this.props.account.setShowModal(true);
  };

  render() {
    const { user } = this.props;
    const { showModal, account } = this.props.account;
    const { conversations } = this.props.messaging;
    const sidebar = <SidebarContent />;
    const sidebarProps = {
      sidebar,
      open: this.props.views.isSidebarOpen,
      pullRight: true,
    };
    return (
      <div className="d-flex flex-column bg-white ">
        <ActionCableConsumer
          channel={{ channel: "ConversationsChannel" }}
          onReceived={this.handleReceivedConversation}
        />
        {conversations.length ? (
          <Cable
            conversations={this.props.messaging.conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <div className="d-none d-block d-sm-block d-md-block d-lg-none">
          <Sidebar {...sidebarProps} />
        </div>
        <Modal show={showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create new account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddAccount />
          </Modal.Body>
        </Modal>

        <div className="d-flex border-bottom">
          <div className="px-4 py-3 d-none d-xs-none d-sm-none d-md-none d-lg-block">
            <Link className="nav-link text-uppercase" to="/welcome">
              <span className="text-uppercase font-weight-bold ">Nemeton</span>
            </Link>
          </div>

          <div className=" mx-5 px-3 py-3 flex-fill">
            <Form>
              <Row>
                <Col>
                  <Form.Control
                    placeholder="Search events, organizations"
                    className="bg-light text-dark"
                  />
                </Col>
              </Row>
            </Form>
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

                <div className="notification px-3 nav-link">
                  <Link className=" liens " to="/notifications">
                    <i className="fas fa-bell fa-x"></i>
                  </Link>
                  {this.props.messaging.notification ? (
                    <div class="topright rounded-circle bg-danger"></div>
                  ) : null}
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
                          settings
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
                          <i className=" pr-2 fas fa-newspaper"></i> My events
                        </Link>
                      </div>
                      <div>
                        <Link
                          to="#"
                          onClick={this.handleShow}
                          className="dropdown-item"
                        >
                          <i className=" pr-2 fas fa-user-plus"></i> Add new
                          Account
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
                  className="liens"
                  to="#"
                  onClick={() =>
                    this.props.views.setSidebar(!this.props.views.isSidebarOpen)
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
