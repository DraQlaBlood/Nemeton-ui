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
import Spinner from "../../lib/components/spinner/load";
import { ActionCableConsumer } from "react-actioncable-provider";
import OrganizationFeeds from "./organizationFeeds";
import Request from "../Requests/new";

var moment = require("moment");

@inject("user", "account", "organization", "membership", "event", "request")
@observer
class OrgModel extends React.PureComponent {
  componentDidMount = async () => {
    await this.props.user.signIn();

    const { id } = this.props.match.params;
    await this.props.organization.findOne(id);
    await this.props.account.fetchAll();
    await this.props.account.find();
  };

  /**componentWillReceiveProps = async (prevProps) => {
    if (this.props.membership.notification) {
      await this.props.user.signIn();
      await this.props.account.fetchAll();
      await this.props.account.find();
      const { id } = this.props.match.params;
      await this.props.organization.findOne(id);
      this.props.membership.showNotification(false);
    }
  };*/

  joinOrganization = async () => {
    const { organization } = this.props.organization;
    await this.props.membership.showNotification(true);
    const { organization_slug } = this.props.match.params;
    await this.props.membership.join(organization_slug);

    if (this.props.membership.notification) {
      store.addNotification({
        title: "Organization Member",
        message: `You are now member of ${organization.name}`,
        type: "success", // 'default', 'success', 'info', 'warning'
        container: "bottom-left", // where to position the notifications
        animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
        dismiss: {
          duration: 3000,
        },
      });
      this.props.membership.showNotification(false);
    }
  };
  leaveOrganization = async () => {
    const { organization } = this.props.organization;
    await this.props.membership.showNotification(true);
    const { organization_slug } = this.props.match.params;
    await this.props.membership.leave(organization_slug);

    if (this.props.membership.notification) {
      store.addNotification({
        title: "Organization Member",
        message: `You are no longer member of ${organization.name}`,
        type: "danger", // 'default', 'success', 'info', 'warning'
        container: "bottom-left", // where to position the notifications
        animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
        dismiss: {
          duration: 3000,
        },
      });
      this.props.membership.showNotification(false);
    }
  };

  likeOrganization = async () => {
    await this.props.membership.showNotification(true);

    const { organization_slug } = this.props.match.params;
    await this.props.membership.like(organization_slug);
    if (this.props.membership.notification) {
      this.props.membership.showNotification(false);
    }
  };

  disLikeOrganization = async () => {
    await this.props.membership.showNotification(true);

    const { organization_slug } = this.props.match.params;
    await this.props.membership.disLike(organization_slug);
    if (this.props.membership.notification) {
      this.props.membership.showNotification(false);
    }
  };

  handleShow = async () => {
    await this.props.event.setShowModal(true);
  };

  handleShowRequestModal = async () => {
    await this.props.request.isShowRequestModal(true);
  };
  handleCloseRequestModal = async () => {
    await this.props.request.isShowRequestModal(false);
  };

  handleReceived = (response) => {
    const { likers } = response;
    this.props.organization.setOrganizationLikes(likers);
  };

  handleReceivedfollowers = (response) => {
    const { followers } = response;
    console.log(followers);
    this.props.organization.setOrganizationFollows(followers);
  };

  render() {
    const { organization, isLoading } = this.props.organization;
    const { account } = this.props.account;
    const { organization_slug } = this.props.match.params;
    const { showModal } = this.props.event;
    const { showRequestModal } = this.props.request;

    return (
      <div className="flex-grow-1 d-flex bg-white">
        <ActionCableConsumer
          channel={{ channel: "FollowersnotificationsChannel" }}
          onReceived={this.handleReceivedfollowers}
        />

        <ActionCableConsumer
          channel={{ channel: "WebNotificationsChannel" }}
          onReceived={this.handleReceived}
        />

        {isLoading ? (
          <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex-grow-1 bg-white">
            <div className="banner ">
              <div className="pl-5 orgDetails d-flex align-items-center">
                <div className=" d-flex flex-column ">
                  <span>
                    <h3 className="pr-2 pb-4 font-weight-bold titlesh4 text-capitalize">
                      {organization.name}
                    </h3>
                  </span>
                  {undefined !== organization.status && organization.status ? (
                    <span>
                      {organization.status === "close" ? (
                        <span>
                          {" "}
                          <i className="fas fa-lock pr-2"></i>Private
                          Organization
                        </span>
                      ) : (
                        <span>
                          <i className="fas fa-lock-open pr-2"></i>Public
                          Organization
                        </span>
                      )}
                    </span>
                  ) : null}
                  {undefined !== organization.location &&
                  organization.location ? (
                    <span>
                      <i className="fas fa-map-marker pr-2"></i>
                      {organization.location}
                    </span>
                  ) : null}
                  {undefined !== organization.likers &&
                  organization.likers.length ? (
                    <span>
                      <i className="fas fa-heart pr-2"></i> Liked by{" "}
                      {organization.likers.length} people
                    </span>
                  ) : null}

                  {undefined !== organization.followers &&
                  organization.followers.length ? (
                    <span>
                      <i className="fas fa-users pr-2"></i>{" "}
                      {organization.followers.length} Members
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="border-bottom py-3 px-5">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <Link to="/organizations" className="mr-5 showLinks">
                    <i className="fas fa-arrow-left px-2"></i>My organizations
                  </Link>

                  {undefined !== organization.likers &&
                  organization.likers.length > 0 &&
                  organization.likers.slice().filter(function (acc) {
                    return acc.id === account.id;
                  }).length > 0 ? (
                    <Link
                      to="#"
                      onClick={this.disLikeOrganization}
                      className="px-2 showLinks"
                    >
                      Dislike
                    </Link>
                  ) : (
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
                </div>
                {undefined !== organization.followers &&
                organization.followers.length > 0 &&
                organization.followers.slice().filter(function (acc) {
                  return acc.id === account.id;
                }).length > 0
                  ? undefined !== organization.account &&
                    organization.account.id !== account.id && (
                      <Link
                        to="#"
                        onClick={this.leaveOrganization}
                        className="px-2 showLinks"
                      >
                        Leave this organization
                      </Link>
                    )
                  : undefined !== organization.account &&
                    organization.account.id !== account.id && (
                      <Link
                        to="#"
                        onClick={this.joinOrganization}
                        className="px-2 showLinks"
                      >
                        Join this organization
                      </Link>
                    )}
                {undefined !== organization.account &&
                organization.account.id === account.id ? (
                  <div className="d-flex">
                    <Link
                      to="#"
                      onClick={this.handleShow}
                      className="showLinks mx-2"
                    >
                      New Event
                    </Link>
                    <Link
                      to="#"
                      onClick={this.handleShowRequestModal}
                      className="showLinks ml-3 text-capitalize"
                    >
                      New organization Request
                    </Link>
                    <i className="fas fa-ellipsis-v ml-3"></i>
                  </div>
                ) : null}
              </div>
            </div>
            <Modal show={showModal} onHide={this.handleClose}>
              <Post organization_id={organization.id} />
            </Modal>
            <Modal show={showRequestModal} onHide={this.handleCloseRequestModal}>
              <Request organization_id={organization.id} />
            </Modal>
            <div className="row mx-auto showBody">
              <div className="col-md-8">
                <Tabs
                  defaultActiveKey="About"
                  className="d-flex justify-content-around"
                >
                  <Tab eventKey="About" title="About">
                    <div className="p-3 row">
                      <div className="col-sm-12 col-md-12">
                        <div className="d-flex flex-column">
                          <p className="pb-4">{organization.about}</p>

                          {organization.mail ? (
                            <h5 className="mt-3">Contact us</h5>
                          ) : null}

                          <div className="d-flex justify-content-between my-2">
                            {organization.mail ? (
                              <span className="p-2 border bg-light">
                                <i className="fas fa-envelope px-2"></i>
                                {organization.mail}
                              </span>
                            ) : null}
                          </div>
                          {organization.facebook ||
                          organization.twitter ||
                          organization.instagram ||
                          organization.youtube ||
                          organization.linkedin ? (
                            <h5 className="mt-3">Follow us</h5>
                          ) : null}
                          <div className="d-flex justify-content-between my-2">
                            {organization.facebook ? (
                              <span className="p-2 border bg-light">
                                <i className="fab fa-facebook-f px-2"></i>
                                {organization.facebook}
                              </span>
                            ) : null}
                            {organization.twitter ? (
                              <span className="p-2 border bg-light">
                                <i className="fab fa-twitter px-2"></i>
                                {organization.twitter}
                              </span>
                            ) : null}
                            {organization.instagram ? (
                              <span className="p-2 border bg-light">
                                <i className="fab fa-instagram px-2"></i>
                                {organization.instagram}
                              </span>
                            ) : null}
                            {organization.youtube ? (
                              <span className="p-2 border bg-light">
                                <i className="fab fa-youtube px-2"></i>
                                {organization.youtube}
                              </span>
                            ) : null}
                            {organization.linkedin ? (
                              <span className="p-2 border bg-light">
                                <i className="fab fa-linkedin-in px-2"></i>
                                {organization.linkedin}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="Events" title="Events">
                    {(undefined !== organization.account &&
                      organization.account.id === account.id) ||
                    (undefined !== organization.followers &&
                      organization.followers.length &&
                      organization.followers.slice().filter(function (account) {
                        return account.id === account.id;
                      }).length > 0) ? (
                      <AllEvents org_id={organization.id} />
                    ) : (
                      <div className="d-flex justify-content-center py-5">
                        <div className="col-6">
                          <MembersOnly />
                        </div>
                      </div>
                    )}
                  </Tab>

                  <Tab eventKey="Discussions" title="Discussions">
                    {(undefined !== organization.account &&
                      organization.account.id === account.id) ||
                    (undefined !== organization.followers &&
                      organization.followers.length &&
                      organization.followers.slice().filter(function (account) {
                        return account.id === account.id;
                      }).length > 0) ? (
                      <Messaging organization_slug={organization_slug} />
                    ) : (
                      <div className="d-flex justify-content-center py-5">
                        <div className="col-6">
                          <MembersOnly />
                        </div>
                      </div>
                    )}
                  </Tab>
                  <Tab eventKey="Members" title="Members">
                    {(undefined !== organization.account &&
                      organization.account.id === account.id) ||
                    (undefined !== organization.followers &&
                      organization.followers.length &&
                      organization.followers.slice().filter(function (account) {
                        return account.id === account.id;
                      }).length > 0) ? (
                      <div className="row">
                        <div className="col-md-3 col-sm-12">
                          <div
                            className="nav flex-column nav-pills sticky-top"
                            id="v-pills-tab"
                            role="tablist"
                            aria-orientation="vertical"
                          >
                            <a
                              className="nav-link active btn-settings text-muted"
                              id="v-pills-leadership-tab"
                              data-toggle="pill"
                              href="#v-pills-leadership"
                              role="tab"
                              aria-controls="v-pills-leadership"
                              aria-selected="true"
                            >
                              Organization Team
                            </a>
                            <a
                              className="nav-link btn-settings text-muted"
                              id="v-pills-members-tab"
                              data-toggle="pill"
                              href="#v-pills-members"
                              role="tab"
                              aria-controls="v-pills-members"
                              aria-selected="false"
                            >
                              All members
                            </a>
                          </div>
                        </div>
                        <div className="col-md-9 col-sm-12">
                          <div className="tab-content" id="v-pills-tabContent">
                            <div
                              className="tab-pane fade show active p-2"
                              id="v-pills-leadership"
                              role="tabpanel"
                              aria-labelledby="v-pills-leadership-tab"
                            >
                              <div className="p-2 my-2 d-flex bg-light justify-content-between">
                                <div className="d-flex flex-column">
                                  <h5>{organization.account.name}</h5>
                                  <div className="text-muted d-flex">
                                    <span className="text-muted px-2">
                                      Organizer - Joined on
                                    </span>
                                    {moment(
                                      new Date(organization.account.created_at)
                                    ).format("MMMM Do YYYY")}
                                  </div>
                                </div>

                                <i className="far fa-comment-alt fa-x"></i>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade p-2"
                              id="v-pills-members"
                              role="tabpanel"
                              aria-labelledby="v-pills-members-tab"
                            >
                              <div className="flex-fill d-flex flex-column">
                                {undefined !== organization.followers &&
                                  organization.followers
                                    .slice()
                                    .map((member) => {
                                      return (
                                        <div
                                          key={member.id}
                                          className="p-2 my-2 d-flex bg-light justify-content-between"
                                        >
                                          <div className="d-flex flex-column">
                                            <h5>{member.name}</h5>
                                            <div className="text-muted d-flex">
                                              <span className="text-muted px-2">
                                                Joined on
                                              </span>
                                              {moment(
                                                new Date(member.created_at)
                                              ).format("MMMM Do YYYY")}
                                            </div>
                                          </div>
                                          <i className="far fa-comment-alt fa-x "></i>
                                        </div>
                                      );
                                    })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center py-5">
                        <div className="col-6">
                          <MembersOnly />
                        </div>
                      </div>
                    )}
                  </Tab>
                </Tabs>
              </div>
              <div className="col-md-4 border-left bg-light">
                {undefined !== organization.account ? (
                  <div className="p-4 d-flex flex-column">
                    <div className="our-team border">
                      <div className="picture">
                        <img
                          className="img-fluid"
                          alt=""
                          src="https://picsum.photos/130/130?image=1027"
                        />
                      </div>
                      <div className="team-content">
                        <h5 className="font-weight-bold ">
                          {organization.account.name}
                        </h5>
                        <p>Organization admin - View profile</p>
                        <p className="title line-clamp2">
                          {organization.account.bio}
                        </p>
                      </div>
                      <ul className="social d-flex justify-content-around p-2">
                        <li>
                          <i className="fab fa-facebook-f fa-x"></i>
                        </li>
                        <li>
                          <i className="fab fa-twitter fa-x"></i>
                        </li>
                        <li>
                          <i className="fab fa-instagram fa-x"></i>
                        </li>
                        <li>
                          <i className="fab fa-youtube fa-x"></i>
                        </li>
                        <li>
                          <i className="fab fa-linkedin-in fa-x"></i>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : null}
                <div className="mb-3">
                  <OrganizationFeeds organization_slug={organization_slug} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default OrgModel;
