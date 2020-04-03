import React from "react";
import { inject, observer } from "mobx-react";
import DateTimePicker from "react-datetime-picker";

import "./post.css";

import { Modal, Form, Col, Row, Button } from "react-bootstrap";

@inject("event")
@observer
class Post extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    let title = this.refs.title.value;
    let description = this.refs.description.value;
    let address = this.refs.address.value;
    let spots = this.refs.spots.value;

    this.props.event.addEvent(
      title,
      description,
      address,
      this.props.event.startTime,
      this.props.event.endTime,
      spots,
      this.props.organization_id
    );

    this.handleClose();
  };
  handleClose = async () => {
    await this.props.event.setShowModal(false);
  };

  setStartDate = startDate => this.props.event.setStartTime(startDate);
  setEndDate = date => this.props.event.setEndTime(date);

  render() {
    const { startTime, endTime } = this.props.event;
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Row className="p-2">
                <Col>
                  <Form.Control ref="title" placeholder="Title" />
                </Col>
              </Row>
              <Row className="p-2">
                <Col>
                  <Form.Control
                    as="textarea"
                    rows="15"
                    ref="description"
                    placeholder="description"
                  />
                </Col>
              </Row>
              <Row className="p-2">
                <Col>
                  <Form.Label>Start date</Form.Label>
                  <DateTimePicker
                    onChange={this.setStartDate}
                    value={startTime}
                  />
                </Col>
                <Col>
                  <Form.Label>End date</Form.Label>
                  <DateTimePicker onChange={this.setEndDate} value={endTime} />
                </Col>
              </Row>
              <Row className="p-2">
                <Col>
                  <Form.Control
                    ref="address"
                    placeholder="Location (eg: city, Province or country)"
                  />
                </Col>
              </Row>
              <Row className="p-2">
                <Col>
                  <Form.Control type="file" />
                </Col>
                <Col>
                  <Form.Control ref="spots" placeholder="Free spots" />
                </Col>
              </Row>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button className="btn-red" onClick={this.handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}
export default Post;
