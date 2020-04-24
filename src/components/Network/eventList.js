import React from "react";
var moment = require("moment");

const List = ({ data }) => {
  return (
    <div className="my-2 p-2">
      {data.length > 0 ? (
        <div>
          <div className="d-flex justify-content-between">
            <span className="text-muted">Upcoming Events</span>
            <span>View all</span>
          </div>
          <div className="border"></div>
          <div className="d-flex flex-column mt-3">
            {data
              .slice(0, 5)
              .filter((event) => {
                return moment(new Date(event.startTime))
                  .utc()
                  .isSameOrAfter(new Date());
              })
              .map((event) => (
                <div key={event.id} className="mb-2">
                  <div className="d-flex ">
                    <img
                      src="https://images.unsplash.com/photo-1446057032654-9d8885db76c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                      alt="alt images"
                      className="small-image-cover"
                    />
                    <div className="flex-fill d-flex flex-column pl-3">
                      <span className="text-muted">
                        {event.organization_id}
                      </span>
                      <span className="font-weight-bold "> event title</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default List;
