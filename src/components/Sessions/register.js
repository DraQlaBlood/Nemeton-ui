import React from "react";
import { inject, observer } from "mobx-react";

import { Form, Button, Row, Col } from "react-bootstrap";
import Spinner from "../../lib/components/spinner/load";

@inject("user")
@observer
class Signup extends React.Component {
  componentDidMount() {
    this.props.user.signInWithoutResources();
  }

  submitForm = e => {
    e.preventDefault();
    const { user } = this.props;
    user.create(
      this.firstName.value,
      this.lastName.value,
      this.email.value,
      this.password.value,
      this.confirm_password.value
    );
  };

  render() {
    const { isLoading } = this.props.user;
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
      <div className="flex-grow-1 signin">
        <hr />
        <Row>
          <Col md={6} className="mx-auto">
            <Form
              noValidate
              className="p-2 p-md-3 border bg-white shadow my-auto text-center"
            >
              <h3>Sign up for free</h3>
              <hr />
              <Form.Row>
                <Form.Group className="col-sm-12 col-md-6">
                  <Form.Label>Firstname</Form.Label>
                  <Form.Control
                    type="text"
                    ref={node => {
                      this.firstName = node;
                    }}
                    placeholder="Firstname"
                  />
                </Form.Group>
                <Form.Group className="col-sm-12 col-md-6">
                  <Form.Label>Lastname</Form.Label>
                  <Form.Control
                    type="text"
                    ref={node => {
                      this.lastName = node;
                    }}
                    placeholder="Lastname"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group className="col-sm-12 col-md-6">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={node => {
                      this.password = node;
                    }}
                    placeholder="Password"
                  />
                </Form.Group>
                <Form.Group className="col-sm-12 col-md-6">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={node => {
                      this.confirm_password = node;
                    }}
                    placeholder="Confirm your password"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  ref={node => {
                    this.email = node;
                  }}
                  placeholder="Email address"
                />
              </Form.Group>
              <Button
                onClick={this.submitForm}
                className="btn-global-orange col-12"
                type="submit"
              >
                Signup
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Signup;
