import { observable, action } from "mobx";

class Categories {
  @observable all = [];

  @observable isLoading = false;

  @action async fetchAll() {
    this.isLoading = false;
    const response = await fetch("http://localhost:4000/categories");
    const status = await response.status;
    if (status === 200) {
      this.all = await response.json();
    }
  }
}
export default new Categories();
