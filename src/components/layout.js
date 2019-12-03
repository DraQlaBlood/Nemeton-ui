import React from "react";

import { inject, observer } from "mobx-react";

import Discover from "./layout/left/discover";
import Profile from "./layout/left/profile";
import News from "./layout/right/news";
import Posting from "./layout/center/posting";
import Map from "./layout/center/map";

@inject("requests", "user")
@observer
class Layout extends React.Component {
  componentDidMount() {
    this.props.requests.fetchAll();
    this.props.user.signIn();
  }
  render() {
    return (
      <div className="px-5 py-3 row">
        <section id="en-tete" className="col-md-2">
          <Profile userEmail={this.props.user.email} />
          <Discover />
        </section>
        <section id="en-tete" className="col-md-7">
          <div>
            <Posting />
            <Map />
          </div>
        </section>
        <section id="en-tete" className="col-md-3">
          <div className="d-flex flex-column bg-white shadow">
            <News />
          </div>
        </section>
      </div>
    );
  }
}
export default Layout;
