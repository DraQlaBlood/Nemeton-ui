import React from "react";
import NewMessageForm from "./NewMessageForm";
var moment = require("moment");

const MessagesArea = ({
  conversation: { id, title, description, account, created_at, messages },
}) => {
  return (
    <div className="messagesArea px-3 py-5">
      <div className="d-flex flex-column px-2 bg-light my-2">
        <div className="d-flex flex-column">
          <h3 className="my-2">{title}</h3>
          <div className="d-flex justify-content-between">
            <span className="text-muted mr-2">published by {account.name}</span>
            <span className=" text-muted">
              {moment(new Date(created_at)).fromNow()}
            </span>
          </div>
        </div>
        <div className="border-bottom flex-fill mb-2"></div>
        <div className="d-flex ">
          <p>{description}</p>
        </div>
      </div>

      <div className="border my-2"></div>
      <NewMessageForm conversation_id={id} />
      <div>{orderedMessages(messages)}</div>
    </div>
  );
};

export default MessagesArea;

// helpers

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
      <div key={message.id} className="d-flex p-2">
        <div className="p-2">
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
