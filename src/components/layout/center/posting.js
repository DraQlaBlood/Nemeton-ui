import React from "react";
import { Link } from "react-router-dom";

class Posting extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column bg-white shadow mb-3">
        <div className="d-flex  ">
          <div className="p-4 flex-grow-1">
            <i className="fas fa-edit"></i>
            <Link to="/requests/add-new-request">
              <span className="pl-2">Start a post</span>
            </Link>
          </div>
          <div className="p-4 border">
            <span>
              <i className="fas fa-camera"></i>
            </span>
          </div>
          <div className="p-4 border">
            <span>
              <i className="fas fa-video"></i>
            </span>
          </div>
          <div className="p-4 border">
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
            <i className="fas fa-bars"></i>
            <i className="fas fa-map-marked pl-2"></i>
          </div>
        </div>
      </div>
    );
  }
}
export default Posting;
