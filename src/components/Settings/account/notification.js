import React from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

const Notification = () => {
  return (
    <div className="flex-fill ">
      <div className="p-4 mb-3 border bg-white">
        <div className="flex-fill d-flex flex-column ">
          <div className="d-flex ">
            <h5 className="text-uppercase font-weight-bold ">
              Organization Notifications
            </h5>
          </div>
          <div className="flex-fill border-bottom my-3"></div>
          <div className="d-flex justify-content-between mb-3">
            <div>
              <span className="font-weight-bold">New member requests</span>
            </div>
            <BootstrapSwitchButton
              checked={true}
              size="xs"
              onstyle="outline-success"
              offstyle="outline-danger"
            />
          </div>
          <div className="d-flex justify-content-between mb-3">
            <div>
              <span className="font-weight-bold">
                Send me notifications when my organizations have new members
              </span>
            </div>
            <BootstrapSwitchButton
              checked={false}
              size="xs"
              onstyle="outline-success"
              offstyle="outline-danger"
            />
          </div>
          <div className="d-flex justify-content-between mb-3">
            <div>
              <span className="font-weight-bold">
                Send me notifications when a member leave my organization
              </span>
            </div>
            <BootstrapSwitchButton
              checked={false}
              size="xs"
              onstyle="outline-success"
              offstyle="outline-danger"
            />
          </div>
          <div className="d-flex justify-content-between mb-3">
            <div>
              <span className="font-weight-bold">
                Send me notifications when my organization has new articles
              </span>
            </div>
            <BootstrapSwitchButton
              checked={false}
              size="xs"
              onstyle="outline-success"
              offstyle="outline-danger"
            />
          </div>
        </div>
      </div>

      <div className="p-4 mb-3 border bg-white d-flex flex-column ">
        <div className="flex-fill d-flex flex-column ">
          <div className="d-flex ">
            <h5 className="text-uppercase font-weight-bold ">
              Events Notifications
            </h5>
          </div>
        </div>
        <div className="flex-fill border-bottom my-3"></div>
        <div className="d-flex justify-content-between mb-3">
          <div>
            <span className="font-weight-bold">Events around me</span>
          </div>
          <BootstrapSwitchButton
            checked={true}
            size="xs"
            onstyle="outline-success"
            offstyle="outline-danger"
          />
        </div>
      </div>

      <div className="p-4 mb-3 border bg-white d-flex flex-column ">
        <div className="flex-fill d-flex flex-column ">
          <div className="d-flex  ">
            <h5 className="text-uppercase font-weight-bold ">
              Articles Notifications
            </h5>
          </div>
        </div>
        <div className="flex-fill border-bottom my-3"></div>
        <div className="d-flex justify-content-between mb-3">
          <div>
            <span className="font-weight-bold">Articles around me</span>
          </div>
          <BootstrapSwitchButton
            checked={true}
            size="xs"
            onstyle="outline-success"
            offstyle="outline-danger"
          />
        </div>
        <div className="d-flex justify-content-between mb-3">
          <div>
            <span className="font-weight-bold">
              New comments on my articles
            </span>
          </div>
          <BootstrapSwitchButton
            checked={true}
            size="xs"
            onstyle="outline-success"
            offstyle="outline-danger"
          />
        </div>
      </div>
    </div>
  );
};
export default Notification;
