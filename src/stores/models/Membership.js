import { observable, action } from "mobx";
import Api from "../../lib/helpers/api/index";

class MemberShips {
  path = "/memberships";
  pathLike = "/likes"
  account_id = null;

  @observable notification = false;
  
  @action showNotification(status) {
    this.notification = status;
  }
  @action resetNotification(status) {
    this.notification = status;
  }

  
  @action async join(organization_id) {
    this.account_id = localStorage.getItem("account_id");
    const response = await Api.post(`/` + this.account_id + this.path, {
      organization_id
    });
    const status = await response.status;

    console.log(status);
    if (status === 200) {
      this.showNotification(true);
    } else {
      console.log("error");
    }
  }

  @action async leave(organization_id) {
    this.account_id = localStorage.getItem("account_id");
    const response = await Api.delete(`/` + this.account_id +`/organizations/`+organization_id +this.path);
    const status = await response.status;
    console.log(status);
    if (status === 200) {
      this.showNotification(true);
    } else {
      console.log("error");
    }
  }

    // Like and disliking organizations

    @action async like(organization_id) {
      this.account_id = localStorage.getItem("account_id");
      const response = await Api.post(`/` + this.account_id + this.pathLike, {
        organization_id
      });
      const status = await response.status;
  
      console.log(status);
      if (status === 200) {
        this.showNotification(true);
      } else {
        console.log("error");
      }
    }
  
    @action async disLike(organization_id) {
      this.account_id = localStorage.getItem("account_id");
      const response = await Api.delete(`/` + this.account_id +`/organizations/`+organization_id +this.pathLike);
      const status = await response.status;
      console.log(status);
      if (status === 200) {
        this.showNotification(true);
      } else {
        console.log("error");
      }
    }

}
export default new MemberShips();
