import React from "react";

import { inject, observer } from "mobx-react";
import { Card, Button } from "react-bootstrap";

@inject("user", "requests", "views")
@observer
class Notifications extends React.Component {
  componentDidMount = async () => {
    await this.props.user.signIn();
  };

  render() {
    return (
      <div className=" flex-grow-1 container">
        <div className="row p-4">
          <div class="col-md-3">test</div>
          <div class="col-md-9">
            <section id="invitations">
              <div >
                <div className="d-flex bg-white justify-content-between p-2">
                  <span>Invitations</span>
                  <span>See all</span>
                </div>
                <div className="bg-light p-2 ">
                  <div className="d-flex justify-content-between">
                    <div className="p-2">
                      <Card>
                        <Card.Body>
                          <Card.Title>Card Title</Card.Title>
                          <Card.Text>
                            Some quick example text to build on the card title.
                          </Card.Text>
                          <div className="d-flex justify-content-center">
                            <Button block className="btn-global-orange">
                              Connect
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                    <div className="p-2">
                      <Card>
                        <Card.Body>
                          <Card.Title>Card Title</Card.Title>
                          <Card.Text>
                            Some quick example text to build on the card title.
                          </Card.Text>
                          <div className="d-flex justify-content-center">
                            <Button block className="btn-global-orange">
                              Connect
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                    <div className="p-2">
                      <Card>
                        <Card.Body>
                          <Card.Title>Card Title</Card.Title>
                          <Card.Text>
                            Some quick example text to build on the card title.
                          </Card.Text>
                          <div className="d-flex justify-content-center">
                            <Button block className="btn-global-orange">
                              Connect
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                    <div className="p-2">
                      <Card>
                        <Card.Body>
                          <Card.Title>Card Title</Card.Title>
                          <Card.Text>
                            Some quick example text to build on the card title.
                          </Card.Text>
                          <div className="d-flex justify-content-center">
                            <Button block className="btn-global-orange">
                              Connect
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="gorupsInterest my-2">
              <div >
                <div className="d-flex bg-white justify-content-between p-2">
                  <span>Organizations you may be interested in</span>
                  <span>See all</span>
                </div>
                <div className="bg-light p-2 ">
                  <div className="d-flex justify-content-between">
                    <div className="p-2">
                      <Card>
                        <Card.Body>
                          <Card.Title>Card Title</Card.Title>
                          <Card.Text>
                            Some quick example text to build on the card title.
                          </Card.Text>
                          <div className="d-flex justify-content-center">
                            <Button block className="btn-global-orange">
                              Connect
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                    <div className="p-2">
                      <Card>
                        <Card.Body>
                          <Card.Title>Card Title</Card.Title>
                          <Card.Text>
                            Some quick example text to build on the card title.
                          </Card.Text>
                          <div className="d-flex justify-content-center">
                            <Button block className="btn-global-orange">
                              Connect
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                    <div className="p-2">
                      <Card>
                        <Card.Body>
                          <Card.Title>Card Title</Card.Title>
                          <Card.Text>
                            Some quick example text to build on the card title.
                          </Card.Text>
                          <div className="d-flex justify-content-center">
                            <Button block className="btn-global-orange">
                              Connect
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                    <div className="p-2">
                      <Card>
                        <Card.Body>
                          <Card.Title>Card Title</Card.Title>
                          <Card.Text>
                            Some quick example text to build on the card title.
                          </Card.Text>
                          <div className="d-flex justify-content-center">
                            <Button block className="btn-global-orange">
                              Connect
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="followInterest my-2">
              <div >
                <div className="d-flex bg-white justify-content-between p-2">
                  <span>Accounts you follow also follow these pages</span>
                  <span>See all</span>
                </div>
                <div className="bg-light p-2 ">
                  <div className="d-flex justify-content-between">
                    <div className="p-2">
                      <Card>
                        <Card.Body>
                          <Card.Title>Card Title</Card.Title>
                          <Card.Text>
                            Some quick example text to build on the card title.
                          </Card.Text>
                          <div className="d-flex justify-content-center">
                            <Button block className="btn-global-orange">
                              Connect
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                    <div className="p-2">
                      <Card>
                        <Card.Body>
                          <Card.Title>Card Title</Card.Title>
                          <Card.Text>
                            Some quick example text to build on the card title.
                          </Card.Text>
                          <div className="d-flex justify-content-center">
                            <Button block className="btn-global-orange">
                              Connect
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                    <div className="p-2">
                      <Card>
                        <Card.Body>
                          <Card.Title>Card Title</Card.Title>
                          <Card.Text>
                            Some quick example text to build on the card title.
                          </Card.Text>
                          <div className="d-flex justify-content-center">
                            <Button block className="btn-global-orange">
                              Connect
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                    <div className="p-2">
                      <Card>
                        <Card.Body>
                          <Card.Title>Card Title</Card.Title>
                          <Card.Text>
                            Some quick example text to build on the card title.
                          </Card.Text>
                          <div className="d-flex justify-content-center">
                            <Button block className="btn-global-orange">
                              Connect
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}
export default Notifications;
