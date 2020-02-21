import { observable, action } from "mobx";
import Api from "../../lib/helpers/api/index";

class Messaging {
  path = "/conversations";
  pathMessages = "/messages"

  @observable conversations = [];
  @observable activeConversation = null;


  @observable text = '';
  @observable convesation_id = null;

  @action setConversations(conversations) {
    this.conversations =[]
    this.conversations = conversations;
  }

  @action async fetchConversations(organization_id) {
    this.account_id = localStorage.getItem("account_id");

    const response = await Api.get(`/`+organization_id +this.path);
    const status = await response.status;
    if (status === 200) {
      const json = await response.json();
      this.conversations = await json;
    }
  }

  @action async addConversation(title, organization_id) {
    this.account_id = localStorage.getItem("account_id");

    await Api.post(`/` + this.account_id +`/organizations/`+organization_id +this.path, {
      title,
      organization_id
    });
  }

  @action async addMessage(text,conversation_id) {
    this.account_id = localStorage.getItem("account_id");

    await Api.post(`/` + this.account_id +this.pathMessages, {
      text, conversation_id
    });
  }
}
export default new Messaging();
