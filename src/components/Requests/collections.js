import React from "react";
//import Switch from "react-switch";
//import { Button, Form } from "react-bootstrap";

import { inject, observer } from "mobx-react";

import ReqCard from "./reqCard";

@inject("requests", "user")
@observer
class ReqCol extends React.Component {
  componentDidMount() {
    this.props.requests.fetchAll();
  }

  render() {
    const requestsList = this.props.all
      .slice()
      .map(req => <ReqCard key={req.id} data={req} />);

    return <div>{requestsList}</div>;
  }
}
export default ReqCol;
