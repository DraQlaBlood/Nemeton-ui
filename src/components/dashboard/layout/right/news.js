import React from "react";

class News extends React.Component {
  render() {
    return (
      <div className="stats d-flex flex-column justify-content-end">
          
          <div className="p-2 ">
            <div className="  mb-2  d-flex flex-column">
              <span>
                <h4>
                  0
                </h4>
              </span>
              <span>
                <small>New articles in your neighborhood</small>
              </span>
            </div>
          </div>
          <div className="p-2    mt-2">
            <div className="   mb-2  d-flex flex-column">
              <span>
                <h4>
                  0
                </h4>
              </span>
              <span>
                <small>New articles in your country</small>
              </span>
            </div>
          </div>
          <div className="p-2    mt-2">
            <div className=" mb-2  d-flex flex-column">
              <span>
                <h4>
                  0
                </h4>
              </span>
              <span>
                <small>New articles around the world</small>
              </span>
            </div>
          </div>
        </div>
    );
  }
}
export default News;
