import { combineReducers } from "redux";

import auth from "./auth";
import business from "./business";
import review from "./review";
import user from "./user";
import gallery from "./gallery";
import notifications from "./notifications";
export default combineReducers({
  auth, business, review, user, gallery,notifications
});
