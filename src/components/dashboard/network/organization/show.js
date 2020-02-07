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
    const { all } = this.props.globalparams;

    let join = [];

    return (
      <div className="flex-grow-1 ">
        <div className="banner ">
        
        </div>
      </div>
    );
  }
}
export default ShowOrganization;
