import React from "react";
import { ActionCable } from "react-actioncable-provider";
import Cable from "./Cables";
import NewConversationForm from "./NewConversationForm";
import MessagesArea from "./MessagesArea";

import { Button, Modal } from "react-bootstrap";

import { inject, observer } from "mobx-react";

@inject("user", "organization", "messaging")
@observer
class Messaging extends React.Component {
  componentDidMount = async () => {
    await this.props.user.signIn();
    await this.props.messaging.fetchConversations(this.props.organization_slug);
  };

  handleClick = id => {
    this.props.messaging.activeConversation = id;
  };

  handleReceivedConversation = response => {
    const { conversation } = response;
    //const conversations = [...this.props.messaging.conversations];
    this.props.messaging.setConversations([
      ...this.props.messaging.conversations,
      conversation
    ]);
  };

  handleReceivedMessage = response => {
    const { message } = response;
    const conversations = [...this.props.messaging.conversations];
    console.log(conversations);

    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    //const messages = [...conversation.messages];
    conversation.messages = [...conversation.messages, message];
    this.props.messaging.setConversations(conversations);
  };

  handleClose = async () => {
    await this.props.organization.setShowModal(false);
  };
  handleShow = async () => {
    await this.props.organization.setShowModal(true);
  };
  render() {
    const { conversations, activeConversation } = this.props.messaging;
    const { showModal } = this.props.organization;
    const { organization_slug } = this.props;
    return (
      <div className="flex-grow-1 container p-2">
        <ActionCable
          channel={{ channel: "ConversationsChannel" }}
          onReceived={this.handleReceivedConversation}
        />
        {this.props.messaging.conversations.length ? (
          <Cable
            conversations={conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <div className="organization-banner text-white d-flex flex-column p-3 d-none d-xs-none d-sm-none d-md-none d-lg-block">
          <div className=" d-flex justify-content-between">
            <h4>Ask a question this organization a question !</h4>
            <div className="d-flex">
              <Button className="btn-red" onClick={this.handleShow}>
                Create
              </Button>
              <Modal show={showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Create new discussion topic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <NewConversationForm organization_slug={organization_slug} />
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="d-flex flex-column">
              <div className="mt-3">
                {mapConversations(conversations, this.handleClick)}
              </div>
            </div>
          </div>
          <div className="col-md-8 ">
            {activeConversation ? (
              <MessagesArea
                conversation={findActiveConversation(
                  conversations,
                  activeConversation
                )}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
export default Messaging;

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick) => {
  return conversations.map(conversation => {
    return (
      <div className="p-2 border d-flex flex-column mb-2" key={conversation.id}>
        <div
          onClick={() => handleClick(conversation.id)}
          className="p-2 text-capitalize font-weight-bold showChat"
        >
          {conversation.title}
        </div>
        <div className="d-flex justify-content-end">
          <div className="d-flex justify-content-end p-2">
            <span className="px-2">
              <i className="fas fa-reply"></i>
            </span>
            <span className="px-2">{conversation.messages.length} replies</span>
          </div>
        </div>
      </div>
    );
  });
};
