import React from "react";

import { inject, observer } from "mobx-react";
import { Card, Tabs, Tab, Row, Nav, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./network.css";

@inject("user", "account", "organization", "views")
@observer
class Newtwork extends React.Component {
  componentDidMount = async () => {
    await this.props.user.signIn();
    await this.props.account.fetchAll();
    await this.props.organization.fetchAll();
  };

  showOrg = async orgName => {
    await this.props.account.find();
    await this.props.organization.find(orgName);
  };

  render() {
    const { all, org } = this.props.organization;
    

    return (
      <div className=" flex-grow-1">
        <div className="d-none d-xs-none d-sm-none d-md-block d-lg-block d-xl-block">
          <div className=" bg-light ">
            <Row>
              <Col md={3} className="border-right">
                <div className=" pt-2 px-2">
                  <div className="form-group has-search sticky-top">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search organizations"
                    />
                  </div>
                </div>
                <Nav className=" flex-column">
                  <span className="text-uspanpercase pl-4 pb-2 font-weight-bold">
                    Shorcuts
                  </span>
                  {all.slice(0, 10).map(org => {
                    return (
                      <span key={org.id}>
                        <Link
                          to={"organizations/" + org.slug}
                          className="pl-4 text-capitalize text-decoration-none text-reset"
                        >
                          {org.name}
                        </Link>
                      </span>
                    );
                  })}
                  <div className="d-flex justify-content-end">...see more</div>
                </Nav>
              </Col>
              <Col
                md={6}
                className="bg-white orgSide  border-right border-left"
              >
                <div className="flex-grow-1"></div>
              </Col>
              <Col md={3} className="bg-light orgSide ">
                <div className="flex-grow-1">test</div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="d-none d-block d-sm-block d-md-none d-lg-none d-xl-none">
          <div className="row">
            {all.slice(0, 10).map(org => {
              return (
                <div
                  key={org.id}
                  className="my-2 col-sm-6 col-md-4 col-lg-3 text-center"
                >
                  <Card className="bg-dark text-white">
                    <Card.Img
                      src="https://via.placeholder.com/30x30/000000/FFFFFF"
                      alt="Card image"
                    />
                    <Card.ImgOverlay>
                      <Card.Title>
                        <span>{org.name}</span>
                      </Card.Title>
                      <Card.Text>
                        <span>{org.about}</span>
                      </Card.Text>
                      <Card.Text>Last updated 3 mins ago</Card.Text>
                    </Card.ImgOverlay>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default Newtwork;
