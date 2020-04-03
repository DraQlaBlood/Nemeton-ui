import React from "react";
import { inject, observer } from "mobx-react";


import { Form, Col, Row, Button } from "react-bootstrap";

@inject("user", "account","organization")
@observer
class Organization extends React.Component {
    componentDidMount = async () => {
        await this.props.user.signIn();
      };

  handleSubmit = e => {
    e.preventDefault();

    let name = this.refs.name.value;
    let about = this.refs.about.value;

    //console.log(this.props.account.account_id);

    this.props.organization.add(name,about);
  };

  render() {
    return (
      <div>
        <div className="d-flex justify-content-center py-5">
          <div className="d-flex flex-column text-center">
            <h3>Create a new organization</h3>
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
                        <Form.Label>Organization name </Form.Label>
                        <Form.Control
                          type="text"
                          ref="name"
                          placeholder="username"
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        xs={12}
                        md={12}
                        controlId="exampleForm.ControlInput2"
                      >
                        <Form.Label>About your organization</Form.Label>
                        <Form.Control
                          as="textarea" rows="3"
                          ref="about"
                        />
                      </Form.Group>
                    </Form.Row>
                  </Form>
                  <Button
                    className=" btn-global-orange"
                    onClick={this.handleSubmit}
                    block
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
export default Organization;
