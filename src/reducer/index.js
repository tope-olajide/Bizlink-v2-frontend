import { combineReducers } from "redux";

import auth from "./auth";
import business from "./business";
import review from "./review";
import user from "./user";
export default combineReducers({
  auth, business, review, user
});
