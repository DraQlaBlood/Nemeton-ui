import React from "react";
import { inject, observer } from "mobx-react";
import "./organization.css";
import { Button, Card, Modal, Form, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import EmptyData from "../../components/LockContents/emptyData";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

@inject("user", "account", "organization")
@observer
class OrgCollections extends React.Component {
  componentDidMount = async () => {
    await this.props.user.signIn();
    await this.props.organization.fetchAll();
    await this.props.account.fetchAll();
    await this.props.account.find();
    
  };

  handleClose = async () => {
    await this.props.organization.setShowModal(false);
  };
  handleShow = async () => {
    await this.props.organization.setShowModal(true);
  };

  handleCreate = async (e) => {
    e.preventDefault();

    let name = this.refs.name.value;
    let about = this.refs.about.value;
    let status = this.refs.type_organization.value;
    let mail = this.refs.mail.value;
    let facebook = this.refs.facebook.value;
    let twitter = this.refs.twitter.value;
    let instagram = this.refs.instagram.value;
    let youtube = this.refs.youtube.value;

    this.props.organization.add(
      name,
      about,
      this.props.organization.location,
      this.props.organization.latitude,
      this.props.organization.longitude,
      status,
      mail,
      facebook,
      twitter,
      instagram,
      youtube
    );
    this.handleClose();
  };
  handleChange = (address) => {
    this.props.organization.setAddress(address);
  };

  handleSelect = async (address) => {
    const results = await geocodeByAddress(address);
    const latlng = await getLatLng(results[0]);
    console.log(latlng.lng);
    this.props.organization.setAddress(address);
    await this.props.organization.setLatLng(latlng.lat, latlng.lng);
  };

  render() {
    const { all, showModal, isLoading } = this.props.organization;

    const { account } = this.props.account;
    let actualAccount = account.id;

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
        <div className="flex-grow-1 bg-light">
          <div className="organization-banner text-white d-flex flex-column px-5 py-4 d-none d-xs-none d-sm-none d-md-none d-lg-block">
            <div className=" d-flex justify-content-between">
              <div className="d-flex col-md-4">
                <div className="p-2 mr-3">
                  <h4 className="font-weight-bold text-capitalize">
                    Organization Dashboard
                  </h4>
                </div>
              </div>
              <div className="d-flex ">
                <Button className="btn-red" onClick={this.handleShow}>
                  Start a new Organization
                </Button>
                <Modal show={showModal} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Create new organization</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="my-3 ">
                      <Form>
                        <Row className="p-2">
                          <Col>
                            <Form.Control
                              ref="name"
                              placeholder="Organization name"
                            />
                          </Col>
                          <Col>
                            <PlacesAutocomplete
                              value={this.props.organization.location}
                              onChange={this.handleChange}
                              onSelect={this.handleSelect}
                            >
                              {({
                                getInputProps,
                                suggestions,
                                getSuggestionItemProps,
                                loading,
                              }) => (
                                <div>
                                  <Form.Control
                                    {...getInputProps({
                                      placeholder: "Location",
                                    })}
                                  />
                                  <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map((suggestion) => {
                                      const className = suggestion.active
                                        ? "suggestion-item--active"
                                        : "suggestion-item";
                                      const style = suggestion.active
                                        ? {
                                            backgroundColor: "#fafafa",
                                            cursor: "pointer",
                                          }
                                        : {
                                            backgroundColor: "#ffffff",
                                            cursor: "pointer",
                                          };
                                      return (
                                        <div
                                          {...getSuggestionItemProps(
                                            suggestion,
                                            {
                                              className,
                                              style,
                                            }
                                          )}
                                        >
                                          <span>{suggestion.description}</span>{" "}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </PlacesAutocomplete>
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col>
                            <Form.Control as="select" ref="type_organization">
                              <option key="0" value="">
                                Type of organization
                              </option>
                              <option key="1" value="open">
                                Public
                              </option>
                              <option key="2" value="close">
                                Private
                              </option>
                            </Form.Control>
                          </Col>
                          <Col>
                            <Form.Control
                              type="text"
                              ref="mail"
                              placeholder="Organization e-mail address"
                            />
                          </Col>
                        </Row>
                        <Row className="p-2">
                          <Col>
                            <Form.Control
                              type="text"
                              ref="facebook"
                              placeholder=" facebook account"
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              type="text"
                              ref="twitter"
                              placeholder=" twitter account"
                            />
                          </Col>
                        </Row>

                        <Row className="p-2">
                          <Col>
                            <Form.Control
                              type="text"
                              ref="instagram"
                              placeholder=" instagram account"
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              type="text"
                              ref="youtube"
                              placeholder=" youtube channel"
                            />
                          </Col>
                        </Row>

                        <Row className="p-2">
                          <Col>
                            <Form.Control
                              as="textarea"
                              rows="7"
                              ref="about"
                              placeholder="About your organization"
                            />
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      Cancel
                    </Button>
                    <Button className="btn-red" onClick={this.handleCreate}>
                      Save
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>

          <div className="descripto bg-light mx-5">
            <div className="row">
              <div className="col-md-3">
                {all.slice().map((organization) => {
                  if (
                    (organization.likers.slice().filter(function (account) {
                      return account.id === actualAccount;
                    }).length > 0 ||
                      organization.followers.slice().filter(function (account) {
                        return account.id === actualAccount;
                      }).length > 0) &&
                    organization.account.id !== actualAccount
                  ) {
                    return (
                      <div className="shadow-sm bg-light  my-2 p-2 text-dark">
                        <div className=" px-2 d-flex" key={organization.id}>
                          <div>
                            <Link
                              className="font-weight-bold text-dark"
                              to={`/show/${organization.slug}/${organization.id}`}
                            >
                              <span>{organization.name}</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <div className="col-md-9 p-3 ">
                {all.length > 0 && (
                  <div className="row">
                    {all
                      .filter(function (organization) {
                        return organization.account.id === account.id;
                      })
                      .slice()
                      .map((organization) => {
                        return (
                          <div className="col-md-4 px-2 py-3 text-dark">
                            <div
                              className="orgDisplay rounded p-3 d-flex flex-column justify-content-between  shadow-sm bg-white "
                              key={organization.id}
                            >
                              <div className="flex-grow-1 d-flex justify-content-around align-items-center ">
                                <Link
                                  className="font-weight-bold text-dark "
                                  to={`/show/${organization.slug}/${organization.id}`}
                                >
                                  <h5 className=" text-capitalize font-weight-bold">
                                    {organization.name}
                                  </h5>
                                </Link>
                              </div>
                              <div className="d-flex justify-content-between text-muted">
                                <div>
                                  <i className="fas fa-comments mr-2"></i>
                                  <span>
                                    {organization.conversations.length}
                                  </span>
                                </div>
                                <div>
                                  <i className="fas fa-heart mr-2"></i>
                                  <span>{organization.likers.length}</span>
                                </div>
                                <div>
                                  <i className="fas fa-users mr-2"></i>
                                  <span>{organization.followers.length}</span>
                                </div>
                                <div>
                                  {organization.status === "open" ? (
                                    <i className="fas fa-lock-open mr-2"></i>
                                  ) : (
                                    <i className="fas fa-lock mr-2"></i>
                                  )}
                                  <span className="text-uppercase">
                                    {organization.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    
  }
}
export default OrgCollections;
