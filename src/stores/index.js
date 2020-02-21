
import categories from "./collections/Categories";
import messaging from "./collections/Messaging"

import organization from "./collections/Organizations";
import user from "./models/User";
import views from "./utils/View";
import account from "./models/Account";
import globalparams from "./utils/GlobalParams";
import membership from './models/Membership'

const stores = {
  categories,
  user,
  views,
  account,
  organization,
  membership,
  globalparams,
  messaging
};
export default stores;
