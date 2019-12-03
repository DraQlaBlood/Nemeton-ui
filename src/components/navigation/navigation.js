import React from "react";
import Guest from "./guest";
import Member from "./member";

import { inject, observer } from "mobx-react";

@inject("user")
@observer
class Navigation extends React.Component {
  render() {
    const user = this.props.user.signedIn;
    return (
      <div>
        {user && <Member />}
        {!user && <Guest />}
      </div>
    );
  }
}
export default Navigation;
