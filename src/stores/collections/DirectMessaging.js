import { observable, action } from "mobx";
import Api from "../../lib/helpers/api/index";

class DirectMessaging {
  path = "/directconversations";
  pathMessages = "/directmessages";

  @observable isDirectChatBubbleOpen = false;
  @action setIsDirectChatBubbleOpen(isDirectChatBubbleOpen) {
    if (isDirectChatBubbleOpen) {
      this.fetchDirectConversations();
    }
    this.isDirectChatBubbleOpen = isDirectChatBubbleOpen;
  }

  @observable isDirectChatBubbleSearchOpen = false;
  @action setIsDirectChatBubbleSearchOpen(isDirectChatBubbleSearchOpen) {
    this.isDirectChatBubbleSearchOpen = isDirectChatBubbleSearchOpen;
  }

  @observable isDirectChatActive = false;
  @action setIsDirectChatActive(isDirectChatActive) {
    this.isDirectChatActive = isDirectChatActive;
  }

  @observable directconversation_id = null;
  @observable directconversations = [];
  @observable newDMconversation = {};
  @observable receiver = null;

  @action setNewDMConversation(dmconversation) {
    this.newDMconversation = dmconversation;
  }
  @action setReceiver(receiver) {
    this.receiver = receiver;
  }

  @action setConversations(directconversations) {
    this.directconversations = directconversations;
  }

  @action async fetchDirectConversations() {
    const response = await Api.get(this.path);
    const status = await response.status;
    if (status === 200) {
      const json = await response.json();

      this.directconversations = await json;
    }
  }
  @action async addDirectConversation(sender_id, recipient_id) {
    await Api.post(this.path, {
      sender_id,
      recipient_id,
    });
  }

  @action async addMessage(text, directconversation_id) {
    this.account_id = localStorage.getItem("account_id");
    await Api.post(`/` + this.account_id + this.pathMessages, {
      text,
      directconversation_id,
    });
  }
}
export default new DirectMessaging();
