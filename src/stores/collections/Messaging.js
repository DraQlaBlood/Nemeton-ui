import { observable, action } from "mobx";
import Api from "../../lib/helpers/api/index";

class Messaging {
  path = "/conversations";
  pathMessages = "/messages"

  @observable conversations = [];
  @observable conversation = [];

  @observable activeConversationMessages=[];

  @observable activeConversation = null;

  @observable isLoading =false;
  @observable text = '';
  @observable convesation_id = null;

  @observable messages = [];

  @action setConversations(conversations) {
    this.conversations = conversations;
  }


  @action setIsLoading(isloading){
    this.isloading = isloading;
  }

  @action async fetchConversations() {
    this.setIsLoading(true)
    const response = await Api.get(this.path);
    const status = await response.status;
    if (status === 200) {
      const json = await response.json();
      
      this.conversations = await json;
    }
    this.setIsLoading(false);
  }

  @action async findOne(conversation_id) {
    this.setIsLoading(true)
    console.log(conversation_id)
    const response = await Api.get(this.path+"/"+conversation_id);
    const status = await response.status;
    if (status === 200) {
      this.conversation  = await response.json(); 
      this.activeConversationMessages = this.conversation.messages
    console.log(this.conversation.messages)
    }
    this.setIsLoading(false);
  }

  @action async addConversation(title, organization_id) {
    this.account_id = localStorage.getItem("account_id");
    console.log(title, organization_id);

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
