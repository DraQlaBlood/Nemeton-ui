import React from "react";
import NewMessageForm from "./NewMessageForm";
var moment = require('moment');


const MessagesArea = ({
  conversation: { id, title, account ,created_at, messages }
}) => {
  return (
    <div className="messagesArea p-2">
      <h3 className="text-capitalize font-weight-bold">{title}</h3>
  <span className="text-muted">created {moment(new Date(created_at)).fromNow()} by {account.name}</span>
      
      <div className="border"></div>
      <div>{orderedMessages(messages)}</div>
      <NewMessageForm conversation_id={id} />
    </div>
  );
};

export default MessagesArea;

// helpers

const orderedMessages = messages => {
  const sortedMessages = messages
    .slice()
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  return sortedMessages.map(message => {
    return (
      <did key={message.id} className="d-flex p-2">
        <span className="p-2">{message.account.name}</span>
        <span className="bg-light rounded p-2 mx-2">{message.text}</span>
      </did>
    );
  });
};
