import { observable, action } from "mobx";

class Views {
  @observable selectedMapObject = null;
  @observable isSidebarOpen= false;


  @action setSidebar(status){
    this.isSidebarOpen = status;
  }

  @action setSelectMapObject(objectSelected) {
    this.selectedMapObject = objectSelected;
  }
  @action setIsList() {
    console.log("list");
    this.isMap = false;
  }
}
export default new Views();
