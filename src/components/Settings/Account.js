import React from "react";

import { Nav } from "react-bootstrap";

import { inject, observer } from "mobx-react";
import "./account.css";
import AccountSettings from "../dashboard/accounts/utils/accountSettings";
import General from "./account/general";
import Security from "./account/security";
import Notification from "./account/notification";
import Deactivation from "./account/deactivation";

@inject("user", "account")
@observer
class AccountSetting extends React.Component {
  componentDidMount = async () => {
    await this.props.user.signIn();

    const { account } = this.props;
    account.fetchAll();
  };

  handleChange = (e) => {
    e.preventDefault();
    let account_id = this.refs.account_id.value;
    this.props.account.hasAccount(account_id);
  };
  render() {
    const { all } = this.props.account;
    const { user } = this.props;

    return (
      <div className="flex-grow-1 d-flex flex-column bg-light">
        <div className="top colour-blue d-flex">
          <div className="mx-5 px-5 d-flex flex-fill align-items-center">
            <div className="p-2">
              <i className="fas fa-fingerprint fa-5x"></i>
            </div>
            <div className="p-2 d-flex flex-column">
              <h3>{user.account_id}</h3>
              <div className="d-flex">
                <span className="mr-5"></span>
              </div>
            </div>
            <div className="ml-auto p-2 col-md-4">
              <AccountSettings accounts={all} />
            </div>
          </div>
        </div>
        <div className="bottom flex-grow-1 px-5 py-3">
          <div className="row">
            <div className="col-3">
              <div
                className="nav flex-column nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <a
                  className="nav-link active btn-settings text-muted"
                  id="v-pills-general-tab"
                  data-toggle="pill"
                  href="#v-pills-general"
                  role="tab"
                  aria-controls="v-pills-general"
                  aria-selected="true"
                >
                  General
                </a>
                <a
                  className="nav-link btn-settings text-muted" 
                  id="v-pills-security-tab"
                  data-toggle="pill"
                  href="#v-pills-security"
                  role="tab"
                  aria-controls="v-pills-security"
                  aria-selected="false"
                >
                  Security
                </a>
                
                <a
                  className="nav-link btn-settings text-muted"
                  id="v-pills-notifications-tab"
                  data-toggle="pill"
                  href="#v-pills-notifications"
                  role="tab"
                  aria-controls="v-pills-notifications"
                  aria-selected="false"
                >
                  Notifications
                </a>
                <a
                  className="nav-link btn-settings text-muted"
                  id="v-pills-deactivate-tab"
                  data-toggle="pill"
                  href="#v-pills-deactivate"
                  role="tab"
                  aria-controls="v-pills-deactivate"
                  aria-selected="false"
                >
                  Deactivate account
                </a>
              </div>
            </div>
            <div className="col-9">
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active p-3"
                  id="v-pills-general"
                  role="tabpanel"
                  aria-labelledby="v-pills-general-tab"
                >
                 <General/>
                </div>
                <div
                  className="tab-pane fade p-3"
                  id="v-pills-security"
                  role="tabpanel"
                  aria-labelledby="v-pills-security-tab"
                >
                  <Security/>
                </div>
                
                <div
                  className="tab-pane fade p-3"
                  id="v-pills-notifications"
                  role="tabpanel"
                  aria-labelledby="v-pills-notifications-tab"
                >
                  <Notification/>
                </div>
                <div
                  className="tab-pane fade p-3"
                  id="v-pills-deactivate"
                  role="tabpanel"
                  aria-labelledby="v-pills-deactivate-tab"
                >
                  <Deactivation/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AccountSetting;
