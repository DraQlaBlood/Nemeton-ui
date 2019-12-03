import React from "react";

class Inbox extends React.Component {
  render() {
    return (
      <div className="bg-white">
        <div className="p-2 d-flex border">
          <div className="flex-grow-1">
            <span>Inbox</span>
          </div>
          <div>
            <span>
              <i className="fas fa-edit"></i>
            </span>
          </div>
        </div>
        <div className="p-2 d-flex border border-top-0">
          <div className="flex-grow-1">
            <i class="fas fa-search"></i>
            <span className="pl-2">Search messages</span>
          </div>
          <div>
            <span>
              <i className="fas fa-sliders-h"></i>
            </span>
          </div>
        </div>
        <div className="d-flex flex-column border border-top-0 convoList">
          <div className="conversations p-2 ">
            <span>List convos</span>
          </div>
          <div className="conversations p-2 ">
            <span>List convos</span>
          </div>
          <div className="conversations p-2 ">
            <span>List convos</span>
          </div>
        </div>
      </div>
    );
  }
}
export default Inbox;
