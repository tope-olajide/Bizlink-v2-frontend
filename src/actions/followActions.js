import axios from "axios";

import { FOLLOW_USER, UNFOLLOW_USER } from "./type";
const url = "baseUrl/api/user/follow";
export function follow(userId) {
  return dispatch =>
    axios.post(`${url}/${userId}`).then(response => {
      const { isFollowing } = response.data;
      dispatch({
        type: FOLLOW_USER,
        isFollowing
      });
    });
}
export function unfollow(userId) {
  return dispatch =>
    axios.delete(`${url}/${userId}`).then(response => {
      const { isFollowing } = response.data;
      dispatch({
        type: UNFOLLOW_USER,
        isFollowing
      });
    });
}
