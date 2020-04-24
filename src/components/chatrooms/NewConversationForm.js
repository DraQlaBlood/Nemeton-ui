import React from "react";
import { Form, Button } from "react-bootstrap";

import { inject, observer } from "mobx-react";

@inject("messaging", "organization")
@observer
class NewConversationForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault();
    let title = this.refs.title.value;
    let description = this.refs.description.value;
    await this.props.messaging.addConversation(
      title,description,
      this.props.organization_slug
    );
    await this.props.organization.setShowModal(false);
  };

  render = () => {
    return (
      <div className="newConversationForm py-2">
        <Form noValidate>
          <Form.Group>
          <Form.Label>Topic: </Form.Label>
            <Form.Control type="text" ref="title" placeholder="Discussion topic" />
            
          </Form.Group>
          <Form.Group >
            <Form.Label>Description: </Form.Label>
            <Form.Control
              as="textarea"
              rows="10"
              ref="description"
              placeholder="Discussion description"
            />
            <Form.Text className="text-muted">
              Share your concern with other members.
            </Form.Text>
          </Form.Group>
          <Button
            block
            onClick={this.handleSubmit}
            className=" btn-global-orange"
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  };
}

export default NewConversationForm;
