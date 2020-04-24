import React from "react";

import { inject, observer } from "mobx-react";
import { Form, Col } from "react-bootstrap";

@inject("account")
@observer
class AccountSettings extends React.Component {
  switchAccount = e => {
    e.preventDefault();
    if (this.refs.account_id.value !== this.props.account.account.id) {
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
                    {options}
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
          </section>
        

        
        </div>
    );
  }
}
export default AccountSettings;
