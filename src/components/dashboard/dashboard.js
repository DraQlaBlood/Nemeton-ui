import React from "react";

import { inject, observer } from "mobx-react";

import Layout from "./layout";
import AddAccount from "./accounts/new";

@inject("user", "account")
@observer
class Dashboard extends React.Component {
  componentDidMount = async () => {
    await this.props.user.signIn();
    await this.props.account.fetchAll();
  };

  render() {
    const { all } = this.props.account;
    const {user}  = this.props

    if (user.account_id===null && all.length === 0) return <AddAccount />;
    else return <Layout />;
  }
}
export default Dashboard;
