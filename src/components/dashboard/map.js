import React from "react";
import { GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";

@inject("organization", "views")
@observer
class Map extends React.Component {
  componentDidMount = async () => {
    await this.props.organization.fetchAll();
  };

  render() {
    const { all, isLoading } = this.props.organization;

    if (isLoading) {
      return <div className="map">loading data</div>;
    } else {
      return (
        <GoogleMap
          defaultZoom={10}
          defaultCenter={{
            lat: 43.653225, //Number(currentlatitude),
            lng: -79.383186, //Number(currentlongitude)
          }}
        >
          {all.slice().map((organization) => (
            <Marker
              key={organization.id}
              position={{
                lat: Number(organization.latitude),
                lng: Number(organization.longitude),
              }}
              onClick={() => {
                this.props.views.setSelectMapObject(organization);
              }}
            />
          ))}

          {this.props.views.selectedMapObject && (
            <InfoWindow
              position={{
                lat: Number(this.props.views.selectedMapObject.latitude),
                lng: Number(this.props.views.selectedMapObject.longitude),
              }}
              onCloseClick={() => {
                this.props.views.setSelectMapObject(null);
              }}
              className="col-md-6"
            >
              <div className="d-flex flex-column p-2">
                <div className="mb-3">
                  <Link
                    className="font-weight-bold text-dark "
                    to={`/show/${this.props.views.selectedMapObject.slug}/${this.props.views.selectedMapObject.id}`}
                  >
                    <h4>{this.props.views.selectedMapObject.name}</h4>
                  </Link>
                  <p>{this.props.views.selectedMapObject.about}</p>
                </div>
                <div className="d-flex justify-content-between text-muted">
                  <div>
                    <i className="fas fa-comments mr-2"></i>
                    <span>
                      {this.props.views.selectedMapObject.conversations.length}
                    </span>
                  </div>
                  <div>
                    <i className="fas fa-heart mr-2"></i>
                    <span>
                      {this.props.views.selectedMapObject.likers.length}
                    </span>
                  </div>
                  <div>
                    <i className="fas fa-users mr-2"></i>
                    <span>
                      {this.props.views.selectedMapObject.followers.length}
                    </span>
                  </div>
                  <div>
                    {this.props.views.selectedMapObject.status === "open" ? (
                      <i className="fas fa-lock-open mr-2"></i>
                    ) : (
                      <i className="fas fa-lock mr-2"></i>
                    )}
                    <span className="text-uppercase">
                      {this.props.views.selectedMapObject.status}
                    </span>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      );
    }
  }
}
export default Map;
