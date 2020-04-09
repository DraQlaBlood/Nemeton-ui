import React from "react";

import { Form, Col, Row, Button } from "react-bootstrap";

import { inject, observer } from "mobx-react";

@inject("user", "account")
@observer
class AddAccount extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    let name = this.refs.name.value;

    this.props.account.add(name);
  };

  render() {
    return (
      <div className="flex-grow-1 text-center">
        <div className="d-flex justify-content-center py-2">
          <div className="d-flex flex-column">
            <h3>Add account information</h3>
            <div className=" text-center">
              <Row className=" py-3">
                <Col xs={12} md={12}>
                  <Form noValidate>
                    <Form.Row>
                      <Form.Group as={Col} xs={12} md={12}>
                        <Form.Label>Account Username or Pseudo </Form.Label>
                        <Form.Control
                          type="text"
                          ref="name"
                          placeholder="username"
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} xs={12} md={12}>
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          type="text"
                          ref="bio"
                          placeholder="Your bio"
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} xs={12} md={12}>
                        <Form.Label >
                          Mail :{" "}
                        </Form.Label>
                        <Form.Control
                          
                          type="text"
                          ref="mail"
                          placeholder="input your contact"
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} xs={12} md={12}>
                        <Form.Label >
                          Facebook :{" "}
                        </Form.Label>
                        <Form.Control
                          
                          type="text"
                          ref="facebook"
                          placeholder="link to your facebook account"
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} xs={12} md={12}>
                        <Form.Label >
                          Twitter :{" "}
                        </Form.Label>
                        <Form.Control
                          
                          type="text"
                          ref="twitter"
                          placeholder="link to your twitter account"
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} xs={12} md={12}>
                        <Form.Label >
                          Instagram :{" "}
                        </Form.Label>
                        <Form.Control
                          
                          type="text"
                          ref="instagram"
                          placeholder="link to your instagram account"
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} xs={12} md={12}>
                        <Form.Label >
                          Youtube :{" "}
                        </Form.Label>
                        <Form.Control
                          
                          type="text"
                          ref="youtube"
                          placeholder="link to your youtube account"
                        />
                      </Form.Group>
                    </Form.Row>
                  </Form>
                  <div className="d-flex justify-content-around">
                    <Button
                      className="col-4 btn-global-orange"
                      onClick={this.handleClose}
                    >
                      Cancel
                    </Button>

                    <Button
                      className="col-4 btn-global-orange"
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddAccount;
