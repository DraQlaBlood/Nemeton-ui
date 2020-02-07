import React from "react";

import { inject, observer } from "mobx-react";

import { Tabs, Tab } from "react-bootstrap";
import AccountSettings from "./utils/accountSettings";

@inject("user", "account")
@observer
class Settings extends React.Component {
  componentDidMount = async () => {
    await this.props.user.signIn();

    const { account } = this.props;
    account.fetchAll();
  };
  render() {
    const { all } = this.props.account;

    return (
      <div className="flex-grow-1 container">
        <div className="d-flex justify-content-around pt-3">
          <div className="text-center w-100">
            <Tabs defaultActiveKey="Account" className="d-flex justify-content-around">
              <Tab eventKey="Account" title="Accounts" className="p-3">
                <AccountSettings accounts={all} />
              </Tab>
              <Tab eventKey="Privacy" title="Privacy" className="p-3">
                test privacy
              </Tab>
              <Tab
                eventKey="Communications"
                title="Communications"
                className="p-3"
              >
                test communications
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}
export default Settings;
