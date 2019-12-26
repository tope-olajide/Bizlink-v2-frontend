import { combineReducers } from "redux";

import auth from "./auth";
import business from "./business";
import review from "./review";
import user from "./user";
import gallery from "./gallery";
export default combineReducers({
  auth, business, review, user, gallery
});
