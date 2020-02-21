import React from "react";
import { Form, Button } from "react-bootstrap";

import { inject, observer } from "mobx-react";

@inject("messaging", "organization")
@observer
class NewConversationForm extends React.Component {
  handleSubmit = async e => {
    e.preventDefault();
    let title = this.refs.title.value;
    await this.props.messaging.addConversation(title,this.props.organization_slug);
    await this.props.organization.setShowModal(false);
  };

  render = () => {
    return (
      <div className="newConversationForm py-2">
        <Form noValidate>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Create new discussion: </Form.Label>
            <Form.Control as="textarea"
              rows="3"ref="title" placeholder="Discussion topic" />
            <Form.Text className="text-muted">
              Share your concern with other members.
            </Form.Text>
          </Form.Group>
          <Button block onClick={this.handleSubmit} className=" btn-global-orange">
            Submit
          </Button>
        </Form>
        
      </div>
    );
  };
}

export default NewConversationForm;
