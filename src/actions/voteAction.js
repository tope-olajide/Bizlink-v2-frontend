import axios from "axios";

import { UPVOTE_BUSINESS, DOWNVOTE_BUSINESS } from "./type";
import baseUrl from '../utils/baseUrl';
const url = `${baseUrl}/api/business`;

export function upvote(businessId) {
  return dispatch =>
    axios.post(`${url}/${businessId}/upvotes`).then(response => {
      const { business } = response.data;
      dispatch({
        type: UPVOTE_BUSINESS,
        business
      });
    });
}
export function downvote(businessId) {
  return dispatch =>
    axios.post(`${url}/${businessId}/downvotes`).then(response => {
      const { business } = response.data;
      dispatch({
        type: DOWNVOTE_BUSINESS,
        business
      });
    });
}
