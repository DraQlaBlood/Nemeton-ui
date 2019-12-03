import React from "react";
//import Switch from "react-switch";
import { Button } from "react-bootstrap";

import { inject, observer } from "mobx-react";

//import ReqCard from "./requestLayout/reqCard";

@inject("user")
@observer
class Landing extends React.Component {
  componentDidMount() {
    this.props.user.signInWithoutResources();
  }
  render() {
    return (
      <div className="flex-grow-1  landingImage">
        <div className="my-3 px-5 py-4 ">
          <div className="row">
            <div className=" col-sm-12 col-md-4">
              <h3>Welcome to Nemeton </h3>
              <p>
                Help your neighborhood for a better future of your community
              </p>
            </div>
            <div className=" col-sm-12 col-md-8"></div>
          </div>
        </div>
        <div className="row p-5 bg-white text-center">
          <div className="col-sm-12 col-md-6 ">
            <img
              src="https://static-exp1.licdn.com/sc/h/dobk0zdbnx1j8bw80qznl7kmg"
              alt="community organizations"
              className="rounded-circle roundedhomeimg"
            />
            <h5>Connect with help organizations around the world </h5>
            <Button className=" my-4 btn-global-orange" type="submit">
              Learn more
            </Button>
          </div>
          <div className="col-sm-12 col-md-6">
            <img
              src="https://static-exp1.licdn.com/sc/h/4bqnl28qm2h3ho4cad1tuxemr"
              alt="community organizations"
              className="rounded-circle roundedhomeimg"
            />
            <h5>Gather people to help in the neighborhood</h5>
            <Button className=" my-4 btn-global-orange" type="submit">
              Learn more
            </Button>
          </div>
        </div>
        <div className="container p-3">
          <div className="row">
            <div className="col-sm-6 col-md-4 p-2 ">
              <div className="row">
                <div classname="col-2">
                  <i class="fas fa-globe-africa fa-2x"></i>
                </div>
                <div classname="col-10">
                  Le Lorem Ipsum est simplement du faux texte employé dans la
                  composition et la mise en page avant impression. Le Lorem
                  Ipsum est le faux texte standard de l'imprimerie depuis les
                  années 1500, quand un imprimeur anonyme
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
