import React from "react";

import { Form, Button, Row, Col } from "react-bootstrap";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const formValid = ({ formErrors, user }) => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  Object.values(user).forEach(val => {
    val === null && (valid = false);
  });
  return valid;
};

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmpassword: "",
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      },
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmpassword: ""
      }
    };
  }

  handleChange = e => {
    //e.preventDefault();
    let formErrors = this.state.formErrors;
    let user = this.state.user;
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        user.firstName = value;
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "lastName":
        user.lastName = value;
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "email":
        user.email = value;
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        this.setState({ email: value });
        break;
      case "password":
        user.password = value;
        formErrors.password =
          value.length < 7 ? "minimum 7 characters required" : "";
        break;
      case "confirmpassword":
        this.setState({ confirmpassword: value });
        formErrors.confirmpassword =
          value !== user.password ? "password not identical" : "";
        break;

      default:
        break;
    }
    this.setState({ formErrors, user });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      console.log("submission success");
    } else {
      console.log("submission error");
    }
  };

  render() {
    const { formErrors } = this.state;
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
                    name="firstName"
                    onChange={this.handleChange}
                    placeholder="Firstname"
                  />
                  {formErrors.firstName.length > 0 && (
                    <small className="errorMessage">
                      {formErrors.firstName}
                    </small>
                  )}
                </Form.Group>
                <Form.Group className="col-sm-12 col-md-6">
                  <Form.Label>Lastname</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    onChange={this.handleChange}
                    placeholder="Lastname"
                  />
                  {formErrors.lastName.length > 0 && (
                    <small className="errorMessage">
                      {formErrors.lastName}
                    </small>
                  )}
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group className="col-sm-12 col-md-6">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                    placeholder="Password"
                  />
                </Form.Group>
                <Form.Group className="col-sm-12 col-md-6">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    onChange={this.handleChange}
                    placeholder="Confirm your password"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={this.handleChange}
                  placeholder="Email address"
                />
                {formErrors.email.length > 0 && (
                  <small className="errorMessage">{formErrors.email}</small>
                )}
              </Form.Group>
              <Button
                onClick={this.handleSubmit}
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
