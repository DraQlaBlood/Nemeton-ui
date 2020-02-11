import { observable, action } from "mobx";
import Api from "../../lib/helpers/api/index";

class Organizations {
  path = "/organizations";
  account_id = null;

  @observable all = [];
  @observable isLoading = false;
  @observable org = [];
  @observable orgAccount_id = [];
  @observable test = null;

  @action setIsLoading(status) {
    this.isLoading = status;
  }

  @action async fetchAll() {
    this.account_id = localStorage.getItem("account_id");
    this.isLoading = false;
    const response = await Api.get(`/` + this.account_id + this.path);
    const status = await response.status;
    if (status === 200) {
      const json = await response.json();
      this.all = await json.data;
    }
  }

  @action async add(name,about) {
    this.account_id = localStorage.getItem("account_id");
    const response = await Api.post(`/` + this.account_id + this.path, {
      name,about
    });
    const status = await response.status;

    if (status === 201) {
      this.fetchAll();
    } else if (status > 400 && status < 499) {
      console.log("Unprocessable");
    } else if (status > 499 && status < 600) {
      console.log("Bad behaviour ! Very bad behaviour");
    }
  }
  @action async find() {
    let organization = this.all.filter(organization => organization.slug === this.test);
    this.org = organization[0];
    //console.log("org name ", this.org[0].slug)
    this.orgAccount_id = organization[0].account_id;
  }
}
export default new Organizations();
