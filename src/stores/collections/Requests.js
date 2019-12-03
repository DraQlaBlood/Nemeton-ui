import { observable, action } from "mobx";
import Api from "../../lib/helpers/api";

class Requests {
  path = "/requests";
  @observable all = [];
  @observable isLoading = false;

  @action async fetchAll() {
    this.isLoading = false;
    const response = await Api.get(this.path);
    const status = await response.status;
    if (status === 200) {
      const json = await response.json();
      this.all = await json.data;
    }
  }

  @action async add(data) {
    const response = await Api.post(this.path, data);
    const status = await response.status;

    if (status === 201) {
      this.fetchAll();
    }
  }

  @action find(requestId) {
    return this.all
      .slice()
      .filter(req => req.id === parseInt(requestId, 10))[0];
  }

  @action async remove(requestId) {
    this.isLoading = true;
    const response = await Api.delete(this.path + "/" + requestId);
    const status = await response.status;

    if (status === 200) {
      this.isLoading = false;
      this.fetchAll();
    }
  }
}
export default new Requests();
