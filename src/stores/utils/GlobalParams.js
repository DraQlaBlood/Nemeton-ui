import { observable, action } from "mobx";
import Api from "../../lib/helpers/api/index";
import account from '../models/Account';
import organization from '../collections/Organizations'

class GlobalParams {
  path = "/globals";

  @observable all = [];
  @observable allFromAcount = []
  @observable isSidebarOpen = false;
  @observable isLoading = false;
  
  @action setIsLoading(status) {
    this.isLoading = status;
  }

  @action setSidebar(status) {
    this.isSidebarOpen = status;
  }

  

  @action async findAll() {
    const response = await Api.get(this.path);
    const status = await response.status;
    if (status === 200) {
      const json = await response.json();
      this.all = await json.data.slice()
      .filter(invite => invite.account_id  !== account.account_id );

      this.allFromAcount = await json.data.slice()
      .filter(invite => invite.account_id  === account.account_id  && invite.slug !== organization.test);
    }
  }

  
}
export default new GlobalParams();