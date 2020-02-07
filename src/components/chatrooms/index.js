import React from "react";

import Inbox from "./left/inbox";
import Discussion from "./right/discussion";
import history from "../../history";

import { inject, observer } from "mobx-react";

@inject("user", "account")
@observer
class Messaging extends React.Component {
  componentDidMount() {
    this.props.user.signIn();
    const { account } = this.props;
    account.fetchAll();
  }
  render() {
    const {all} = this.props.account;
    if (all.length === 0) history.push("/welcome");
    return (
      <div className="px-5 py-3  row ">
        <div className="col-md-3 ">
          <Inbox />
        </div>
        <div className="col-md-7 ">
          <Discussion />
        </div>
      </div>
    );
  }
}
export default Messaging;
