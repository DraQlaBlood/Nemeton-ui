import React from "react";
import { observer, inject } from "mobx-react";
import { ActionCableConsumer } from "react-actioncable-provider";

var moment = require("moment");

@inject("event")
@observer
class AllEvents extends React.Component {
  componentDidMount = async () => {
    await this.props.event.fetchAllEvents();
  };

  handleReceivedEvent = response => {
    const { event } = response;
    this.props.event.setEvents([...this.props.event.events, event]);
    console.log(this.props.event.events.length);
  };

  render() {
    return (
      <div >
        <ActionCableConsumer
          channel={{ channel: "EventsChannel" }}
          onReceived={this.handleReceivedEvent}
        />

        <div className="row">
          <div className="col-md-8">
            <div className="d-flex flex-column">
              <div className="mt-3">{mapEvents(this.props.event.events, this.props.org_id)}</div>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="d-flex flex-column">
              <div className="mt-3">test</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapEvents = (events,organization_id) => {
  return events
    .slice()
    .sort(function(a, b) {
      if (new Date(a.created_at) > new Date(b.created_at)) {
        return -1;
      } else if (new Date(a.created_at) < new Date(b.created_at)) {
        return 1;
      } else {
        return 0;
      }
    })
    .filter(event => {
      return event.organization_id === organization_id;})
    .map(event => {
      return (
       <div
          className=" eventdiv p-2 border bg-light rounded d-flex flex-column mb-2"
          key={event.id}
        >
           <div
            className="p-2 text-capitalize font-weight-bold eventDate text-truncate"
            style={{ maxWidth: "300px" }}
          >
            {moment(new Date(event.startTime)).format(
              "MMMM Do YYYY"
            )}
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
          <span className="p-2 eventDesc">{event.description}</span>
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-start p-2">
              <span className="px-2">
                <img
                  src="https://via.placeholder.com/20"
                  alt="alt images"
                  className="rounded-circle mr-2"
                />
                10 attendees
              </span>
            </div>

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
      );
    });
};
export default AllEvents;
