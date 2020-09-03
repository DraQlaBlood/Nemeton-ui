import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { inject, observer } from "mobx-react";

@inject("request")
@observer
class Request extends React.Component {
  handleCloseRequestModal = async () => {
    await this.props.request.isShowRequestModal(false);
  };
  render() {
    return (
      <div className="flex-grow-1">
        <Modal.Header closeButton>
          <Modal.Title>New Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form noValidate>
              <Form.Group>
                <Form.Control type="file" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description: </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="5"
                  ref="description"
                  placeholder="Discussion description"
                />
                <Form.Text className="text-muted">
                  Share your concern with other members.
                </Form.Text>
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleCloseRequestModal}>
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
export default Request;
