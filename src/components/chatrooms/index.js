import React from "react";
import { ActionCableConsumer } from "react-actioncable-provider";
import Cable from "./Cables";
import NewConversationForm from "./NewConversationForm";
import { Link } from "react-router-dom";
import MessagesArea from "./MessagesArea";

import { Button, Modal } from "react-bootstrap";

import { inject, observer } from "mobx-react";
import NoContent from "../LockContents/noContent";

@inject("user", "organization", "messaging")
@observer
class Messaging extends React.Component {
  componentDidMount = async () => {
    //await this.props.user.signIn();
    await this.props.messaging.fetchConversations();
  };

  handleClick = (id) => {
    this.props.messaging.activeConversation = id;
  };

  handleReceivedConversation = (response) => {
    const { conversation } = response;
    console.log("Got a new conversation");
    this.props.messaging.setConversations([
      ...this.props.messaging.conversations,
      conversation,
    ]);
    console.log(this.props.messaging.conversations.length);
  };

  handleReceivedMessage = (response) => {
    const { message } = response;
    console.log("Got a new message");
    const conversations = [...this.props.messaging.conversations];

    const conversation = conversations.find(
      (conversation) => conversation.id === message.conversation_id
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
      <div className="flex-grow-1  p-2">
        <ActionCableConsumer
          channel={{ channel: "ConversationsChannel" }}
          onReceived={this.handleReceivedConversation}
        />
        {conversations.length ? (
          <Cable
            conversations={this.props.messaging.conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <div className="discussion-banner text-white d-flex flex-column p-3 d-none d-xs-none d-sm-none d-md-none d-lg-block">
          <div className=" d-flex justify-content-between">
            <h4>Ask a question</h4>
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
        {mapConversations(
          this.props.messaging.conversations,
          this.props.organization_slug,
          this.handleClick
        ).length > 0 ? (
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex flex-column">
                <div className="mt-3">
                  {mapConversations(
                    this.props.messaging.conversations,
                    this.props.organization_slug,
                    this.handleClick
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NoContent />
        )}
      </div>
    );
  }
}
export default Messaging;

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    (conversation) => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, organization_slug, handleClick) => {
  return conversations
    .slice()
    .filter(function (conversation) {
      return conversation.organization.slug === organization_slug;
    })
    .sort(function (a, b) {
      if (new Date(a.created_at) > new Date(b.created_at)) {
        return -1;
      } else if (new Date(a.created_at) < new Date(b.created_at)) {
        return 1;
      } else {
        return 0;
      }
    })
    .map((conversation) => {
      return (
        <div
          className=" conversationDiv p-2 border d-flex flex-column mb-2"
          key={conversation.id}
        >
          <div
            onClick={() => handleClick(conversation.id)}
            className="p-2 text-capitalize font-weight-bold showChat d-flex flex-column"
          >
            <h4>{conversation.title}</h4>
            <p className="text-truncate" style={{ maxWidth: "1500px" }}>
              {conversation.description}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <Link
                className="text-muted mx-2"
                to={`/discussion/${conversation.title}/${conversation.id}`}
              >
                <span className="px-2">Reply</span>
              </Link>
            </div>
            <div className="d-flex justify-content-end p-2">
              <span className="px-2">
                <i className="fas fa-comment"></i>
              </span>
              <span className="px-2">
                {conversation.messages.length} comments
              </span>
            </div>
          </div>
        </div>
      );
    });
};
