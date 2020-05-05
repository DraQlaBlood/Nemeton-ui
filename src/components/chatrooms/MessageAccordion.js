import React from "react";
import { inject, observer } from "mobx-react";
import "./chat.css";
import { Button } from "react-bootstrap";
import NewDirectConversation from "../DirectMessaging/newDirectConversation";
import { ActionCableConsumer } from "react-actioncable-provider";
import NewDirectConversationArea from "../DirectMessaging/newDirectMessageArea";
import CableDirect from "../DirectMessaging/CablesDirect";
import NoContent from "../LockContents/noContent";

@inject("user", "account", "messaging", "directMessaging")
@observer
class MessageAccordion extends React.Component {
  componentDidMount = async () => {
    await this.props.directMessaging.fetchDirectConversations();
  };

  showInbox = () => {
    this.props.directMessaging.setIsDirectChatBubbleOpen(
      !this.props.directMessaging.isDirectChatBubbleOpen
    );
  };
  directChatSearchBubble = () => {
    this.props.directMessaging.setIsDirectChatBubbleSearchOpen(
      !this.props.directMessaging.isDirectChatBubbleSearchOpen
    );
  };

  directChatActive = () => {
    //console.log(!this.props.directMessaging.directconversation)
    this.props.directMessaging.setIsDirectChatActive(
      !this.props.directMessaging.isDirectChatActive
    );
  };

  handleReceivedDirectConversation = (response) => {
    const { directconversation } = response;
    this.props.directMessaging.setConversations([
      ...this.props.directMessaging.directconversations,
      directconversation,
    ]);

    this.props.directMessaging.setNewDMConversation(directconversation);
    
    this.directChatSearchBubble();
    this.directChatActive();
  };

  handleReceivedDirectMessage = (response) => {
    const { directmessage } = response;
    console.log(directmessage);
    const directconversations = [
      ...this.props.directMessaging.directconversations,
    ];

    const directconversation = directconversations.find(
      (directconversation) =>
        directconversation.id === directmessage.directconversation_id
    );
    directconversation.directmessages = [
      ...directconversation.directmessages,
      directmessage,
    ];
    this.props.directMessaging.setConversations(directconversations);
  };

  handleConversationClick = (directconversation) => {
    this.props.directMessaging.setNewDMConversation(directconversation);
    this.props.directMessaging.setIsDirectChatActive(
      !this.props.directMessaging.isDirectChatActive
    );
  };
  handleCloseChatActive = (isChatOpen) => {
    this.props.directMessaging.setIsDirectChatActive(isChatOpen);
  };

  render() {
    const { user } = this.props;
    const { account, all } = this.props.account;
    const { directconversations } = this.props.directMessaging;

    console.log(directconversations.length);

    return (
      <div className="d-flex col-md-4 flex-column fixed-bottom d-none d-sm-none d-md-block ml-auto mr-5">
        <ActionCableConsumer
          channel={{ channel: "DirectconversationsChannel" }}
          onReceived={this.handleReceivedDirectConversation}
        />
        {directconversations.length ? (
          <CableDirect
            directconversations={this.props.directMessaging.directconversations}
            handleReceivedMessage={this.handleReceivedDirectMessage}
          />
        ) : null}

        <div className="flex-fill d-flex justify-content-end ">
          {this.props.directMessaging.isDirectChatBubbleOpen ? (
            <div className="w-100 mb-2 ">
              <div className="instantChat">
                <div className=" bg-blue topChat rounded-top border border-bottom-0 text-white d-flex justify-content-center">
                  <div className="align-items-center d-flex flex-column p-3">
                    <h3 className="text-capitalize">Hi {user.account_id} !</h3>
                    <p>Welcome to our Nemeton direct chat</p>
                    <Button
                      className="btn-red"
                      onClick={this.directChatSearchBubble}
                    >
                      New Conversation
                    </Button>
                  </div>
                </div>
                <div className=" bg-light bottomChat d-flex flex-column rounded-bottom border border-top-0">
                  {mapDirectConversations(
                    this.props.directMessaging.directconversations,
                    account.id,
                    this.handleConversationClick,
                    all
                  ).length > 0 ? (
                    <div>
                      {mapDirectConversations(
                        this.props.directMessaging.directconversations,
                        account.id,
                        this.handleConversationClick,
                        all
                      )}
                    </div>
                  ) : (
                    <NoContent />
                  )}
                </div>
                {this.props.directMessaging.isDirectChatBubbleSearchOpen ? (
                  <div className="instantMessaging effect rounded">
                    <NewDirectConversation />
                  </div>
                ) : null}
                {this.props.directMessaging.isDirectChatActive ? (
                  <div className="instantMessaging effect rounded">
                    <NewDirectConversationArea
                      directconversation={findActiveConversation(
                        directconversations,
                        this.props.directMessaging.newDMconversation.id
                      )}
                      account_id={account.id}
                      handleCloseChatActive={this.handleCloseChatActive}
                      accountInfos={getAccountInfos}
                      all={all}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
        <div>
          {user.account_id !== null && (
            <div
              className="rounded-circle chatdiv float-right mb-3 mr-5 d-flex justify-content-center "
              onClick={this.showInbox}
            >
              {this.props.directMessaging.isDirectChatBubbleOpen && (
                <i className="fas fa-envelope-open fa-2x align-self-center text-white"></i>
              )}
              {!this.props.directMessaging.isDirectChatBubbleOpen && (
                <i className="fas fa-envelope fa-2x align-self-center text-white"></i>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default MessageAccordion;

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
  handleConversationClick,
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
            className="p-2 border-bottom d-flex flex-column "
          >
            <span className="text-capitalize" onClick={() => handleConversationClick(directConversation)}>
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
            <span onClick={() => handleConversationClick(directConversation)}>
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
      }else {
        return null;
      }
    });
};
