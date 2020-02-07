import React from "react";

class Profile extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div className="d-flex flex-column bg-white shadow pb-3 mb-3">
        <div className="text-center profileEnTete"></div>
        <div className="d-flex flex-column justify-content-around py-4 text-center">
          <div className="flex-fill">
            <span>
              {user.firstName} {user.lastName}
            </span>
          </div>
          <div className="flex-fill">
            <span>{user.email}</span>
          </div>
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
