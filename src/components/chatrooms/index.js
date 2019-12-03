import React from "react";

import Inbox from "./left/inbox";
import Discussion from "./right/discussion";

import { inject, observer } from "mobx-react";

@inject("user")
@observer
class Messaging extends React.Component {
  componentDidMount() {
    this.props.user.signIn();
  }
  render() {
    return (
      <div className="px-5 py-3  row ">
        <div className="col-md-3 ">
          <Inbox />
        </div>
        <div className="col-md-9 ">
          <Discussion />
        </div>
      </div>
    );
  }
}
export default Messaging;
