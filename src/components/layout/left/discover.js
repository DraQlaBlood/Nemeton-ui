import React from "react";
import { Accordion, Button } from "react-bootstrap";

class Discover extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column bg-white shadow ">
        <Accordion defaultActiveKey="0">
          <div>
            <div className="bg-light">
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Recent
              </Accordion.Toggle>
            </div>
            <Accordion.Collapse eventKey="0" className="p-2">
              <p>Hello! I'm the body</p>
            </Accordion.Collapse>
          </div>
          <div>
            <div className="bg-light">
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Groups
              </Accordion.Toggle>
            </div>
            <Accordion.Collapse eventKey="1" className="p-2">
              <p>Hello! I'm the body</p>
            </Accordion.Collapse>
          </div>
        </Accordion>
        <div className="d-flex justify-content-between p-2">
          <span>Events</span>
          <span>
            <i className="fas fa-plus"></i>
          </span>
        </div>

        <hr />
        <div className="text-center p-2">Discover more</div>
      </div>
    );
  }
}
export default Discover;
