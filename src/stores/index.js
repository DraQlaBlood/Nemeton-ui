import requests from "./collections/Requests";
import categories from "./collections/Categories";
import user from "./models/User";
import views from "./utils/View";

const stores = {
  requests,
  categories,
  user,
  views
};
export default stores;
