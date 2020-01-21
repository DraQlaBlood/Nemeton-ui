import React from "react";
import { Form, Col } from "react-bootstrap";

class News extends React.Component {
  render() {
    const { coords, user } = this.props;
    return (
      <div className="d-flex flex-column">
        <div className="d-flex flex-column mb-2 text-center">
          <div className="py-2 bg-light  flex-fill">
            <div className="flex-fill  mb-2  d-flex flex-column">
              <div>
                <Form noValidate>
                  <Form.Group
                    as={Col}
                    xs={12}
                    md={12}
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      ref="search "
                      placeholder="search by title"
                    />
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
          <div className="p-2 bg-white shadow flex-fill  mt-2">
            <div className="flex-fill  mb-2  d-flex flex-column">
              <span>
                <h4>
                  {
                    this.props.all.filter(function(req) {
                      return (
                        req.city === coords.city && req.user_id !== user.user_id
                      );
                    }).length
                  }
                </h4>
              </span>
              <span>
                <small>New articles in your neighborhood</small>
              </span>
            </div>
          </div>
          <div className="p-2 bg-white shadow flex-fill mt-2">
            <div className="flex-fill   mb-2  d-flex flex-column">
              <span>
                <h4>
                  {
                    this.props.all.filter(function(req) {
                      return (
                        req.country === coords.country &&
                        req.user_id !== user.user_id
                      );
                    }).length
                  }
                </h4>
              </span>
              <span>
                <small>New articles in your country</small>
              </span>
            </div>
          </div>
          <div className="p-2 bg-white shadow flex-fill mt-2">
            <div className="flex-fill mb-2  d-flex flex-column">
              <span>
                <h4>
                  {
                    this.props.all.filter(function(req) {
                      return req.user_id !== user.user_id;
                    }).length
                  }
                </h4>
              </span>
              <span>
                <small>New articles around the world</small>
              </span>
            </div>
          </div>
        </div>

        <div className=" d-flex justify-content-between p-2 bg-global shadow">
          <span>Today’s news and views</span>
          <span>
            <i className="fas fa-info-circle"></i>
          </span>
        </div>
        <div className=" d-flex flex-column flex-fill p-2 bg-white shadow">
          {this.props.all
            .filter(function(req) {
              return req.user_id !== user.user_id;
            })
            .slice(0, 5)
            .map(req => {
              return (
                <div key={req.id} className="d-flex flex-column">
                  <span>
                    <strong>{req.title}</strong>
                  </span>
                  <small className="text-muted">
                    status: {req.status} on {req.created_at}
                  </small>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
export default News;
