import React from "react";

import { inject, observer } from "mobx-react";
import "./network.css";
import Cable from "../chatrooms/Cables";
import { ActionCableConsumer } from "react-actioncable-provider";
import { Link } from "react-router-dom";
import Spinner from "../../lib/components/spinner/load";

var moment = require("moment");

@inject("user", "organization", "account", "messaging", "event")
@observer
class Network extends React.Component {
  componentDidMount = async () => {
    await this.props.user.signIn();
    await this.props.organization.fetchAll();
    await this.props.event.fetchAllEvents();
    await this.props.account.find();
    await this.props.messaging.fetchConversations();
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
  handleClick = (id) => {
    this.props.messaging.activeConversation = id;
  };

  handleReceivedMessage = (response) => {
    const { message } = response;
    console.log("Got a new message");
    const conversations = [...this.props.messaging.conversations];

    const conversation = conversations.find(
      (conversation) => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    this.props.messaging.setConversations(conversations);
  };

  render() {
    const { all, isLoading } = this.props.organization;
    const { account } = this.props.account;
    const { conversations } = this.props.messaging;
    const { events } = this.props.event;

    let actualAccount = account.id;

    return (
      <div className=" flex-grow-1 bg-light pt-3 mb-5">
        {isLoading ? (
          <div className="my-5 d-flex justify-content-center py-5 col-md-12">
            <div className="d-flex flex-column align-items-center">
              <Spinner/>
            </div>
          </div>
        ) : (
          <div className="mx-md-5 row">
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

            <div className="col-md-8 col-sm-12">
              {all.slice().map((organization) => {
                if (
                  organization.followers.slice().filter(function (follower) {
                    return follower.id === actualAccount;
                  }).length > 0 ||
                  organization.account.id === actualAccount
                ) {
                  return (
                    <div className=" d-flex " key={organization.id}>
                      <div className=" flex-fill d-flex flex-column ">
                        {organization.conversations
                          .slice()
                          .map((conversation) => {
                            if (
                              undefined !==
                              findActiveConversation(
                                conversations,
                                conversation.id
                              )
                            ) {
                              return (
                                <div
                                  key={conversation.id}
                                  className="p-2 d-flex flex-column mb-md-2 my-sm-2 shadow-sm"
                                >
                                  <div className="p-2  d-flex flex-column">
                                    <div className="d-flex">
                                      <span>
                                        <strong className="text-capitalize blue-font mr-2">
                                          {
                                            findActiveConversation(
                                              conversations,
                                              conversation.id
                                            ).account.name
                                          }
                                        </strong>
                                        posted a question in
                                        <Link
                                          className="font-weight-bold text-dark text-capitalize"
                                          to={`/show/${
                                            findActiveConversation(
                                              conversations,
                                              conversation.id
                                            ).organization.slug
                                          }/${
                                            findActiveConversation(
                                              conversations,
                                              conversation.id
                                            ).organization.id
                                          }`}
                                        >
                                          <strong className="text-capitalize blue-font ml-2">
                                            {
                                              findActiveConversation(
                                                conversations,
                                                conversation.id
                                              ).organization.name
                                            }
                                          </strong>
                                        </Link>
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex-fill d-flex flex-column bg-white rounded shadow-sm p-2">
                                    <Link
                                      className="blue-font"
                                      to={`/discussion/${
                                        findActiveConversation(
                                          conversations,
                                          conversation.id
                                        ).title
                                      }/${
                                        findActiveConversation(
                                          conversations,
                                          conversation.id
                                        ).id
                                      }`}
                                    >
                                      <h4 className="text-capitalize">
                                        {
                                          findActiveConversation(
                                            conversations,
                                            conversation.id
                                          ).title
                                        }
                                      </h4>
                                    </Link>

                                    <p className="line-clamp">
                                      {
                                        findActiveConversation(
                                          conversations,
                                          conversation.id
                                        ).description
                                      }
                                    </p>
                                  </div>

                                  <div className="p-2 flex-fill d-flex justify-content-end colour-blue text-white">
                                    <div className="d-flex mr-3">
                                      <div>
                                        <i className="fas fa-share-square px-2"></i>
                                        <small className="pr-2">Share</small>
                                      </div>
                                      <div className=" mr-3">
                                        <i className="fas fa-heart px-2"></i>
                                        <small className="pr-2">5</small>
                                      </div>
                                      <div>
                                        <i className="fas fa-comments pr-2"></i>
                                        <small className="pr-2">
                                          {
                                            findActiveConversation(
                                              conversations,
                                              conversation.id
                                            ).messages.length
                                          }
                                        </small>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          })}
                      </div>
                    </div>
                  );
                }
              })}
            </div>

            <div className="col-md-4 col-sm-12  ">
              <div className="d-flex flex-column">
                <div>
                  <div className="d-flex justify-content-between font-weight-bold">
                    <span>Upcoming events</span>
                    <span>more...</span>
                  </div>
                  {all.slice().map((organization) => {
                    if (
                      organization.followers
                        .slice()
                        .filter(function (follower) {
                          return follower.id === actualAccount;
                        }).length > 0 ||
                      organization.account.id === actualAccount
                    ) {
                      return (
                        <div className=" d-flex " key={organization.id}>
                          <div className=" flex-fill d-flex flex-column ">
                            {organization.events
                              .slice()
                              .filter((event) => {
                                return moment(new Date(event.startTime))
                                  .utc()
                                  .isSameOrAfter(new Date());
                              })
                              .map((event) => {
                                if (undefined !== findEvent(events, event.id)) {
                                  return (
                                    <div
                                      key={event.id}
                                      className="p-2 d-flex flex-column mb-2 shadow-sm"
                                    >
                                      <div className="flex-fill d-flex justify-content-between bg-white rounded p-2">
                                        <Link
                                          className="blue-font"
                                          to={`/discussion/${
                                            findEvent(events, event.id).title
                                          }/${findEvent(events, event.id).id}`}
                                        >
                                          <h4 className="text-capitalize">
                                            {findEvent(events, event.id).title}
                                          </h4>
                                        </Link>
                                        <small className="text-muted">
                                          {moment(
                                            new Date(
                                              findEvent(
                                                events,
                                                event.id
                                              ).startTime
                                            )
                                          ).format("MMM Do YY")}
                                        </small>
                                      </div>

                                      <div className="p-2 flex-fill d-flex justify-content-between colour-red text-white">
                                        <div className="d-flex">
                                          <div>
                                            <small>
                                              {
                                                findEvent(events, event.id)
                                                  .spots
                                              }
                                            </small>{" "}
                                            Spots
                                          </div>
                                        </div>
                                        <span>Attend</span>
                                      </div>
                                    </div>
                                  );
                                }
                              })}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
                <div>
                  <div className="d-flex justify-content-between mt-3 font-weight-bold">
                    <span>NearBy events</span>
                    <span>more...</span>
                  </div>
                  <div className="p-2 d-flex bg-white flex-column mb-2 shadow-sm my-3">
                    <div className="d-flex justify-content-center">
                      <h5>There is no events near you</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Network;

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    (conversation) => conversation.id === activeConversation
  );
};

const findEvent = (events, event) => {
  return events.find((e) => e.id === event);
};
