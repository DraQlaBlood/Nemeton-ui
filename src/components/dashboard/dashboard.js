import React from "react";

import { inject, observer } from "mobx-react";

import Bundle from "./accountBundle";
import Layout from "./layout"

@inject("user", "account")
@observer
class Dashboard extends React.Component {
  componentDidMount = async () => {
    await this.props.user.signIn();
    const { account } = this.props;
    account.fetchAll();
  };

  render() {
    const { all } = this.props.account;

    if (all.length === 0) return <Bundle />;

    return <Layout />
  }
}
export default Dashboard;
