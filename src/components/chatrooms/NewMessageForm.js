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
    this.refs.message.value = "";
  };

  render = () => {
    return (
      <div className="newMessageForm mt-3 d-flex">
        <div className="w-100 ">
          <Form noValidate>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                as="textarea"
                rows="2"
                ref="message"
                placeholder="Post a comment"
              />
            </Form.Group>
          </Form>
        </div>
        <div className="flex-shrink-1 px-2 ">
          <Button
            onClick={this.handleSubmit}
            className=" btn-global-orange "
          >
            Send
          </Button> 
        </div>
      </div>
    );
  };
}

export default NewMessageForm;
