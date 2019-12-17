import { combineReducers } from "redux";

import authReducer from "./authReducer";
import business from "./business";
export default combineReducers({
  authReducer, business
});
