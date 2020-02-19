import React from "react";
import { inject, observer } from "mobx-react";
import "./organization.css";
import { Button, Card, Modal, Form, Row, Col } from "react-bootstrap";
import { Link  } from "react-router-dom";

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
    let typeOrg = this.refs.type_organization.value;

    console.log("Details org: ", name, location, about, typeOrg);
  };

  render() {
    const { all, showModal,  } = this.props.organization;
    const { account_id } = this.props.account;



    return (
      <div className="flex-grow-1 bg-white">
        <div className="organization-banner text-white d-flex flex-column px-5 py-4 d-none d-xs-none d-sm-none d-md-none d-lg-block">
          <div className=" d-flex justify-content-between">
            <h4>Organizations</h4>
            <div className="d-flex">
              <Button className="btn-red" onClick={this.handleShow}>
                Create Organization
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
                          <Form.Control as="select" ref="type_organization">
                            <option key="0" value="">
                              Please select a type of org
                            </option>
                            <option key="1" value="public_organization">
                              Public Organization
                            </option>
                            <option key="2" value="private_organization">
                              Private Organization
                            </option>
                          </Form.Control>
                        </Col>
                      </Row>
                      <Row className="p-2">
                        <Col>
                          <Form.Control
                            as="textarea"
                            rows="12"
                            ref="about"
                            placeholder="About your organization"
                          />
                        </Col>
                      </Row>

                      <Row className="p-2">
                        <Col>
                          <Form.Check label="Get my actual location" />
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
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>

        <div className="  container suggested-groups d-flex my-3 mx-auto">
          {all
            .slice()
            .filter(organization => organization.account_id !== account_id)
            .map(org => {
              return (
                <span
                  className="suggested-groups-span col-md-3 col-sm-6"
                  key={org.id}
                >
                    <Card>
                      <Card.Img
                        variant="bottom"
                        src="https://via.placeholder.com/100px50"
                      />
                      <Card.ImgOverlay>
                      <Link to={"show/" + org.slug}>
                        <Card.Title className="text-capitalize text-decoration-none text-reset">
                          {org.name}
                        </Card.Title>
                      </Link>
                      </Card.ImgOverlay>
                    </Card>
                </span>
              );
            })}
        </div>
        <div className=" container px-5 py-4 row mx-auto">
          {all
            .slice()
            .filter(organization => organization.account_id === account_id)
            .map(org => {
              return (
                <span className="col-md-3 my-2 " key={org.id}>
                  <Card>
                    <Card.Body>
                      <Link to={`/show/${org.slug}`}>
                        <Card.Title className="text-capitalize text-decoration-none text-reset">
                          {org.name}
                        </Card.Title>
                      </Link>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                    <Card.Img
                      variant="bottom"
                      src="https://via.placeholder.com/100px50"
                    />
                  </Card>
                </span>
              );
            })}
        </div>
      </div>
    );
  }
}
export default OrgCollections;
