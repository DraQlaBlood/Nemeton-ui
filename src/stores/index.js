
import categories from "./collections/Categories";
import messaging from "./collections/Messaging"

import event from './collections/Event'
import organization from "./collections/Organizations";
import user from "./models/User";
import views from "./utils/View";
import account from "./models/Account";
import membership from './models/Membership'
import directMessaging from "./collections/DirectMessaging"
import request from "./collections/Requests"

const stores = {
  categories,
  user,
  views,
  account,
  organization,
  membership,
  messaging,
  event,
  directMessaging,
  request
};
export default stores;
