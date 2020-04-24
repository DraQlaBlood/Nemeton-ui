import React from "react";

import { Form } from "react-bootstrap";
import { inject, observer } from "mobx-react";

@inject("account")
@observer
class General extends React.Component {
  handleBio = () => {
    this.props.account.setbioUpdate(!this.props.account.bioUpdate);
  };
  handleEmailLink = () => {
    this.props.account.setEmailLink(!this.props.account.emailLink);
  };

  render() {
    return (
      <div className="flex-fill ">
        <div className="px-4 mb-3 ">
          <div className="flex-fill d-flex flex-column align-items-center">
            <div className="p-4 bg-dark rounded-circle picture "></div>
            <div className=" py-2">
              <Form>
                <Form.Group className=" ">
                  <Form.Control
                    className="colour-blue text-white"
                    type="file"
                  />
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
        <div className="p-4 mb-3 border bg-white">
          <div className="flex-fill d-flex flex-column ">
            <div className="d-flex justify-content-between ">
              <h6 className="text-uppercase font-weight-bold ">Bio</h6>
              <i className="fas fa-edit" onClick={this.handleBio}></i>
            </div>
            <div className="flex-fill border-bottom my-3"></div>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
            {this.props.account.bioUpdate && (
              <div className=" mt-4">
                <Form>
                  <Form.Group>
                    <Form.Control as="textarea" rows="4" />
                  </Form.Group>
                </Form>
              </div>
            )}
          </div>
        </div>
        <div className="p-4 mb-3 border bg-white d-flex flex-column ">
          <div className="flex-fill d-flex flex-column ">
            <div className="d-flex justify-content-between ">
              <h6 className="text-uppercase font-weight-bold ">
                Email and social links
              </h6>
              <i className="fas fa-edit" onClick={this.handleEmailLink}></i>
            </div>
            <div className="flex-fill border-bottom my-3"></div>
            <div>
              <Form>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    plaintext={!this.props.account.emailLink}
                    readOnly={!this.props.account.emailLink}
                    placeholder="name@example.com"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Facebook</Form.Label>
                  <Form.Control
                    type="text"
                    plaintext={!this.props.account.emailLink}
                    readOnly={!this.props.account.emailLink}
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Instagram</Form.Label>
                  <Form.Control
                    type="text"
                    plaintext={!this.props.account.emailLink}
                    readOnly={!this.props.account.emailLink}
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Linkedin</Form.Label>
                  <Form.Control
                    type="text"
                    plaintext={!this.props.account.emailLink}
                    readOnly={!this.props.account.emailLink}
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Twitter</Form.Label>
                  <Form.Control
                    type="text"
                    plaintext={!this.props.account.emailLink}
                    readOnly={!this.props.account.emailLink}
                    placeholder=""
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Youtube Channel</Form.Label>
                  <Form.Control
                    type="text"
                    plaintext={!this.props.account.emailLink}
                    readOnly={!this.props.account.emailLink}
                    placeholder=""
                  />
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default General;
