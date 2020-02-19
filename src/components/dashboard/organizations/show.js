import React from "react";

import { inject, observer } from "mobx-react";
import { Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";

import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import "./organization.css";

@inject("user", "account", "organization", "membership", "globalparams")
@observer
class OrgModel extends React.PureComponent {
  componentDidMount = async () => {
    await this.props.user.signIn();
    await this.props.account.fetchAll();
    await this.props.account.find();
    await this.props.organization.fetchAll();
    const { organization_slug } = this.props.match.params;
    //this.props.organization.test = organization_slug;
    await this.props.organization.find(organization_slug);
    //await this.props.globalparams.findAll();
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

  render() {
    const { all, org, followers, likers ,orgAccount_id} = this.props.organization;
    const { account_id } = this.props.account;

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


    return (
      <div className="flex-grow-1 bg-white">
        <div className="banner ">
          <div className="pl-5 orgDetails d-flex align-items-center">
            <div className=" d-flex flex-column ">
              <span>
                <h4 className="pr-2 pb-4 text-capitalize">{org.name} </h4>{" "}
              </span>
              <span>
                <i className="fas fa-map-marker pr-2"></i> Location
              </span>
              <span>
                <i className="fas fa-user-friends pr-2"></i> {followers.length}{" "}
                Members . type of group
              </span>
              <span>
                <i className="fas fa-users pr-2"></i> Liked by {likers.length}{" "} people
              </span>
              <div className=" d-flex flex-column ">
                <span className="py-2">Created by {orgAccount_id}</span>
                <Link to="#">Contact organizer</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border-bottom py-3 px-5">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <Link to="/organizations" className="mr-5 showLinks">
                <i className="fas fa-arrow-left px-2"></i>Back
              </Link>
              {liker && (<Link
                  to="#"
                  onClick={this.disLikeOrganization}
                  className="px-2 showLinks"
                >
                  Dislike
                </Link>)}
                {!liker && (<Link
                  to="#"
                  onClick={this.likeOrganization}
                  className="px-2 showLinks"
                >
                  Like
                </Link>)}
              <Link to="#" className="px-2 showLinks">
                Share
              </Link>
              {org.account_id !== account_id && org_member && (
                <Link
                  to="#"
                  onClick={this.leaveOrganization}
                  className="px-2 showLinks"
                >
                  Leave this organization
                </Link>
              )}
              {org.account_id !== account_id && !org_member && (
                <Link
                  to="#"
                  onClick={this.joinOrganization}
                  className="px-2 showLinks"
                >
                  Join this organization
                </Link>
              )}
            </div>
            {org_member && (
              <Link to="#" className="showLinks">
                Post a new article
              </Link>
            )}
          </div>
        </div>
        <div className="container row mt-3 mx-auto">
          <div className="col-md-8 p-3 ">
            <Tabs defaultActiveKey="About" id="uncontrolled-tab-example">
              <Tab eventKey="About" title="About">
                <div className="py-3">{org.about}</div>
              </Tab>
              <Tab eventKey="Members" title="Members">
                <div className="row py-3">
                  <div className="col-md-3">
                    <p>Owners</p>
                    <span>
                      <img
                        src="https://via.placeholder.com/50"
                        alt="alt images"
                        className="rounded-circle mr-2"
                      />
                      {orgAccount_id}
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
              </Tab>
              <Tab eventKey="Discussions" title="Discussions"></Tab>
              <Tab eventKey="Posts / Events" title="Posts / Events"></Tab>
            </Tabs>
          </div>
          <div className="col-md-4 p-3 ">
            <div className="p-4 border mb-2">
              <h5>From the same organizer</h5>
              <div className="d-flex flex-column py-2">
                {all
                  .filter(
                    organization =>
                      organization.account_id === org.account_id &&
                      organization.slug !== org.slug
                  )
                  .slice(0, 5)
                  .map(organization => {
                    return (
                      <span key={organization.id}>
                        <Link
                          to={`/show/${organization.slug}`}
                          className="pl-2 text-capitalize text-decoration-none text-reset"
                        >
                          {organization.name}
                        </Link>
                      </span>
                    );
                  })}
                <div className="d-flex justify-content-end">...see more</div>
              </div>
            </div>
            <div className="p-4 border mb-2">
              <h5>Suggested Organizations</h5>
              <div className="d-flex flex-column py-2">
                {all
                  .filter(
                    organization =>
                      organization.account_id !== org.account_id &&
                      organization.account_id !== account_id
                  )
                  .slice(0, 5)
                  .map(org => {
                    return (
                      <span key={org.id}>
                        <Link
                          to={`/show/${org.slug}`}
                          className="pl-2 text-capitalize text-decoration-none text-reset"
                        >
                          {org.name}
                        </Link>
                      </span>
                    );
                  })}
                <div className="d-flex justify-content-end">...see more</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default OrgModel;
