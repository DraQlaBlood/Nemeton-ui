import React from "react";
import NewDirectMessageForm from "./newDirectMessageForm";
import "./direct.css"

var moment = require("moment");

const NewDirectMessageArea = ({
  directconversation: { id, sender_id, recipient_id, directmessages },
  account_id,
  handleCloseChatActive,
  accountInfos,
  all
}) => {
  return (
    <div className="instantChat  rounded d-flex">
      <div className="flex-grow-1 d-flex flex-column rounded bg-light ">
        <div className="d-flex justify-content-between p-2 bg-blue text-white">
          {account_id === sender_id ? (
            <span className="text-capitalize">{accountInfos(all,recipient_id).name}</span>
          ) : (
            <span className="text-capitalize">{accountInfos(all,sender_id).name}</span>
          )}
          <i
            className="fas fa-times fa-x"
            onClick={() => handleCloseChatActive(false)}
          ></i>
        </div>

        <div
          id="directMessagediv"
          className=" flex-grow-1 overflow-auto d-flex flex-column bg-white"
        >
          {orderedMessages(directmessages, account_id)}
        </div>
        <NewDirectMessageForm directconversation_id={id} />
      </div>
    </div>
  );
};
export default NewDirectMessageArea;

const orderedMessages = (messages, account_id) => {
  const sortedMessages = messages.slice().sort(function (a, b) {
    if (new Date(a.created_at) < new Date(b.created_at)) {
      return -1;
    } else if (new Date(a.created_at) > new Date(b.created_at)) {
      return 1;
    } else {
      return 0;
    }
  });

  return sortedMessages.slice().map((message) => {
    return (
      <div key={message.id} className="p-2">
        {message.account.id === account_id ? (
          <div className="d-flex flex-column ">
            <div className="d-flex justify-content-end text-white ">
              <span className="bg-blue rounded p-2">{message.text}</span>
            </div>
            <div className="d-flex justify-content-end">
              <small className="text-muted">
                {moment(new Date(message.created_at)).fromNow()}
              </small>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column ">
            <div className="d-flex justify-content-start text-white ">
              <span className="bg-primary rounded p-2">{message.text}</span>
            </div>
            <div className="d-flex justify-content-start ">
              <small className="text-muted">
                {moment(new Date(message.created_at)).fromNow()}
              </small>
            </div>
          </div>
        )}
      </div>
    );
  });
};
