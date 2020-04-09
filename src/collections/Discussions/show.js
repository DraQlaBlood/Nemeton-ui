import React from "react";
import "./discussion.css";
import { inject, observer } from "mobx-react";
import NewMessageForm from "../../components/chatrooms/NewMessageForm";
import Cable from "../../components/chatrooms/Cables";
import { ActionCableConsumer } from "react-actioncable-provider";
import Ads from "../../payments/promotion";
var moment = require("moment");

@inject("user", "messaging")
@observer
class Discussion extends React.Component {
  componentDidMount = async () => {
    const { id } = this.props.match.params;
    await this.props.user.signIn();
    await this.props.messaging.findOne(id);
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

  render() {
    const { conversation, activeConversationMessages } = this.props.messaging;

    return (
      <div className="flex-grow-1 px-3 mb-5 pb-4">
        <ActionCableConsumer
          channel={{ channel: "ConversationsChannel" }}
          onReceived={this.handleReceivedConversation}
        />
        <Cable
          conversations={this.props.messaging.conversations}
          handleReceivedMessage={this.handleReceivedMessage}
        />
        <div className="en-tete-discussion bg-light">
          <img
            src="https://images.unsplash.com/photo-1461595520627-42e3c83019bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80"
            alt="descriptionImage"
            className=" imageCover"
          />
        </div>
        <div className="row">
          <div className="col-md-8 pl-5">
            <div classNam="d-flex flex-column px-2 bg-light my-2">
              <div className="d-flex flex-column">
                <h3 className="my-2">Title</h3>
                <small className="text-muted">
                  {" "}
                  published:{" "}
                  {moment(new Date(conversation.created_at)).fromNow()}
                </small>
              </div>
              <div className="border-bottom flex-fill mb-2"></div>
              <div className="d-flex ">
                <p>{conversation.title}</p>
              </div>
            </div>

            <div className="px-2 bg-light my-2 border">
              <NewMessageForm conversation_id={conversation.id} />
            </div>

            <div className="comments d-flex justify-content-between mb-2">
              <div className="d-flex">
                <div className="  border rounded ">
                  <i className="fas fa-heart px-2"></i>
                  <span className="pr-2">Like</span>
                </div>
                <div className="mx-2  border rounded">
                  <i className="fas fa-share-square px-2"></i>
                  <span className="pr-2">Share</span>
                </div>
                <div className="mx-2  border rounded">
                  <i className="fas fa-bookmark px-2"></i>
                  <span className="pr-2">Bookmark this post</span>
                </div>
              </div>
              <div className="d-flex">
                <span className="text-muted ">
                  <i className="fas fa-eye pr-2"></i>
                  <span className="pr-2">5</span>
                </span>
                <span className="text-muted ">
                  <i className="fas fa-heart px-2"></i>
                  <span className="pr-2">5</span>
                </span>
                <span className="text-muted ">
                  <i className="fas fa-comment-alt pr-2"></i>
                  <span className="pr-2">5</span>
                </span>
              </div>
            </div>
            <div className="border mb-2"></div>
            <div>{orderedMessages(activeConversationMessages)}</div>
          </div>
          <div className="col-md-4 py-3">
            <Ads />
          </div>
        </div>
      </div>
    );
  }
}
export default Discussion;

const orderedMessages = (messages) => {
  const sortedMessages = messages.slice().sort(function (a, b) {
    if (new Date(a.created_at) > new Date(b.created_at)) {
      return -1;
    } else if (new Date(a.created_at) < new Date(b.created_at)) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortedMessages.map((message) => {
    return (
      <div key={message.id} className="d-flex px-2">
        <div className="pr-2">
          <img
            src="https://via.placeholder.com/30"
            alt="alt images"
            className="rounded-circle"
          />
        </div>
        <div className="flex-fill d-flex flex-column  ml-2">
          <div className="d-flex rounded bg-light p-2">
            <span className="showChat font-weight-bold px-2">
              {message.account.name}
            </span>
            <span>{message.text}</span>
          </div>
          <div className="d-flex justify-content-end">
            <small className="text-muted">
              {moment(new Date(message.created_at)).fromNow()}
            </small>
          </div>
        </div>
      </div>
    );
  });
};
