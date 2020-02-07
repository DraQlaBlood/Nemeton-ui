import requests from "./collections/Requests";
import categories from "./collections/Categories";

import organization from "./collections/Organizations";
import user from "./models/User";
import views from "./utils/View";
import account from "./models/Account";
import globalparams from "./utils/GlobalParams";

const stores = {
  requests,
  categories,
  user,
  views,
  account,
  organization,
  globalparams
};
export default stores;
