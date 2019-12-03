import React from "react";

import { inject, observer } from "mobx-react";

@inject("requests")
@observer
class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: {}
    };
  }

  componentDidMount() {
    let request = this.state;
    const { requests } = this.props;
    const { id } = this.props.match.params;
    request = requests.find(id);
    this.setState({ request });
  }

  render() {
    const { request } = this.state;
    return (
      <div className="px-4 flex-grow-1">
        <hr />
        <div className="row">
          <div className="col-sm-12 col-md-8">
            <div className="p-2 bg-white ">
              <h1>{request.title}</h1>
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div className="p-2 bg-dark  text-white d-flex flex-column">
              <div className=" py-2 rounded-circle d-flex justify-content-center ">
                <img
                  src="https://via.placeholder.com/100"
                  alt="User"
                  className="rounded-circle bg-warning"
                />
              </div>
              <div className="d-flex justify-content-center text-white ">
                <div className="d-flex flex-column">
                  <p>Posted by : Name of User</p>
                  <p>Joined on : Date user joined</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Show;
