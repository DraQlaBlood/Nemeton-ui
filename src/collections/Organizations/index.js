import React from "react";
import { inject, observer } from "mobx-react";
import "./organization.css";
import { Button, Card, Modal, Form, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import EmptyData from "../../components/LockContents/emptyData";

@inject("user", "account", "organization")
@observer
class OrgCollections extends React.Component {
  componentDidMount = async () => {
    await this.props.user.signIn();
    await this.props.account.fetchAll();
    await this.props.account.find();
    await this.props.organization.fetchAll();
  };

  handleClose = async () => {
    await this.props.organization.setShowModal(false);
  };
  handleShow = async () => {
    await this.props.organization.setShowModal(true);
  };

  handleCreate = async e => {
    e.preventDefault();

    let name = this.refs.name.value;
    let location = this.refs.location.value;
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
      location,
      status,
      mail,
      facebook,
      twitter,
      instagram,
      youtube
    );
    this.handleClose();
  };

  render() {
    const { all, showModal } = this.props.organization;
    const {
      likedOrganizations,
      followedOrganizations,
      accountOrganizations,
      isLoading
    } = this.props.account;

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
      <div className="flex-grow-1 bg-white">
        <div className="organization-banner text-white d-flex flex-column px-5 py-4 d-none d-xs-none d-sm-none d-md-none d-lg-block">
          <div className=" d-flex justify-content-between">
            <div className="d-flex flex-column">
              <span className="font-weight-bold text-capitalize">
                Organization Dashboard
              </span>
              <span className="text-muted">
                {" "}
                Your dashboard with all analytics
              </span>
            </div>
            <div className="d-flex">
              <Button className="btn-red" onClick={this.handleShow}>
                Start a new Organization
              </Button>
              <Modal show={showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Create new organization</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="my-3">
                    <Form>
                      <Row className="p-2">
                        <Col>
                          <Form.Control
                            ref="name"
                            placeholder="Organization name"
                          />
                        </Col>
                      </Row>
                      <Row className="p-2">
                        <Col>
                          <Form.Control
                            ref="location"
                            placeholder="Location (eg: city, Province or country)"
                          />
                        </Col>
                      </Row>
                      <Row className="p-2">
                        <Col>
                          <Form.Check label="Get my actual location" />
                        </Col>
                      </Row>
                      <Row className="p-2">
                        <Col>
                          <Form.Control as="select" ref="type_organization">
                            <option key="0" value="">
                              Please select a type of organization
                            </option>
                            <option key="1" value="open">
                              Public
                            </option>
                            <option key="2" value="close">
                              Private
                            </option>
                          </Form.Control>
                        </Col>
                      </Row>
                      <Row className="p-2">
                        <Col>
                          <Form.Control
                            as="textarea"
                            rows="5"
                            ref="about"
                            placeholder="About your organization"
                          />
                        </Col>
                      </Row>
                      <Row className="p-2">
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
                            placeholder="Link to your organization facebook account"
                          />
                        </Col>
                      </Row>
                      <Row className="p-2">
                        <Col>
                          <Form.Control
                            type="text"
                            ref="twitter"
                            placeholder="Link to your organization twitter account"
                          />
                        </Col>
                      </Row>
                      <Row className="p-2">
                        <Col>
                          <Form.Control
                            type="text"
                            ref="instagram"
                            placeholder="Link to your organization instagram account"
                          />
                        </Col>
                      </Row>
                      <Row className="p-2">
                        <Col>
                          <Form.Control
                            type="text"
                            ref="youtube"
                            placeholder="Link to your organization youtube channel"
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
        <div className="p-2 container">
          {(accountOrganizations.length !== 0 ||
            followedOrganizations.length !== 0 ||
            likedOrganizations.length !== 0) && (
            <div className="row p-3 ">
              <Card className="col-4 bg-card  my-2">
                <Card.Body className="text-center font-weight-bold">
                  <span>Organizations you liked</span>
                  <h4>{likedOrganizations.length}</h4>
                </Card.Body>
              </Card>
              <Card className="col-4 bg-card  my-2">
                <Card.Body className="text-center font-weight-bold">
                  <span>Organizations you are member</span>
                  <h4>{followedOrganizations.length}</h4>
                </Card.Body>
              </Card>
              <Card className="col-4 bg-card  my-2">
                <Card.Body className="text-center font-weight-bold">
                  <span>Organizations you have created</span>
                  <h4>{accountOrganizations.length}</h4>
                </Card.Body>
              </Card>
            </div>
          )}

          <div className="d-flex justify-content-end py-3">
            <div className="p-2 col-md-6 " id="search-area">
              <Form>
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Search for an organization"
                    />
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
          {accountOrganizations.length > 0 && (
            <div className="p-2">
              <div className="d-flex justify-content-between">
                <span className="font-weight-bold pb-3">
                  Organizations you admin
                </span>
                <span className="  font-weight-bold pb-3">See all . . .</span>
              </div>
              <div className="row">
                {accountOrganizations.slice(0, 12).map(followed => {
                  return (
                    <span className="col-md-3 my-2" key={followed.id}>
                      <Card>
                        <Card.Body>
                          <Link to={`/show/${followed.slug}`}>
                            <Card.Title
                              className="text-capitalize font-weight-bold text-truncate"
                              style={{ maxWidth: "200px" }}
                            >
                              {followed.name}
                            </Card.Title>
                          </Link>
                        </Card.Body>
                        <div className="border"></div>
                        <Card.Img
                          variant="bottom"
                          src="https://images.unsplash.com/photo-1464820453369-31d2c0b651af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                        />
                      </Card>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          {followedOrganizations.length > 0 && (
            <div className="p-2">
              <div className="d-flex justify-content-between">
                <span className="font-weight-bold pb-3">
                  Organizations you are member
                </span>
                <span className="  font-weight-bold pb-3">See all . . .</span>
              </div>
              <div className="row">
                {followedOrganizations.slice(0, 12).map(followed => {
                  return (
                    <span className="col-md-3 my-2" key={followed.id}>
                      <Card>
                        <Card.Body>
                          <Link to={`/show/${followed.slug}`}>
                            <Card.Title
                              className="text-capitalize text-decoration-none text-truncate"
                              style={{ maxWidth: "200px" }}
                            >
                              {followed.name}
                            </Card.Title>
                          </Link>
                        </Card.Body>
                        <div className="border"></div>
                        <Card.Img
                          variant="bottom"
                          src="https://images.unsplash.com/photo-1464820453369-31d2c0b651af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                        />
                      </Card>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          {likedOrganizations.length > 0 && (
            <div className="p-2">
              <div className="d-flex justify-content-between">
                <span className="font-weight-bold pb-3">
                  Organizations you have liked
                </span>
                <span className="font-weight-bold pb-3">See all . . .</span>
              </div>
              <div className=" row ">
                {likedOrganizations.slice().map(followed => {
                  return (
                    <span className="col-md-3 my-2" key={followed.id}>
                      <Card>
                        <Card.Body>
                          <Link to={`/show/${followed.slug}`}>
                            <Card.Title
                              className="text-capitalize text-decoration-none text-truncate"
                              style={{ maxWidth: "150px" }}
                            >
                              {followed.name}
                            </Card.Title>
                          </Link>
                        </Card.Body>
                        <div className="border"></div>
                        <Card.Img
                          variant="bottom"
                          src="https://images.unsplash.com/photo-1464820453369-31d2c0b651af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                        />
                      </Card>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          {accountOrganizations.length === 0 &&
            followedOrganizations.length === 0 &&
            likedOrganizations.length === 0 && <EmptyData />}
        </div>
      </div>
    );
  }
}
export default OrgCollections;
