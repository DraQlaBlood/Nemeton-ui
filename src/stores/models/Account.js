import { observable, action } from "mobx";
import Api from "../../lib/helpers/api/index";
import user from "./User";


class Account {
  path = "/accounts";

  @observable all = [];
  @observable isLoading = false;
  @observable account_id = [];
  @observable account={}


  @observable bioUpdate = false;
  @observable emailLink= false;
  @observable showModal= false;

  @action setIsLoading(status) {
    this.isLoading = status;
  }

  @action async setShowModal(status){
    this.showModal = status;
  }

  @action async setbioUpdate(bioUpdate){
    this.bioUpdate = bioUpdate;
  }

  @action async setEmailLink(emailLink){
    this.emailLink = emailLink;
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

  @action async add(name, description) {
    const response = await Api.post(this.path, { name , description});
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

  @action async find() {
    this.setIsLoading(true)
    let account= this.all.filter(function(account) {
      return account.slug === user.account_id;
    });
    const response = await Api.get(this.path+`/`+account[0].id);
    const status = await response.status;
    if (status === 200) {
      const json = await response.json();
      this.account = await json.data.account
    }
    this.account_id  = account.id
    this.setIsLoading(false)
  }

  @action getAccountInfos(id){
    let acc= this.all.filter(function(acc) {
      return acc.id === id;
    })[0];
    
    return acc;
  }

  hasAccount(account) {
    localStorage.removeItem("account_id");
    localStorage.setItem("account_id", account);


    if (this.all.length >= 1) {
      user.signInFromStorage(
        localStorage.getItem("email"),
        localStorage.getItem("account_id")
      );
    } else {
      user.signIn(null, null);
    }
  }




}
export default new Account();
