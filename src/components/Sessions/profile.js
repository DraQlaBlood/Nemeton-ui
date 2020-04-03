import React from "react";

import { inject, observer } from "mobx-react";
import Spinner from "../../lib/components/spinner/load";

import Dashboard from "./profile/dashboard";
import Feed from "./profile/feed";

@inject("user")
@observer
class Profile extends React.Component {
  componentDidMount = async () => {
    await this.props.user.signIn();
    await this.props.requests.fetchAll();
  };

  render() {
    const { user } = this.props;
    const { isLoading } = this.props.user;
    const { all } = this.props.requests;

    console.log(user);
    if (isLoading) {
      return (
        <div className="flex-grow-1">
          <div className="d-flex flex-column ">
            <div className="align-self-center">
              <Spinner />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="flex-grow-1 container mb-5">
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <section id="en-tete" className=" p-2">
              <div className=" shadow border">
                <div className="d-flex flex-column">
                  <div className="text-center profileprincipal"></div>
                </div>
                <div className="d-flex flex-column bg-white p-3 ">
                  <span>
                    <h4>
                      {user.firstName} {user.lastName}
                    </h4>
                  </span>
                  <span>{user.email}</span>
                  <span>Locations</span>
                </div>
              </div>
            </section>
            

            <section id="en-tete" className=" p-2 ">
              <div className=" shadow border">
                <div className="bg-white p-2 d-flex flex-column">
                  <div className=" d-flex justify-content-between p-2">
                    <span>
                      <h5>About</h5>
                    </span>
                    <span>
                      <i className="fas fa-pencil-alt"></i>
                    </span>
                  </div>
                  <div className=" d-flex  p-2 ">
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="col-md-4 col-sm-12">
            <section id="en-tete" className="p-2 ">
              <Dashboard all={all} user_id={user.user_id} />
            </section>
            <section id="en-tete" className="p-2 ">
              <Feed />
            </section>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
