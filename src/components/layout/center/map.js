import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

class Map extends React.Component {
  render() {
    const { coords, currentlongitude, currentlatitude } = this.props;

    const MyMapComponent = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{
            lat: Number(currentlatitude),
            lng: Number(currentlongitude)
          }}
        >
          {this.props.all
            .slice()
            .filter(function(req) {
              return req.country === coords.country;
            })
            .map(request => (
              <Marker
                key={request.id}
                position={{
                  lat: Number(request.latitude),
                  lng: Number(request.longitude)
                }}
              />
            ))}
        </GoogleMap>
      ))
    );
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
