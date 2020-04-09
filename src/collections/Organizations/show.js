import React from "react";

import { inject, observer } from "mobx-react";
import { Tabs, Tab, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import "./organization.css";
import Messaging from "../../components/chatrooms";
import MembersOnly from "../../components/LockContents/memberOnly";
import Post from "../Posts/new";
import AllEvents from "../Posts";

@inject("user", "account", "organization", "membership", "event")
@observer
class OrgModel extends React.PureComponent {
  componentDidMount = async () => {
    await this.props.user.signIn();
    await this.props.account.fetchAll();
    await this.props.account.find();
    await this.props.organization.fetchAll();
    const { organization_slug } = this.props.match.params;
    await this.props.organization.find(organization_slug);
  };

  componentDidUpdate = async prevProps => {
    if (this.props.membership.notification) {
      await this.props.user.signIn();
      await this.props.account.fetchAll();
      await this.props.account.find();
      const { organization_slug } = this.props.match.params;
      await this.props.organization.fetchAll();
      await this.props.organization.find(organization_slug);
      this.props.membership.resetNotification(false);
    }
  };

  joinOrganization = async () => {
    const { org } = this.props.organization;
    await this.props.membership.showNotification(true);
    const { organization_slug } = this.props.match.params;
    await this.props.membership.join(organization_slug);

    if (this.props.membership.notification) {
      store.addNotification({
        title: "Organization Member",
        message: `You are now member of ${org.name}`,
        type: "success", // 'default', 'success', 'info', 'warning'
        container: "bottom-left", // where to position the notifications
        animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
        dismiss: {
          duration: 5000
        }
      });
      this.props.membership.resetNotification(false);
    }
  };
  leaveOrganization = async () => {
    const { org } = this.props.organization;
    await this.props.membership.showNotification(true);
    const { organization_slug } = this.props.match.params;
    await this.props.membership.leave(organization_slug);

    if (this.props.membership.notification) {
      store.addNotification({
        title: "Organization Member",
        message: `You are no longer member of ${org.name}`,
        type: "success", // 'default', 'success', 'info', 'warning'
        container: "bottom-left", // where to position the notifications
        animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
        dismiss: {
          duration: 5000
        }
      });
      this.props.membership.resetNotification(false);
    }
  };

  likeOrganization = async () => {
    await this.props.membership.showNotification(true);

    const { organization_slug } = this.props.match.params;
    await this.props.membership.like(organization_slug);
    if (this.props.membership.notification) {
      this.props.membership.resetNotification(false);
    }
  };

  disLikeOrganization = async () => {
    await this.props.membership.showNotification(true);

    const { organization_slug } = this.props.match.params;
    await this.props.membership.disLike(organization_slug);
    if (this.props.membership.notification) {
      this.props.membership.resetNotification(false);
    }
  };

  handleShow = async () => {
    await this.props.event.setShowModal(true);
  };

  render() {
    const { org, followers, likers, orgOwner } = this.props.organization;
    const { account_id } = this.props.account;
    const { organization_slug } = this.props.match.params;
    const { showModal } = this.props.event;
    let status = [];

    let org_member = false;
    for (var i = 0; i < followers.length; i++) {
      if (followers[i].id === account_id) {
        org_member = true;
      }
    }

    let liker = false;
    for (var j = 0; j < likers.length; j++) {
      if (likers[j].id === account_id) {
        liker = true;
      }
    }

    if (org.status === "close") {
      status.push(<span>Private group</span>);
    } else {
      status.push(<span>Public group</span>);
    }

    return (
      <div className="flex-grow-1 bg-white">
        <div className="banner ">
          <div className="pl-5 orgDetails d-flex align-items-center">
            <div className=" d-flex flex-column ">
              <span>
                <h3 className="pr-2 pb-4 font-weight-bold titlesh4 text-capitalize">
                  {org.name}{" "}
                </h3>{" "}
              </span>
              <span>
                <i className="fas fa-map-marker pr-2"></i> {org.location}
              </span>
              <span>
                <i className="fas fa-user-friends pr-2"></i> {followers.length}{" "}
                Members . {status}
              </span>
              <span>
                <i className="fas fa-users pr-2"></i> Liked by {likers.length}{" "}
                people
              </span>
            </div>
          </div>
        </div>
        <div className="border-bottom py-3 px-5">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <Link to="/organizations" className="mr-5 showLinks">
                <i className="fas fa-arrow-left px-2"></i>My organizations
              </Link>
              {liker && (
                <Link
                  to="#"
                  onClick={this.disLikeOrganization}
                  className="px-2 showLinks"
                >
                  Dislike
                </Link>
              )}
              {!liker && (
                <Link
                  to="#"
                  onClick={this.likeOrganization}
                  className="px-2 showLinks"
                >
                  Like
                </Link>
              )}
              <Link to="#" className="px-2 showLinks">
                Share
              </Link>
              {orgOwner.id !== account_id && org_member && (
                <Link
                  to="#"
                  onClick={this.leaveOrganization}
                  className="px-2 showLinks"
                >
                  Leave this organization
                </Link>
              )}
              {orgOwner.id !== account_id && !org_member && (
                <Link
                  to="#"
                  onClick={this.joinOrganization}
                  className="px-2 showLinks"
                >
                  Join this organization
                </Link>
              )}
            </div>
            {orgOwner.id === account_id && (
              <Link to="#" onClick={this.handleShow} className="showLinks mx-2">
                New Event
              </Link>
            )}
          </div>
        </div>
        <Modal show={showModal} onHide={this.handleClose}>
          <Post organization_id={org.id}/>
        </Modal>
        <div className="container row mt-3 mx-auto showBody">
          <div className="col-md-12 p-3 ">
            <Tabs
              defaultActiveKey="About"
              className="d-flex justify-content-around"
            >
              <Tab eventKey="About" title="About">
                <div className="py-3 row">
                  <div className="col-sm-12 col-md-8">
                    <div className="d-flex flex-column">
                      <h5 className="text-capitalize pb-4">{org.about}</h5>
                      {org.mail !== null &&
                        ((
                          <h5 className="font-weight-bold titlesh4 text-capitalize">
                            Contact us
                          </h5>
                        ),
                        (<span>{org.mail}</span>))}
                      {(org.facebook !== "null" ||
                        org.twitter !== null ||
                        org.instagram !== null ||
                        org.youtube !== null ||
                        org.linkedin !== null) &&
                        ((
                          <h5 className="font-weight-bold titlesh4 text-capitalize pt-3">
                            Our social
                          </h5>
                        ),
                        (<span>{org.facebook}</span>),
                        (<span>{org.twitter}</span>),
                        (<span>{org.instagram}</span>),
                        (<span>{org.youtube}</span>),
                        (<span>{org.linkedin}</span>))}
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4 ">
                    <div className="our-team border">
                      <div className="picture">
                        <img
                          className="img-fluid"
                          alt=""
                          src="https://picsum.photos/130/130?image=1027"
                        />
                      </div>
                      <div className="team-content">
                        <h3 className="font-weight-bold ">{orgOwner.name}</h3>
                        <h4 className="title">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry standard dummy text ever since the 1500s
                        </h4>
                      </div>
                      <ul className="social d-flex justify-content-around p-2">
                        <li>
                          <i className="fab fa-facebook-f fa-2x"></i>
                        </li>
                        <li>
                          <i className="fab fa-twitter fa-2x"></i>
                        </li>
                        <li>
                          <i className="fab fa-instagram fa-2x"></i>
                        </li>
                        <li>
                          <i className="fab fa-youtube fa-2x"></i>
                        </li>
                        <li>
                          <i className="fab fa-linkedin-in fa-2x"></i>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="Events" title="Events">
                {((org_member || orgOwner.id === account_id) && (
                    <AllEvents org_id={org.id}/>
                )) || (
                  <div className="d-flex justify-content-center py-5">
                    <div className="col-6">
                      <MembersOnly />
                    </div>
                  </div>
                )}
              </Tab>

              <Tab eventKey="Discussions" title="Discussions">
                {((org_member || orgOwner.id === account_id) && (
                  <Messaging organization_slug={organization_slug} />
                )) || (
                  <div className="d-flex justify-content-center py-5">
                    <div className="col-6">
                      <MembersOnly />
                    </div>
                  </div>
                )}
              </Tab>
              <Tab eventKey="Members" title="Members">
                {((org_member || orgOwner.id === account_id) && (
                  <div className="row py-3">
                    <div className="col-md-3">
                      <p>Owners</p>
                      <span>
                        <img
                          src="https://via.placeholder.com/50"
                          alt="alt images"
                          className="rounded-circle mr-2"
                        />
                        {orgOwner.name}
                      </span>
                    </div>
                    <div className="col-md-9">
                      <p>Members</p>
                      <div className="d-flex flex-column">
                        {followers.slice(0, 25).map((value, item) => {
                          return (
                            <span key={item} className="pb-2">
                              <img
                                src="https://via.placeholder.com/50"
                                alt="alt images"
                                className="rounded-circle mr-2"
                              />
                              {value.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )) || (
                  <div className="d-flex justify-content-center py-5">
                    <div className="col-6">
                      <MembersOnly />
                    </div>
                  </div>
                )}
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}
export default OrgModel;
