import { observable, action } from "mobx";
import Api from "../../lib/helpers/api/index";
import user from "./User";

class Account {
  path = "/accounts";

  @observable all = [];
  @observable isLoading = false;
  @observable account_id = [];

  @action setIsLoading(status) {
    this.isLoading = status;
  }

  @action async fetchAll() {
    this.setIsLoading(true);
    const response = await Api.get(this.path);
    const status = await response.status;
    if (status === 200) {
      const json = await response.json();
      this.all = await json.data;
    }
    this.setIsLoading(false);
  }

  @action async add(name) {
    const response = await Api.post(this.path, { name });
    const status = await response.status;

    if (status === 201) {
      this.fetchAll();
      this.hasAccount(name);
    } else if (status > 400 && status < 499) {
      console.log("Unprocessable");
    } else if (status > 499 && status < 600) {
      console.log("Bad behaviour ! Very bad behaviour");
    }
  }

  @action find() {
    let account= this.all.filter(function(account) {
      return account.slug === user.account_id;
    })[0];
    this.account_id  = account.id
  }

  hasAccount(account) {
    localStorage.removeItem("account_id");
    localStorage.setItem("account_id", account);
    if (this.all.length === 1) {
      user.signInFromStorage(
        localStorage.getItem("email"),
        localStorage.getItem("firstName"),
        localStorage.getItem("lastName"),
        localStorage.getItem("user_id"),
        localStorage.getItem("account_id")
      );
    } else {
      user.signIn(null, null);
    }
  }
}
export default new Account();
