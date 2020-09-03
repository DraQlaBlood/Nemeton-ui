import { observable, action } from "mobx";
import Api from "../../lib/helpers/api";

class Requests {
  path = "/requests";
  @observable all = [];
  @observable isLoading = false;

  @observable showRequestModal = false;

  @action isShowRequestModal(showRequestModal){
    this.showRequestModal = showRequestModal;
  }




  
}
export default new Requests();
