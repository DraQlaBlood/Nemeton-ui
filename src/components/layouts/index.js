import React from "react";
import Switch from "react-switch";
import { Button, Form, FormControl } from "react-bootstrap";

import ReqCard from "./requestLayout/reqCard";
import data from "../utils/data";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      requests: data
    };
  }

  handlChange = checked => {
    this.setState({ checked });
  };

  render() {
    const { checked, requests } = this.state;

    const requestsList = requests.map(req => (
      <ReqCard key={req.id} data={req} />
    ));

    return (
      <div className="px-4 flex-grow-1">
        <hr />
        <div className="row">
          <div className=" col-sm-12 col-md-4 ">
            <div className="p-2 bg-white ">
              <div className="d-sm-none">
                <Form className="col-12 ">
                  <FormControl type="text" placeholder="Search by location" />
                </Form>
              </div>
              <div className="d-none d-xs-none d-sm-none d-md-block">
                <div className="d-flex flex-column ">
                  <h5>Type of requests</h5>
                  <Button className=" btn-filter text-left">
                    One-time requests
                  </Button>
                  <Button className=" btn-filter text-left">
                    Continuous requests
                  </Button>
                </div>
                <hr />
                <div className="d-flex flex-column ">
                  <h5>Locations</h5>
                  <Button className=" btn-filter text-left">Location 1</Button>
                  <Button className=" btn-filter text-left">Location 1</Button>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-sm-12 col-md-8 ">
            <div className="p-2 bg-white">
              <div className="d-none d-xs-none d-sm-none d-md-block">
                <div className="d-flex justify-content-end ">
                  <span>Newest first</span>
                  <Switch
                    className="react-switch px-2"
                    onChange={this.handlChange}
                    checked={checked}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    offColor="#000"
                    onColor="#fd7e14"
                  />
                  <span>Oldest first</span>
                </div>
              </div>
              <hr />
              <div>{requestsList}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
