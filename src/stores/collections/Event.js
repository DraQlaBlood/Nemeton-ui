import { observable, action } from "mobx";
import Api from "../../lib/helpers/api/index";

class Event {
  path = "/events";
  @observable showModal = false;
  @observable startTime = null;
  @observable endTime = null;

  @observable events = [];
  @observable loadable = 3;

  @action setShowModal(status) {
    this.showModal = status;
  }

  @action setStartTime(startTime) {
    this.startTime = new Date(startTime);
  }

  @action setEndTime(endTime) {
    this.endTime = new Date(endTime);
  }

  @action async setEvents(events) {
    this.events = events;
  }

  @action async fetchAllEvents() {
    const response = await Api.get(this.path);
    const status = await response.status;
    if (status === 200) {
      const json = await response.json();
      this.events = await json;
    }
  }

  @action async addEvent(
    title,
    description,
    address,
    startTime,
    endTime,
    spots,
    organization_id
  ) {
    this.account_id = localStorage.getItem("account_id");

    await Api.post(`/` + this.account_id + this.path, {
      title,
      description,
      address,
      startTime,
      endTime,
      spots,
      organization_id
    });
  }
}
export default new Event();
