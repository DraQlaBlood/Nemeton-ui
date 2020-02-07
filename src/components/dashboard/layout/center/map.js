import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap
} from "react-google-maps";

class Map extends React.Component {
  render() {

    const MyMapComponent = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{
            lat: 43.653225 ,//Number(currentlatitude),
            lng: -79.383186 //Number(currentlongitude)
          }}
        >
          
        </GoogleMap>
      ))
    );
    return (
      <div className="d-flex flex-column bg-white shadow">
        <div className="d-flex w-100" style={{ height: `100%`, width: "100%" }}>
          <MyMapComponent
            googleMapURL={
              "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBS1r7kVg9WqpAac2CPkCv37MzSaAd4MLU"
            }
            loadingElement={<div style={{ height: `100%`, width: "100%" }} />}
            containerElement={
              <div style={{ height: `100vh`, width: "100%" }} />
            }
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    );
  }
}
export default Map;
