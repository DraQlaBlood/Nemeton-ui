import React from "react";

import { inject, observer } from "mobx-react";
import { Form} from "react-bootstrap";

@inject("directMessaging", "account")
@observer
class NewDirectConversation extends React.Component {
  directChatSearchBubble = () => {
    this.props.directMessaging.setIsDirectChatBubbleSearchOpen(
      !this.props.directMessaging.isDirectChatBubbleSearchOpen
    );
  };

  onChange = (e) => {
    e.preventDefault();
    let account = this.refs.account.value;
    this.props.directMessaging.setReceiver(account);
  };

  createConversation = (sender_id, recipient_id) => {
    this.props.directMessaging.addDirectConversation(sender_id, recipient_id);
  };

  render() {
    const { all, account } = this.props.account;
    let sender_id = account.id;
    let sender_name = account.name;

    return (
      <div className="instantChat  rounded d-flex">
        <div className="flex-grow-1 d-flex flex-column rounded bg-blue text-white">
          <i
            className="fas fa-times fa-x p-2"
            onClick={this.directChatSearchBubble}
          ></i>
          <div className=" flex-fill d-flex justify-content-center mt-3">
            <Form>
                  <Form.Control
                    placeholder="Send message to: "
                    className="bg-light text-dark"
                    ref="account"
                    onChange={this.onChange}
                  />
            </Form>
          </div>
          <div className="mt-2 p-3">
            {all
              .slice()
              .filter((account) => {
                return account.name !== sender_name;
              })
              .filter((account) => {
                if (!this.props.directMessaging.receiver) return false;
                if (
                  account.name.toLowerCase().includes(this.props.directMessaging.receiver)
                ) {
                  return true;
                }
              })
              .map((account) => (
                <div className="d-flex justify-content-between">
                  <p>{account.name}</p>
                  <i
                    className="far fa-comment-alt fa-x"
                    onClick={() =>
                      this.createConversation(sender_id, account.id)
                    }
                  ></i>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}
export default NewDirectConversation;
