
import categories from "./collections/Categories";
import messaging from "./collections/Messaging"

import event from './collections/Event'
import organization from "./collections/Organizations";
import user from "./models/User";
import views from "./utils/View";
import account from "./models/Account";
import membership from './models/Membership'

const stores = {
  categories,
  user,
  views,
  account,
  organization,
  membership,
  messaging,
  event
};
export default stores;
