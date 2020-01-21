import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { inject, observer } from "mobx-react";

@inject("views")
@observer
class Posting extends React.Component {
  changeViewMap = e => {
    e.preventDefault();
    this.props.views.setIsMap();
  };

  changeViewList = e => {
    e.preventDefault();
    this.props.views.setIsList();
  };

  render() {
    return (
      <div className="d-flex flex-column bg-white shadow mb-3">
        <div className="d-flex  ">
          <div className="px-4 py-2 flex-grow-1 d-flex">
            <i className="fas fa-edit"></i>
            <Link to="/requests/add-new-request">
              <span className="pl-2">Start a post</span>
            </Link>
          </div>
          <div className="px-4 py-2 border">
            <span>
              <i className="fas fa-camera"></i>
            </span>
          </div>
          <div className="px-4 py-2 border">
            <span>
              <i className="fas fa-video"></i>
            </span>
          </div>
          <div className="px-4 py-2 border">
            <span>
              <i className="fas fa-file-alt"></i>
            </span>
          </div>
        </div>
        <div className=" bg-light p-2 d-flex">
          <div className="flex-grow-1">
            <span>Write an aricle</span>
          </div>
          <div>
            <Button
              className="fas fa-bars"
              variant="link"
              onClick={this.changeViewList}
            ></Button>
            <Button
              className="fas fa-map-marked pl-2"
              variant="link"
              onClick={this.changeViewMap}
            ></Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Posting;
