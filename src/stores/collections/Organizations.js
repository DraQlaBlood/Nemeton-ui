import { observable, action } from "mobx";
import Api from "../../lib/helpers/api/index";

class Organizations {
  path = "/organizations";
  account_id = null;

  @observable all = [];
  @observable isLoading = false;
  @observable organization = [];

  @observable latitude=null;
  @observable longitude=null;
  @observable location="";

  @observable showModal = false;
  @observable type = { pub: "public", pri: "private" };

  @action async setShowModal(status) {
    this.showModal = status;
  }

  @action setIsLoading(status) {
    this.isLoading = status;
  }

  @action setAddress(address){
    this.location = address;
  }
  @action setLatLng(latitude, longitude){
    this.latitude= latitude;
    this.longitude = longitude;
  }

  @action async fetchAll() {
    this.setIsLoading(true)
    const response = await Api.get(this.path);
    const status = await response.status;
    if (status === 200) {
      const json = await response.json();
      this.all = await json.data;
      this.setIsLoading(false)
    }
    
  }

  @action async add(
    name,
    about,
    location,
    latitude,
    longitude,
    status,
    mail,
    facebook,
    twitter,
    instagram,
    youtube
  ) {
    this.account_id = localStorage.getItem("account_id");
    const response = await Api.post(`/` + this.account_id + this.path, {
      name,
      about,
      location,
      latitude,
      longitude,
      status,
      mail,
      facebook,
      twitter,
      instagram,
      youtube
    });
    const statusCode = await response.status;

    if (statusCode === 201) {
      this.fetchAll();
    } else if (statusCode > 400 && statusCode < 499) {
      console.log("Unprocessable");
    } else if (statusCode > 499 && statusCode < 600) {
      console.log("Bad behaviour ! Very bad behaviour"); 
    }
  }
  @action async findOne(organization_id) {
    this.setIsLoading(true)
    const response = await Api.get(this.path + `/` + organization_id);
    const status = await response.status;
    if (status === 200) {
      const json = await response.json();
      this.organization = await json.data.organization;

      this.setIsLoading(false);
    }
  }

  @action getOrganizationName(organization_id){
    let organization = this.all.filter(function(organization) {
      return organization.id === organization_id;
    })[0];
    return organization;
  }

}
export default new Organizations();
