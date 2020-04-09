import { observable, action } from "mobx";

class Views {
  @observable isMap = true;
  @observable isSidebarOpen= false;


  @action setSidebar(status){
    this.isSidebarOpen = status;
  }

  @action setIsMap() {
    console.log("map");
    this.isMap = true;
  }
  @action setIsList() {
    console.log("list");
    this.isMap = false;
  }
}
export default new Views();
