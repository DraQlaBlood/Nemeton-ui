import React from "react";
import { inject, observer } from "mobx-react";
import "./chat.css";

@inject("user", "account", "messaging")
@observer
class MessageAccordion extends React.Component {
  showChat = () => {
    this.props.messaging.setChatOption(!this.props.messaging.isChatOpen);
  };

  render() {
    const { user } = this.props;
    return (
      <div className="d-flex flex-column fixed-bottom d-none d-sm-none d-md-block mr-5">
        <div className="d-flex justify-content-end ">
          {this.props.messaging.isChatOpen && (
            <div className="col-md-3 mb-4 instantChat">
              <div className=" bg-blue topChat rounded-top border border-bottom-0 text-white d-flex justify-content-center">
                <div className="align-items-center d-flex flex-column p-3">

                  <h3>Hi Name !</h3>
                  <p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry</p>

                </div>
                
              </div>
              <div className=" bg-light bottomChat rounded-bottom border border-top-0"></div>
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
