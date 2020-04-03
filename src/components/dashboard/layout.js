import React from "react";

import { inject, observer } from "mobx-react";

import Map from "./layout/center/map";

import Spinner from "../../lib/components/spinner/load";
import GetGreetingTime from "../Navigation/homepage";

import "./dashboard.css";

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
        className="carte"
      />
    );
  } else {
    return <div />;
  }
}

@inject("user", "account", "views")
@observer
class Layout extends React.Component {
  componentDidMount = async () => {
    await this.props.user.signIn();
    await this.props.user.getCoords();
    await this.props.account.fetchAll();
  };

  render() {
    const {
      isLoading
      /*coords,
      currentlatitude,
      currentlongitude*/
    } = this.props.user;
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
      <div className=" flex-grow-1 d-flex flex-column">
        <div className="flex-shrink-0">
          <div className="salutationCellphone d-none d-block d-sm-block d-md-block d-lg-none bg-white fixed-bottom mx-3">
            <div className="d-flex justify-content-center">
              <GetGreetingTime />, {this.props.user.firstName}
            </div>
            <div className="form-group has-search px-4 py-2">
              <span className="fa fa-search form-control-feedback"></span>
              <input
                type="text"
                className="form-control"
                placeholder="Search for posts"
              />
            </div>
          </div>
        </div>

        <div className="flex-grow-1">
          <View
            isMap={isMap}
            /*currentlatitude={currentlatitude}
          currentlongitude={currentlongitude}*/
          />
        </div>
      </div>
    );
  }
}
export default Layout;
