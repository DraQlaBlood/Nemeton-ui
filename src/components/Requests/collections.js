import React from "react";
//import Switch from "react-switch";
//import { Button, Form } from "react-bootstrap";

import { inject, observer } from "mobx-react";

//import ReqCard from "./requestLayout/reqCard";

@inject("requests")
@observer
class RequestCollections extends React.Component {
  componentDidMount() {
    this.props.requests.fetchAll();
  }

  render() {
    return <div>Test all requests</div>;
  }
}
export default RequestCollections;
