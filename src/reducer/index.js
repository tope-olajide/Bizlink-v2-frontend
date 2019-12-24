import { combineReducers } from "redux";

import authReducer from "./authReducer";
import business from "./business";
import review from "./review";
export default combineReducers({
  authReducer, business, review
});
