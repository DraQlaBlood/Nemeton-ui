import React from "react";

import { Form, Button, Row, Col } from "react-bootstrap";

class ForgotPassword extends React.Component {
  render() {
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
              <h3>Reset Password</h3>
              <hr />
              <Form.Group>
                <Form.Label>
                  Enter your email address below and we'll send you a link to
                  reset your password.
                </Form.Label>
                <Form.Control
                  type="email"
                  ref={node => {
                    this.email = node;
                  }}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Button className="col-12 btn-global-orange" type="submit">
                Send me reset link
              </Button>
            </Form>
          </Col>
        </Row>
        <div className="d-flex pt-2 justify-content-center">
          <div className=" text-center p-3">
            <p>Still can't login? E-mail account-lockout@heroku.com</p>
            <p>if you need additional assistance.</p>
          </div>
        </div>
      </div>
    );
  }
}
export default ForgotPassword;
