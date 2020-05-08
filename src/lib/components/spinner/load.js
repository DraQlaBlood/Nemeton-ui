import React from "react";

import Loader from "react-loader-spinner";
export default class Spinner extends React.Component {
  //other logic
  render() {
    return (
      <Loader
        type="Watch"
        color="#3c3b6e"
        height={25}
        width={25}
        timeout={3000} //3 secs
      />
    );
  }
}
