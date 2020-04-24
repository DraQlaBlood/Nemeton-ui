import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className="footer flex-shrink-0  
d-none d-xs-none d-sm-none d-md-none d-lg-block colour-blue p-4"
      >
        <div className="d-flex flex-column mx-5 px-5">
          <div className="d-flex justify-content-between mx-5">
            <div className="d-flex flex-column">
              {" "}
              <h3 className="text-uppercase font-weight-bold"> NEMETON</h3>
            </div>
            <div className="d-flex flex-column">
              <h4>Explore</h4>
              <span>Pricing</span>
              <span>Home</span>
              <span>Messages</span>
              <span>Notifications</span>
            </div>
            <div className="d-flex flex-column">
              <h4>Account</h4>
              <span>My content</span>
              <span>Billing</span>
            </div>
            <div className="d-flex flex-column">
              <h4>Partners</h4>
              <span>Become a partner</span>
            </div>
            <div className="d-flex flex-column">
              <h4>Resources</h4>
              <span>Our blog</span>
              <span>Careers</span>
            </div>
            <div className="d-flex flex-column">
              <h4>Support</h4>
              <span>Feedback</span>
              <span>Forums</span>
              <span>New Release Notes</span>
            </div>
          </div>
          <div className="d-flex justify-content-between m-5">
            <div className="d-flex flex-column">
              2020 Nemeton Inc. All rights reserved | Terms of Service | Privacy
              | Legal
            </div>
            <div className="d-flex justify-content-between col-md-4">
              <i className="fab fa-facebook-f fa-2x"></i>
              <i className="fab fa-twitter fa-2x"></i>
              <i className="fab fa-youtube fa-2x"></i>
              <i className="fab fa-linkedin-in fa-2x"></i>
              <i className="fas fa-rss fa-2x"></i>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;
