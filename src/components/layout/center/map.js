import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

function Maps() {
  return (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }} />
  );
}

const MyMapComponent = withScriptjs(withGoogleMap(Maps));

class Map extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column bg-white shadow">
        <div className="d-flex  p-2" style={{ height: `100%`, width: "100%" }}>
          <MyMapComponent
            googleMapURL={
              "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBS1r7kVg9WqpAac2CPkCv37MzSaAd4MLU"
            }
            loadingElement={<div style={{ height: `100%`, width: "100%" }} />}
            containerElement={
              <div style={{ height: `500px`, width: "100%" }} />
            }
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    );
  }
}
export default Map;
