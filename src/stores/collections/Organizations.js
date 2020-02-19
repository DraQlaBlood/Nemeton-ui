import { observable, action } from "mobx";
import Api from "../../lib/helpers/api/index";

class Organizations {
  path = "/organizations";
  account_id = null;

  @observable all = [];
  @observable isLoading = false;
  @observable org = {};
  @observable followers=[]
  @observable orgAccount_id = [];
  @observable likers = [];

  @observable showModal= false;
  @observable type = { pub: "public", pri: "private" }


  @action async setShowModal(status){
    this.showModal = status;
  }

  @action setIsLoading(status) {
    this.isLoading = status;
  }

  @action async fetchAll() {
    this.account_id = localStorage.getItem("account_id");
    this.isLoading = false;
    const response = await Api.get(this.path);
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
  @action async find(organization_id) {
    let organization = this.all.filter(function(organization) {
      return organization.slug === organization_id})[0].id;
    //console.log(" data: ", organization)

    const response = await Api.get(this.path+`/`+organization);
    const status = await response.status;
    if (status === 200) {
      const json = await response.json();
      this.org  = await json.data.organization;
    }
    //console.log(" data: ", this.org)
    this.followers= this.org.followers;
    this.likers = this.org.likers;
    //console.log("org name ", this.org.slug)
    //this.orgAccount_id = this.org.account_id;
  }

 

}
export default new Organizations();
