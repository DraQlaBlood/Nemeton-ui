import React from "react";

class Dashboard extends React.Component {
  render() {
    const { user_id, all } = this.props;
    const views = all.slice().filter(function(req) {
      return req.user_id === user_id;
    });
    const allviews = views.map(function(req) {
      return Number(req.views);
    });

    const arrSum = allviews.reduce((a, b) => a + b, 0);
    console.log(arrSum);
    return (
      <div className=" shadow border">
        <div className="bg-light p-2 d-flex flex-column">
          <div className=" d-flex justify-content-between p-2">
            <span>
              <h5>Your Dashboard</h5>
            </span>
            <span>
              <small>
                <i>Private to you</i>
              </small>
            </span>
          </div>
          <div className=" d-flex flex-column text-center ">
            <div className="flex-fill bg-white p-2 mb-2 border d-flex flex-column">
              <span>
                <h4>
                  {
                    this.props.all.filter(function(req) {
                      return req.user_id === user_id;
                    }).length
                  }
                </h4>
              </span>
              <span>
                <small>Your publications</small>
              </span>
            </div>

            <div className="flex-fill bg-white p-2 mb-2 border d-flex flex-column">
              <span>
                <h4>{arrSum}</h4>
              </span>
              <span>
                <small>Articles views</small>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
