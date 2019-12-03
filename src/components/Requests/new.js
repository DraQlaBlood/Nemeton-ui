import React from "react";

import { Form, Row, Col, Button } from "react-bootstrap";
import { inject, observer } from "mobx-react";

@inject("categories")
@inject("requests", "user")
@observer
class AddRequest extends React.Component {
  componentDidMount = async () => {
    this.props.user.signIn();
    this.props.categories.fetchAll();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.requests.add({
      title: this.refs.title.value,
      location: this.refs.location.value,
      description: this.refs.description.value,
      category_id: this.refs.category_id.value
    });
  };

  render() {
    const { categories } = this.props;

    const options = categories.all.slice().map(req => (
      <option key={req.id} value={req.id}>
        {req.category}
      </option>
    ));
    return (
      <div className="px-4 flex-grow-1">
        <hr />
        <div className="p-3 bg-white">
          <div className="d-flex justify-content-center text-uppercase">
            <strong>New Request</strong>
          </div>
          <hr />
          <Row className="px-4">
            <Col xs={12} md={12}>
              <Form noValidate>
                <Form.Row>
                  <Form.Group
                    as={Col}
                    xs={12}
                    md={9}
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      ref="title"
                      placeholder="Title of request"
                    />
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    xs={12}
                    md={3}
                    controlId="exampleForm.ControlSelect1"
                  >
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" ref="category_id">
                      {options}
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group
                    as={Col}
                    xs={12}
                    md={12}
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      ref="location"
                      placeholder="Request's location"
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control ref="description" as="textarea" rows="3" />
                </Form.Group>
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
    );
  }
}
export default AddRequest;
