import React from "react";

class Profile extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column bg-white shadow pb-3 mb-3">
        <div className="text-center profileEnTete"></div>
        <div className="px-4 text-center pt-4">
          <div className="d-flex justify-content-around">
            <span>Firstname</span>
            <span>Lastname</span>
          </div>
          <p>{this.props.userEmail}</p>
        </div>
        <div className="px-4 text-center">
          <div className="d-flex justify-content-between">
            <span>Connections</span>
            <span>12</span>
          </div>
        </div>
        <div className="px-4 py-2 text-center">
          <div className="d-flex justify-content-between">
            <span>
              <i className="pr-2 fas fa-bookmark"></i>Saved items
            </span>
            <span>12</span>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
