import { observable, action } from "mobx";
import Api from "../../lib/helpers/api/index";

class DirectMessaging {
    path = "/conversations";

    @observable newConversation = false;
    @observable receiver =null;

    @action setNewConversation(newConversation){
        this.newConversation = newConversation;
    }
    @action setReceiver(receiver){
        this.receiver = receiver;
    }

}
export default new DirectMessaging();
