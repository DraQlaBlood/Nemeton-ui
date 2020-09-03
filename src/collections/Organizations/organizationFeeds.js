import React from "react";

import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";

@inject("user", "organization", "messaging")
@observer
class OrganizationFeeds extends React.Component {
  componentDidMount = async () => {
    await this.props.messaging.fetchConversations();
  };
  handleClick = (id) => {
    this.props.messaging.activeConversation = id;
  };

  render() {
    return (
      <div>
        {mapConversations(
          this.props.messaging.conversations,
          this.props.organization_slug,
          this.handleClick
        ).length > 0 ? (
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex flex-column">
                <div className="mt-2">
                  <div className="p-2 border">Top recent discussions</div>
                  {mapConversations(
                    this.props.messaging.conversations,
                    this.props.organization_slug,
                    this.handleClick
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
export default OrganizationFeeds;

const mapConversations = (conversations, organization_slug, handleClick) => {
  return conversations

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
    .slice(0, 4)
    .map((conversation) => {
      return (
        <div
          className=" conversationDiv border-bottom d-flex flex-column p-2"
          key={conversation.id}
        >
          <div
            onClick={() => handleClick(conversation.id)}
            className="p-2 text-capitalize font-weight-bold showChat d-flex flex-column"
          >
            <span>{conversation.title}</span>
            <span className="line-clamp2 text-muted">
              {conversation.description}
            </span>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <Link
                className="text-muted mx-2"
                to={`/discussion/${conversation.title}/${conversation.id}`}
              >
                <span className="px-2">Read more</span>
              </Link>
            </div>
            <div className="d-flex justify-content-end">
              <span className="px-2">
                <i className="fas fa-comment"></i>
              </span>
              <span>
                {conversation.messages.length} comments
              </span>
            </div>
          </div>
        </div>
      );
    });
};
