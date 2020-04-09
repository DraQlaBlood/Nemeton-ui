import React from "react";

const Notification = () => {
  return (
    <div className="flex-fill ">
        <div className="p-4 mb-3 border bg-white d-flex flex-column ">
        <div className="flex-fill">
          <h6 className="text-uppercase font-weight-bold">Membership Notifications</h6>
        </div>
      </div>
      <div className="p-4 mb-3 border bg-white d-flex flex-column ">
        <div className="flex-fill">
          <h6 className="text-uppercase font-weight-bold">Organization Notifications</h6>
        </div>
      </div>

      <div className="p-4 mb-3 border bg-white d-flex flex-column ">
        <div className="flex-fill">
          <h6 className="text-uppercase font-weight-bold">Events Notifications</h6>
        </div>
      </div>

      <div className="p-4 mb-3 border bg-white d-flex flex-column ">
        <div className="flex-fill">
          <h6 className="text-uppercase font-weight-bold">Articles Notifications</h6>
        </div>
      </div>
      
    </div>
  );
};
export default Notification;
