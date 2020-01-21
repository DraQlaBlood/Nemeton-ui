import React from "react";

import { inject, observer } from "mobx-react";

import Discover from "./layout/left/discover";
import Profile from "./layout/left/profile";
import News from "./layout/right/news";
import Posting from "./layout/center/posting";
import Map from "./layout/center/map";

import ReqCol from "./Requests/collections";

import Spinner from "../lib/components/spinner/load";

function View(props) {
  const isMap = props.isMap;
  const all = props.all;
  const coords = props.coords;
  const currentlatitude = props.currentlatitude;
  const currentlongitude = props.currentlongitude;
  if (isMap) {
    return (
      <Map
        all={all}
        coords={coords}
        currentlatitude={currentlatitude}
        currentlongitude={currentlongitude}
      />
    );
  } else {
    return <ReqCol all={all} coords={coords} />;
  }
}

@inject("user", "requests", "views")
@observer
class Layout extends React.Component {
  componentDidMount = async () => {
    await this.props.user.signIn();
    await this.props.user.getCoords();
    await this.props.requests.fetchAll();
  };

  render() {
    const {
      isLoading,
      coords,
      currentlatitude,
      currentlongitude
    } = this.props.user;
    const { all } = this.props.requests;
    const { isMap } = this.props.views;

    if (isLoading) {
      return (
        <div className="flex-grow-1">
          <div className="d-flex flex-column ">
            <div className="align-self-center">
              <Spinner />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="px-5 py-3 row">
        <section id="en-tete" className="col-md-2">
          <Profile user={this.props.user} />
          <Discover />
        </section>
        <section id="en-tete" className="col-md-7">
          <div>
            <Posting />
            <View
              isMap={isMap}
              all={all}
              coords={coords}
              currentlatitude={currentlatitude}
              currentlongitude={currentlongitude}
            />
          </div>
        </section>
        <section id="en-tete" className="col-md-3">
          <div className="d-flex flex-column ">
            <News all={all} coords={coords} user={this.props.user} />
          </div>
        </section>
      </div>
    );
  }
}
export default Layout;
