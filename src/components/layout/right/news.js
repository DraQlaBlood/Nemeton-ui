import React from "react";

class News extends React.Component {
  render() {
    return (
      <div className="d-flex justify-content-between p-2">
        <span>Today’s news and views</span>
        <span>
          <i className="fas fa-info-circle"></i>
        </span>
      </div>
    );
  }
}
export default News;
