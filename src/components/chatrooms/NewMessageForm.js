import React from "react";
import { Form, Button } from "react-bootstrap";

import { inject, observer } from "mobx-react";

@inject("messaging")
@observer
class NewMessageForm extends React.Component {
  componentDidMount = () => {
    this.props.messaging.conversation_id = this.props.conversation_id;
  };
  componentWillReceiveProps = nextProps => {
    this.props.messaging.conversation_id = nextProps.conversation_id;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { conversation_id } = this.props.messaging;
    let message = this.refs.message.value;
    this.props.messaging.addMessage(message, conversation_id);
    this.refs.message.value='';
  };

  render = () => {
    return (
      <div className="newMessageForm mt-3">
        <Form noValidate>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              as="textarea"
              rows="3"
              ref="message"
              placeholder="send a reply"
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              size="lg"
              onClick={this.handleSubmit}
              className=" btn-global-orange"
            >
              Send
            </Button>
          </div>
        </Form>
      </div>
    );
  };
}

export default NewMessageForm;
