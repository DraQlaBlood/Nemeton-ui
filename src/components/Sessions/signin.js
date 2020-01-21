import React from "react";
import { inject, observer } from "mobx-react";

import { Link } from "react-router-dom";

import { Form, Button, Row, Col } from "react-bootstrap";
import Spinner from "../../lib/components/spinner/load";

@inject("user")
@observer
class Login extends React.Component {
  componentDidMount() {
    this.props.user.signInWithoutResources();
    this.props.user.signIn();
      
  }

  submitForm = e => {
    e.preventDefault();
    const { user } = this.props;
    user.signIn(this.email.value, this.password.value);
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
      <div className="flex-grow-1  signin">
        <hr />
        <Row>
          <Col sm={10} md={4} className="mx-auto">
            <Form
              noValidate
              className="p-2 p-md-3 border-none bg-white shadow my-auto text-center"
              onSubmit={this.submitForm}
            >
              <h3>Log in to your account</h3>
              <hr />
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  ref={node => {
                    this.email = node;
                  }}
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  ref={node => {
                    this.password = node;
                  }}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group>
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
              <Button className="col-12 btn-global-orange" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
        <div className="d-flex pt-2 justify-content-center">
          <div className=" text-center p-3">
            <Link className="liens ml-2" to="/users/password-reset">
              Forgot your password?
            </Link>
          </div>
          <div className=" text-center p-3">
            New to Nemeton?
            <Link className="liens ml-2" to="/users/new-user-registration">
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
