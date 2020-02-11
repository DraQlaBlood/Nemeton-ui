import React from "react";

import { inject, observer } from "mobx-react";
import { Tabs, Tab, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../network.css";

@inject("user", "account", "organization", "globalparams")
@observer
class ShowOrganization extends React.Component {
  componentDidMount = async () => {
    await this.props.user.signIn();
    await this.props.account.fetchAll();
    await this.props.account.find();
    await this.props.organization.fetchAll();
    const { orgName } = this.props.match.params;
    this.props.organization.test = orgName;
    await this.props.organization.find();
    await this.props.globalparams.findAll();
  };

  render() {
    const { org } = this.props.organization;
    const { all , allFromAcount} = this.props.globalparams;

    console.log("about :" , org)
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
                <i className="fas fa-user-friends pr-2"></i>10 Members . type of
                group
              </span>
              <span>
                <i className="fas fa-user-secret pr-2"></i> 10 Followers
              </span>
              <div className=" d-flex flex-column ">
                <span className="py-2">Organizer name</span>
                <Link to="#">Contact organizer</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border-bottom py-2 px-5">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <Link className="px-2">Like</Link>
              <Link className="px-2">Share</Link>
              <Link className="px-2">Follow</Link>
              <Link className="px-2">Join this organization</Link>
            </div>

            <Link to="#">Post a new article</Link>
          </div>
        </div>
        <div className="container row mt-3 mx-auto">
          <div className="col-md-8 p-3 ">
            <Tabs defaultActiveKey="About" id="uncontrolled-tab-example">
              <Tab eventKey="About" title="About">
                <div className="py-3">
                  {org.about}
                </div>
              </Tab>
              <Tab eventKey="Members" title="Members">
                <div className="row py-3">
                  <div className="col-md-3">
                    <p>Owners</p>
                    <span>{org.account_id}</span>
                  </div>
                  <div className="col-md-9">
                    <p>Members</p>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="Discussions" title="Discussions"></Tab>
              <Tab eventKey="Posts / Events" title="Posts / Events"></Tab>
              <Tab eventKey="Our Calendar" title="Our Calendar"></Tab>
            </Tabs>
          </div>
          <div className="col-md-4 p-3 ">
            <div className="p-4 border mb-2">
              <h5>From the same organizer</h5>
              <div className="d-flex flex-column py-2">
                {allFromAcount.slice(0,5).map(org => {
                    return (
                      <span key={org.id}>
                      <Link
                        to={org.slug}
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
            <div className="p-4 border mb-2">
              <h5>Suggested Organizations</h5>
              <div className="d-flex flex-column py-2">
                {all.slice(0,5).map(org => {
                    return (
                      <span key={org.id}>
                      <Link
                        to={org.slug}
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
export default ShowOrganization;
