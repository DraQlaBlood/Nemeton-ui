import React from "react";

import { inject, observer } from "mobx-react";

import Map from "./map";

import Spinner from "../../lib/components/spinner/load";

import "./dashboard.css";
import { withScriptjs, withGoogleMap } from "react-google-maps";

@inject("user", "account", "organization")
@observer
class Layout extends React.Component {
  componentDidMount = async () => {
    await this.props.user.signIn();
    await this.props.account.fetchAll();
  };

  render() {
    const { isLoading } = this.props.organization;

    /**if (isLoading) {
      return (
        <div className="flex-grow-1">
          <div className="d-flex flex-column ">
            <div className="align-self-center">
              Loading all data
            </div>
          </div>
        </div>
      );
    }**/
    return (
      <div className=" flex-grow-1 map">
          <WrappedMap
            googleMapURL={
              "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBS1r7kVg9WqpAac2CPkCv37MzSaAd4MLU"
            }
            loadingElement={<div style={{ height: `100%`, width: "100%" }} />}
            containerElement={<div style={{ height: `100%`, width: "100%" }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
      </div>
    );
  }
}
export default Layout;
const WrappedMap = withScriptjs(withGoogleMap(Map));
