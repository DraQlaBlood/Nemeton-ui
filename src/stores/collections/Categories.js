import { observable, action } from "mobx";
import Api from "../../lib/helpers/api/index";

class Categories {
  path="/categories"
  @observable categories = [];

  @observable isLoading = false;

  @action async findAll() {
    const response = await Api.get(this.path);
    const status = await response.status;
    if (status === 200) {
      const json = await response.json();
      this.categories = await json;
    }
  }
}
export default new Categories();
