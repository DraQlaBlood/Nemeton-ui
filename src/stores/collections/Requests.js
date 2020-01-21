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

  @action async add(title, location, description, category_id) {
    const resp = await fetch("http://localhost:4001/location");
    const stat = await resp.status;

    if (stat === 200) {
      const body = await resp.json();
      let latitude = body.latitude;
      let longitude = body.longitude;
      let city = body.city;
      let country = body.country;
      let start_date = new Date();

      const response = await Api.post(this.path, {
        title,
        location,
        description,
        category_id,
        latitude,
        longitude,
        city,
        country,
        start_date
      });
      const status = await response.status;

      if (status === 201) {
        this.fetchAll();
      }
    } else {
      console.log("can't find location");
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
