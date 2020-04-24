import React from "react";

import { inject, observer } from "mobx-react";
import { Form, Row, Col } from "react-bootstrap";

@inject("directMessaging", "account")
@observer
class NewDirectConversation extends React.Component {
  newConversation = () => {
    this.props.directMessaging.setNewConversation(
      !this.props.directMessaging.newConversation
    );
  };

  onChange = (e) => {
    e.preventDefault();
    let account = this.refs.account.value;
    this.props.directMessaging.setReceiver(account);
  };

  render() {
    const { all } = this.props.account;

    return (
      <div className="instantChat  rounded d-flex">
        <div className="flex-grow-1 d-flex flex-column rounded bg-blue text-white">
          <i
            className="fas fa-times fa-x p-2"
            onClick={this.newConversation}
          ></i>
          <div className=" flex-fill d-flex justify-content-center mt-3">
            <Form>
              <Row>
                <Col>
                  <Form.Control
                    placeholder="Send message to: "
                    className="bg-light text-dark"
                    ref="account"
                    onChange={this.onChange}
                  />
                </Col>
              </Row>
            </Form>
          </div>
          <div className="mt-2 p-3">
            {all.slice()
              .filter((account) => {
                if (!this.props.directMessaging.receiver) return false;
                if (
                  account.name.includes(this.props.directMessaging.receiver)
                ) {
                  return true;
                }
              })
              .map((account) => (
                <div className="d-flex justify-content-between">
                  <p>{account.name}</p>
                  <i className="far fa-comment-alt fa-x "></i>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}
export default NewDirectConversation;
