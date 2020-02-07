import React from "react";

import { inject, observer } from "mobx-react";
import { Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

@inject("account")
@observer
class AccountSettings extends React.Component {
  switchAccount = e => {
    e.preventDefault();
    if (this.refs.account_id.value !== this.props.account.account_id) {
      let account_id = this.refs.account_id.value;
      this.props.account.hasAccount(account_id);
    }
  };

  render() {
    const { accounts } = this.props;
    const options = accounts.slice().map(account => (
      <option key={account.id} value={account.slug}>
        {account.name}
      </option>
    ));

    return (
        <div className="py-2 d-flex flex-column">
          <section>
            <span className="py-2">Switch account to : </span>
            <div>
              <Form noValidate>
                <Form.Group
                  as={Col}
                  xs={12}
                  md={12}
                  controlId="exampleForm.ControlSelect1"
                >
                  <Form.Control
                    as="select"
                    ref="account_id"
                    onChange={this.switchAccount}
                  >
                    <option>Select account</option>
                    {options}
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
          </section>
        

        <section id="en-tete" className=" p-2">
          <div className=" shadow border">
            <div className="d-flex flex-column bg-white p-3 ">
              <div className="d-flex justify-content-between">
                <span>
                  <h5>Create a new organization</h5>
                </span>
                <div>
                  <Link to={`/new-organization`}>Create</Link>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <span>
                  <h5>Add a new account</h5>
                </span>
                <div>
                  <Link to={`/accounts/new-account`}>Add</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
    );
  }
}
export default AccountSettings;
