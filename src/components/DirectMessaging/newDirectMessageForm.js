import React from "react";
import { Form, Button } from "react-bootstrap";

import { inject, observer } from "mobx-react";

@inject("directMessaging")
@observer
class NewDirectMessageForm extends React.Component {
  componentDidMount = () => {
    this.props.directMessaging.directconversation_id = this.props.directconversation_id;
  };
  componentWillReceiveProps = (nextProps) => {
    this.props.directMessaging.directconversation_id = nextProps.directconversation_id;
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { directconversation_id } = this.props.directMessaging;
    let message = this.refs.message.value;
    this.props.directMessaging.addMessage(message, directconversation_id);
    this.refs.message.value = "";
  };

  render = () => {
    return (
      <div className="newMessageForm py-2 d-flex">
        <div className="w-100 ">
          <Form noValidate>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                ref="message"
                placeholder="Send message ..."
              />
            </Form.Group>
          </Form>
        </div>
        <div className="flex-shrink-1 px-2 ">
          <Button onClick={this.handleSubmit} className=" btn-global-orange ">
            Send
          </Button>
        </div>
      </div>
    );
  };
}

export default NewDirectMessageForm;
