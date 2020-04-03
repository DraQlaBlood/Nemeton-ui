import React from "react";
import { Card, Button } from "react-bootstrap";

var moment = require("moment");

const Events = ({ data, loadable }) => {
  const events = data.filter(event => {
    return moment(new Date(event.startTime))
      .utc()
      .isSameOrAfter(new Date());
  });
  return (
    <div className="bg-white p-2 row">
      {events.length > 0 && (
        <div className="col-sm-12 col-md-3">
          <h5>Upcoming Events Near you</h5>
        </div>
      )}
      <div className="col-sm-12 col-md-9 row">
      {events.slice(0, loadable).map((event, index) => {
        return (
          <div className="col-sm-12 col-md-6 p-2">
            <div
              className="eventdiv border bg-light rounded d-flex flex-column"
              key={index}
            >
              <div
                className="p-2 text-capitalize font-weight-bold eventDate text-truncate"
                style={{ maxWidth: "300px" }}
              >
                {moment(new Date(event.startTime)).format("MMMM Do YYYY")}
              </div>
              <h4
                className="px-2 text-capitalize font-weight-bold text-truncate"
                style={{ maxWidth: "300px" }}
              >
                {event.title}
              </h4>
              <span className="px-2 mb-3">
                <i className="fas fa-map-marker-alt"></i> {event.address}
              </span>
              <div className="d-flex justify-content-end">
                <div className="d-flex justify-content-end p-2">
                  {event.spots !== null && (
                    <span className="px-2 text-danger">
                      {event.spots} Spots left
                    </span>
                  )}
                  <span className="px-2">
                    <i className="fas fa-reply"></i>
                  </span>
                  <span className="px-2">Attend</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className=" col-12 d-flex justify-content-end p-2">
        {loadable < events.length && (
          <Button onClick={this.loadMore}>Load more</Button>
        )}
      </div></div>
    </div>
  );
};
export default Events;
