import React from "react";

import { Form, Col, Row, Button } from "react-bootstrap";

import { inject, observer } from "mobx-react";

@inject("user", "account")
@observer
class Bundle extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    let name = this.refs.name.value;

    this.props.account.add(name);
  };

  render() {
    return (
      <div className="flex-grow-1 text-center">
        <div className="d-flex justify-content-center py-5">
          <div className="d-flex flex-column">
            <h3>Please complete your account</h3>
            <div className="accountcss text-center">
              <Row className=" py-5">
                <Col xs={12} md={12}>
                  <Form noValidate>
                    <Form.Row>
                      <Form.Group
                        as={Col}
                        xs={12}
                        md={12}
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Account Username or Pseudo </Form.Label>
                        <Form.Control
                          type="text"
                          ref="name"
                          placeholder="username"
                        />
                      </Form.Group>
                    </Form.Row>
                  </Form>
                  <Button
                    className="col-12 btn-global-orange"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Bundle;
