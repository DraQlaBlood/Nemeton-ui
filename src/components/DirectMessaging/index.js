import React from "react";

import { inject, observer } from "mobx-react";
import NoContent from "../LockContents/noContent";
import NewDirectMessageForm from "./newDirectMessageForm";
var moment = require("moment");

@inject("user", "account", "messaging", "directMessaging")
@observer
class DirectMessage extends React.Component {
  componentDidMount = async () => {
    await this.props.user.signIn();
    await this.props.account.fetchAll();
    await this.props.account.find();
    await this.props.directMessaging.fetchDirectConversations();
  };

  conversationClick = (directconversation) => {
    this.props.directMessaging.setNewDMConversation(directconversation);
  };

  render() {
    const { user } = this.props;
    const { account, all } = this.props.account;
    const { directconversations } = this.props.directMessaging;

    return (
      <div className="flex-grow-1 d-flex mx-5">
        <div className="d-flex flex-fill p-3">
          <div className="p-2 col-md-4 border ">
            {mapDirectConversations(
              this.props.directMessaging.directconversations,
              account.id,
              this.conversationClick,
              all
            ).length > 0 ? (
              <div>
                {mapDirectConversations(
                  this.props.directMessaging.directconversations,
                  account.id,
                  this.conversationClick,
                  all
                )}
              </div>
            ) : (
              <NoContent />
            )}
          </div>
          <div className="p-2 col-md-8 border d-flex flex-column overflow-auto">
            <div className="flex-grow-1">
              {orderedMessages(
                this.props.directMessaging.newDMconversation.directmessages,
                account.id
              )}
            </div>

            {this.props.directMessaging.newDMconversation.id !== undefined ? (
              <div className="flex-shrink-0">
                <NewDirectMessageForm
                  directconversation_id={
                    this.props.directMessaging.newDMconversation.id
                  }
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
export default DirectMessage;

const findActiveConversation = (
  directconversations,
  activedirectConversation
) => {
  return directconversations.find(
    (directconversation) => directconversation.id === activedirectConversation
  );
};

const getAccountInfos = (accounts, id) => {
  return accounts.find((account) => account.id === id);
};

const mapDirectConversations = (
  directconversations,
  account_id,
  conversationClick,
  all
) => {
  return directconversations
    .slice()
    .filter(function (directConversation) {
      return (
        directConversation.sender_id === account_id ||
        directConversation.recipient_id === account_id
      );
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
    .map((directConversation) => {
      console.log(directConversation.sender_id);
      if (
        directConversation.sender_id === account_id &&
        directConversation.directmessages.length > 0
      ) {
        return (
          <div
            key={directConversation.id}
            className="p-2 border-bottom d-flex flex-column username"
          >
            <span
              className="text-capitalize"
              onClick={() => conversationClick(directConversation)}
            >
              {getAccountInfos(all, directConversation.recipient_id).name}
            </span>
            <p>
              {
                directConversation.directmessages[
                  (directConversation.directmessages.length - 1).text
                ]
              }
            </p>
          </div>
        );
      } else if (
        directConversation.sender_id !== account_id &&
        directConversation.directmessages.length > 0
      ) {
        return (
          <div
            key={directConversation.id}
            className="p-2 border-bottom d-flex flex-column "
          >
            <span onClick={() => conversationClick(directConversation)}>
              {getAccountInfos(all, directConversation.sender_id).name}
            </span>
            <p>
              {
                directConversation.directmessages[
                  (directConversation.directmessages.length - 1).text
                ]
              }
            </p>
          </div>
        );
      } else {
        return null;
      }
    });
};
const orderedMessages = (messages, account_id) => {
  if (undefined !== messages) {
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
        <div key={message.id} className="p-2 overflow-auto">
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
  } else {
    return <div>empty</div>;
  }
};
