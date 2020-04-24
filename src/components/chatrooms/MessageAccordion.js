import React from "react";
import { inject, observer } from "mobx-react";
import "./chat.css";
import { Button } from "react-bootstrap";
import NewDirectConversation from "../DirectMessaging/newDirectConversation";

@inject("user", "account", "messaging", "directMessaging")
@observer
class MessageAccordion extends React.Component {
  showChat = () => {
    this.props.messaging.setChatOption(!this.props.messaging.isChatOpen);
  };
  newConversation = () => {
    
    this.props.directMessaging.setNewConversation(
      !this.props.directMessaging.newConversation
    );
  };

  render() {
    const { user } = this.props;
    const { account } = this.props.account;
    return (
      <div className="d-flex flex-column fixed-bottom d-none d-sm-none d-md-block ml-auto mr-5">
        <div className="d-flex justify-content-end ">
          {this.props.messaging.isChatOpen && (
            <div className="col-md-4 mb-4 ">
              <div className="instantChat">
                <div className=" bg-blue topChat rounded-top border border-bottom-0 text-white d-flex justify-content-center">
                  <div className="align-items-center d-flex flex-column p-3">
                    <h3 className="text-capitalize">Hi {user.account_id} !</h3>
                    <p>Welcome to our Nemeton direct chat</p>
                    <Button className="btn-red" onClick={this.newConversation}>
                      New Conversation
                    </Button>
                  </div>
                </div>
                <div className=" bg-light bottomChat rounded-bottom border border-top-0"></div>
                {this.props.directMessaging.newConversation && (
                  <div className="instantMessaging effect rounded">
                    <NewDirectConversation />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div>
          {user.account_id !== null && (
            <div
              className="rounded-circle chatdiv float-right mb-3 mr-5 d-flex justify-content-center "
              onClick={this.showChat}
            >
              {this.props.messaging.isChatOpen && (
                <i className="fas fa-envelope-open fa-2x align-self-center text-white"></i>
              )}
              {!this.props.messaging.isChatOpen && (
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
