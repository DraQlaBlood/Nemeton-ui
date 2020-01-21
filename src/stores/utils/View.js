import { observable, action } from "mobx";

class Views {
  @observable isMap = true;

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
