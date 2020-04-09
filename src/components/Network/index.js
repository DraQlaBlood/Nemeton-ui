import React from "react";

import { inject, observer } from "mobx-react";
import "./network.css";
import Cable from "../chatrooms/Cables";
import { ActionCableConsumer } from "react-actioncable-provider";
import { Link } from "react-router-dom";
import Ads from "../../payments/promotion";
import List from "./eventList";

var moment = require("moment");

@inject("user", "organization", "account", "messaging", "event")
@observer
class Network extends React.Component {
  componentDidMount = async () => {
    await this.props.user.signIn();
    await this.props.organization.fetchAll();
    await this.props.event.fetchAllEvents();
    //await this.props.account.fetchAll();
    await this.props.account.find();
    await this.props.messaging.fetchConversations();
  };

  handleReceivedConversation = response => {
    const { conversation } = response;
    console.log("Got a new conversation");
    this.props.messaging.setConversations([
      ...this.props.messaging.conversations,
      conversation
    ]);
    console.log(this.props.messaging.conversations.length);
  };
  handleClick = id => {
    this.props.messaging.activeConversation = id;
  };

  handleReceivedMessage = response => {
    const { message } = response;
    console.log("Got a new message");
    const conversations = [...this.props.messaging.conversations];

    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    //const messages = [...conversation.messages];
    conversation.messages = [...conversation.messages, message];
    this.props.messaging.setConversations(conversations);
  };

  render() {
    const { all } = this.props.organization;
    const { account_id } = this.props.account;
    const {
      conversations,
      isLoading
    } = this.props.messaging;
    const { events } = this.props.event;

    let eventContent = [];
    let content = [];

    for (var i = 0; i < all.length; i++) {
      if (all[i].followers.length > 0) {
        for (var j = 0; j < all[i].followers.length; j++) {
          //console.log(all[i].followers.length);
          if (all[i].followers[j].id === account_id) {
            //console.log(true);
            all[i].conversations
              .slice()
              .map(conversation => (content = [...content, conversation]));
          }
          for (var k = 0; k < events.length; k++) {
            if (
              all[i].followers[j].id === account_id &&
              all[i].id === events[k].organization_id
            ) {
              eventContent = [...eventContent, events[k]];
            }
          }
        }
      } else if (all[i].account.id === account_id) {
        all[i].conversations.slice().map(conversation => {
          return (content = [...content, conversation]);
        });

        for (var v = 0; v < events.length; v++) {
          if (all[i].id === events[v].organization_id) {
            eventContent = [...eventContent, events[v]];
          }
        }
      } else {
        console.log("Not member nor owner");
      }

      console.log("content", content);
    }

    return (
      <div className=" flex-grow-1  bg-light pt-3">
        <div className="mx-5 d-flex justify-content-center">
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
          <div className="mx-5 row">
            <div className="col-md-8 px-2">
              {isLoading ? (
                <div>Loading</div>
              ) : (
                content
                  .slice()
                  .sort(function(a, b) {
                    if (new Date(a.created_at) > new Date(b.created_at)) {
                      return -1;
                    } else if (
                      new Date(a.created_at) < new Date(b.created_at)
                    ) {
                      return 1;
                    } else {
                      return 0;
                    }
                  })
                  .map(conversation => {
                    return (
                      <div className=" my-2 " key={conversation.id}>
                        <div className=" shadow  rounded-top rounded-bottom-0 p-2">
                          <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                            alt="alt images"
                            className="rounded-circle mr-2 image-account"
                          />
                          {conversation.account_id} posted in
                          <Link
                            to={`/show/${
                              this.props.organization.getOrganizationName(
                                conversation.organization_id
                              ).slug
                            }`}
                            className="px-2"
                          >
                            {
                              this.props.organization.getOrganizationName(
                                conversation.organization_id
                              ).name
                            }
                          </Link>
                          <small className="text-muted">
                            {moment(
                              new Date(conversation.created_at)
                            ).fromNow()}
                          </small>
                        </div>
                        <div className="bg-white shadow p-2 d-flex">
                          <div className="mr-2">
                            <img
                              src="https://images.unsplash.com/photo-1504898770365-14faca6a7320?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                              alt="alt images"
                              className="image-cover"
                            />
                          </div>
                          <div className="flex-fill d-flex flex-column mx-2">
                            <div className="title pb-3">Title</div>
                            <p className="description  pb-3">
                              {conversation.title}
                            </p>
                            <div className=" comments d-flex justify-content-between my-3">
                              <div className="d-flex">
                                <div className="  border rounded">
                                  <i className="fas fa-heart px-2"></i>
                                  <span className="pr-2">5</span>
                                </div>
                                <div className="mx-2  border rounded">
                                  <i className="fas fa-share-square px-2"></i>
                                  <span className="pr-2">5</span>
                                </div>
                                <div className="  border rounded">
                                  <i className="fas fa-bookmark px-2"></i>
                                  <span className="pr-2">Bookmark post</span>
                                </div>
                              </div>
                              <div className="d-flex">
                                <span className="text-muted ">
                                  <i className="fas fa-eye pr-2"></i>
                                  <span className="pr-2">5</span>
                                </span>
                                <Link
                                  className="text-muted mx-2"
                                  onClick={() =>
                                    this.handleClick(conversation.id)
                                  }
                                  to={`/discussion/${conversation.title}/${conversation.id}`}
                                >
                                  <i className="fas fa-comment-alt pr-2"></i>
                                  <span className="pr-2">5</span>
                                </Link>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
            <div className="col-md-4">
              <div className="d-flex flex-column">
                <Ads />
                <List data={eventContent}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Network;

