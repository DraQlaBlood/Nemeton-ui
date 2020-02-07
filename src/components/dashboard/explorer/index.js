import React from "react";

import { inject, observer } from "mobx-react";
import { Card } from "react-bootstrap";

import { Link } from "react-router-dom";

@inject("user", "requests", "views")
@observer
class Explorer extends React.Component {
  componentDidMount = async () => {
    await this.props.user.signIn();
  };

  render() {
    const cards = [];

    for (let ind = 0; ind < 10; ind++) {
      cards.push(
        <div key={ind} className="col-sm-12 col-md-6 col-lg-4 ">
          <Card className="border-0 rounded-0 my-2">
            <Card.Body>
                <div className="d-flex flex-column">
              <span>
                <h6>
                  <Link className="liens" to="#">
                    {this.props.user.firstName} {this.props.user.lastName}
                  </Link>
                  <i className="fas fa-long-arrow-alt-right px-2"></i>
                  <strong className="text-uppercase">
                    <Link className="liens" to="#">
                      {this.props.user.account_id}
                    </Link>
                  </strong>
                </h6>
              </span>
              <span>
                  <small>time ago</small>
              </span>
              </div>
              <Card.Text className="mt-3">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <Card.Img
              variant="bottom"
              src="https://via.placeholder.com/100x60"
            />
            <div class="border-top my-2"></div>
            <div className="p-2 d-flex justify-content-around">
              <span>
                <i className="fas fa-comment px-2"></i>Comment
              </span>
              <span>
                <i className="fas fa-share px-2"></i>Share
              </span>
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div className="flex-grow-1 margeMenu">
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-around">
            <div className=" p-2 pt-md-4 mx-md-5">
              <div className="form-group has-search sticky-top">
                <span className="fa fa-search form-control-feedback "></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="d-none d-xs-none d-sm-none d-md-none d-lg-block">
              <div>test</div>
              <div>test</div>
            </div>
          </div>

          <div className="feeds row bg-dark py-2 p-md-5">{cards}</div>
        </div>
      </div>
    );
  }
}
export default Explorer;
