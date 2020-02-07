import { observable, action } from "mobx";
import Api from "../../lib/helpers/api/index";

class GlobalParams {
  path = "/globals";

  @observable all = [];
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
      .filter(invite => invite.slug !== localStorage.getItem("account_id"));
    }
  }

  
}
export default new GlobalParams();